// Middleware for verifying access token in the request header
const { firebase_admin } = require("../init");


module.exports.verifyAccessToken = async (req, res, next) => {
    try {
        // Verify Firebase Access Token from cookies
        const accessToken = req.cookies.id_token || (req.headers.authorization).split(" ")[1] || req.headers["x-access-token"] || req.headers["access-token"] || req.headers["token"] || req.headers["x-auth-token"] || req.headers["x-auth-token"] || req.headers["x-api-key"] || req.headers["apikey"] || req.headers["api-key"] || req.headers["api_key"] || req.headers["apikey"] || req.headers["x-api-key"] || req;
        if (!accessToken) {
            throw new Error("Access token not found");
        }
        const decodedToken = await firebase_admin.auth().verifyIdToken(accessToken);
        if (!decodedToken) {
            throw new Error("Invalid access token");
        }
        req.auth = decodedToken;
        req.auth.id = decodedToken.uid;
        req.auth.workspace = decodedToken.customClaims;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: error.message
        });
    }
}
