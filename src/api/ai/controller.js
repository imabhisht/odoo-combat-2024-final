const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { logger,firebase_admin, prisma, mongodb_client } = require("../../init")

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


module.exports.createWebsite = async(req,res) => {
    try {
        const { id } = req.auth;
        console.log("Create Website");
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig:{
                maxOutputTokens: 100000,
                temperature: 0.9,
            }
        });
        const ans = []
        const filePath = path.join(__dirname, 'prompt.txt');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let prompt = fileContent

        for(let i = 0; i < 5; i++) {
            console.log("Iteration: ", i)
            const result = await model.generateContent(prompt);
            const response = await result.response;
            ans.push(response.text());

            if(response.text().endsWith("```")){
                break;
            }else{
                const output_till_now = () => {
                    let output = ""
                    for(let x = 0; x < ans.length; x++){
                        output += ans[x]
                    }   
                    return output
                }
                prompt += "Continue the Previous Answer. Output till now:" + output_till_now() + "\n"
            }
        }

        console.log(ans)

        const htmlContent = ans.join("");
        const x = await mongodb_client.collection("websites").insertOne({
            html_content: htmlContent,
            created_at: new Date(),
            updated_at: new Date(),
            project_id: req.body.project_id,
            user_id: id
        });

        

        return res.status(200).send({
            message: "Website Created",
            created_at: x.created_at,
            updated_at: x.updated_at,
            project_id: x.project_id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}