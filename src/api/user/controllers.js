const { logger,firebase_admin, prisma, mongodb_client } = require("../../init")

const generateEmailVerification = async (req,type) => {
    try {    
        const { email } = req.body;

        // Create Verification Document in MongoDB with TTL of 15mins. If already exists, dont create it
        const already_verification = await mongodb_client.collection("verification").findOne({
            email
        });

        if(already_verification){
            console.log(`OTP for ${email} is ${already_verification.otp}`)
            return already_verification;
        }
        const newotp = (Math.floor(100000 + Math.random() * 900000)).toString()
        const verification = await mongodb_client.collection("verification").insertOne({
            email,
            otp: newotp,
            type: "email",
            createdAt: new Date()
        });

        console.log(`OTP for ${email} is ${newotp}`)

        return verification;

    } catch (error) {
        throw error;
    }
}

const verifiyOTP = async (req) => {
    try {
        const { email, otp } = req.body;

        // console.log(req.body)

        const verification = await mongodb_client.collection("verification").findOne({
            email,
            otp
        });

        // console.log(verification)

        if(verification){
            await mongodb_client.collection("verification").deleteOne({
                email,
                otp
            });
            return verification
        }else{
            throw new Error("Invalid OTP")
        }

    } catch (error) {
        throw error;
    }

}


module.exports.singleLogin = async(req,res) => {
    try {
        const { event, email } = req.body;

        // Check Email Exists
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if(event==="generate-otp"){
            if(user){
                const verification = await generateEmailVerification(req);
                return res.send({message: "OTP Generated Successfully", ...verification});
            } else{
                const verification = await generateEmailVerification(req);
                return res.send({message: "OTP Successfully Sent",  ...verification});
            }
        }
        else if(event==="verify-otp"){
            if(user){
                const verification = await verifiyOTP(req);
                const login_data = await login(req,res);
                res.cookie('id_token', login_data.idToken);
                res.cookie('refresh_token', login_data.refreshToken);
                return res.send({message: "OTP Verified Successfully", ...login_data});
            }
            else{
                await verifiyOTP(req);
                const user_data = await createUser(req,res);
                res.cookie('id_token', user_data.idToken);
                res.cookie('refresh_token', user_data.refreshToken);
                return res.send({message: "User created successfully", ...user_data});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message})
    }
}

const createUser = async(req) => {
    let flag = 0;
    let user = null;
    try {
        const { email } = req.body;
        user = await firebase_admin.auth().createUser({
            displayName: "Unknown",
            email,
            password: "password"
        })
        if (user) flag = 1;

        const user_data = await prisma.user.create({
            data: {
                id: user.uid,
                name: "Unkonwn",
                email: email
            }
        });
        if (user_data) flag += 1;
        logger.debug(`[User-Controller] Account created with id:${user.uid}`)
        const login_token = await firebase_admin.auth().createCustomToken(user.uid);

        // //Login the user and set the idToken and refreshToken in the cookies
        
        const user_login = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: "password",
                returnSecureToken: true
            })
        });

        const user_login_data = await user_login.json();
        if (user_login_data.error) {
            throw new Error(user_login_data.error.message);
        }

        return {
            message: "User created successfully",
            id: user.uid,
            email: user.email,
            name: user.displayName,
            expires_in: user_login_data.expiresIn,
            login_token,
            idToken: user_login_data.idToken,
            refreshToken: user_login_data.refreshToken
        }

        // Set the idToken and refreshToken in the cookies

    } catch (error) {
        if (flag === 1) {
            await firebase_admin.auth().deleteUser(user.uid)
        }
        logger.debug(`[User-Controller] Account not created with reason: ${error.message}`)
        throw error;
    }
}


const login = async(req) => {
    try {
        const { email } = req.body;

        // Check Email and Password
        const user = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                returnSecureToken: true,
                password: "password"
            })
        });

        const user_data = await user.json();
        if (user_data.error) {
            throw new Error(user_data.error.message);
        }
        console.log(user_data)
        // Set the idToken and refreshToken in the cookies
        // res.cookie('id_token', user_data.idToken);
        // res.cookie('refresh_token', user_data.refreshToken);
        const login_token = await firebase_admin.auth().createCustomToken(user_data.localId);


        return {
            message: "User logged in successfully",
            id: user_data.localId,
            email: user_data.email,
            name: user_data.displayName,
            expires_in: user_data.expiresIn,
            idToken: user_data.idToken,
            refreshToken:  user_data.refreshToken,
            login_token
    };

    } catch (error) {
        logger.debug(`[User-Controller] Account not logged in with reasonx: ${error.message}`)
        throw error;
    }
}

module.exports.deleteUser = async(req,res) => {
    try {
        const { id } = req.auth;
        const user = await prisma.user.delete({
            where:{
                id: id
            }
        })
        if (user) {
            await firebase_admin.auth().deleteUser(id);
            logger.debug(`[User-Controller] Account deleted with id:${id}`)
            return res.send({message: "User deleted successfully"})
        }
        return res.status(404).send({message: "User not found"})
    } catch (error) {
        logger.debug(`[User-Controller] Account not deleted with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }
}

module.exports.updateUser = async(req,res) => {
    try {
        const { id } = req.auth;
        const { name, email } = req.body;
        
        // First update the DB and then the firebase
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email
            }
        });
        if (user) {
            await firebase_admin.auth().updateUser(user.id, {
                displayName: user.name,
            })
            logger.debug(`[User-Controller] Account updated with id:${id}`)
            return res.send({message: "User updated successfully"})
        }
        return res.status(404).send({message: "User not found"})
    } catch (error) {
        logger.debug(`[User-Controller] Account not updated with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }
}

module.exports.refreshToken = async(req,res) => {
    try {
        const { refresh_token } = req.cookies;
        const user = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token
            })
        });
        const user_data = await user.json();
        if (user_data.error) {
            throw new Error(user_data.error.message);
        }
        res.cookie('id_token', user_data.id_token);
        res.cookie('refresh_token', user_data.refresh_token);
        return res.send({
            message: "Token refreshed successfully", 
            id: user_data.user_id,
            expires_in: user_data.expires_in
        });
    } catch (error) {
        logger.debug(`[User-Controller] Token not refreshed with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }

}
