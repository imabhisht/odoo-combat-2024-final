const { logger,firebase_admin, prisma, mongodb_client, kafka } = require("../../init")


module.exports.createProject = async(req,res) => {
    const producer = kafka.producer();
    let flag = 0;
    const { id } = req.auth;
    const { config , project_id } = req.body;
    console.log(req.body)
    try {        
        if(!project_id)return res.status(400).send({message: "Invalid Request"});
        if(!project_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i))return res.status(400).send({message: "Invalid Project ID"});

        //Check if Project ID already exists
        const project_exists = await prisma.project.findFirst({
            where: {
                id: project_id,
            }
        });

        if(project_exists && project_exists.user_id != id) return res.status(400).send({
            message: "Project ID already exists for another user"
        });


        if (project_exists){
            const project_mongo = await mongodb_client.collection("projects").findOne({
                _id: project_id
            });

            if(project_mongo.status === "incomplete") return res.status(200).send({
                message: "Project already exists and is incomplete"
            }); 

            if(project_mongo.status === "completed") return res.status(201).send({
                message: "Project already exists and is complete"
            });
        }

        if(!config)return res.status(400).send({message: "Invalid Request"});

        const project = await prisma.project.create({
            data: {
                id: project_id,
                user_id: id
            }
        });

        flag += 1;

        await mongodb_client.collection("projects").insertOne({
            _id: project.id,
            config,
            user_id: id,
            status: "incomplete"
        });

        flag += 1;
        await producer.connect();
        const dummydata = {"project_id":"777fafea-4b3f-49a2-a0d9-daf2f07abd7c","config":{"build_detail":"development","showcase":"full_stack","social":{"social_github":"erwrw","social_linkedin":"rwrwr","social_medium":"wrwrwrw","social_twitter":"wrwrwrwrwrwr","social_resume":"wrwrrrrrrrrrrrrrrrrrr"},"about_self":"rwrwrwrrrrwrwrw"}}
        // await producer.send({
        //     topic: 'code-generation',
        //     messages: [
        //         { value: JSON.stringify(dummydata)},
        //     ],
        // });

        await producer.send({
            topic: 'code-generation',
            messages: [
                { value: JSON.stringify({ project_id, config })},
            ],
        });


        await producer.disconnect();

        return res.status(202).send({
            message: "Project Created"
        });

    } catch (error) {
        logger.error("[Project] Error creating project", error);
        if(flag >= 1){
            await prisma.project.delete({
                where: {
                    id: project_id
                }
            });
        };
        if(flag === 2){
            await mongodb_client.collection("projects").deleteOne({
                _id: project_id
            });
        };

        await producer.disconnect();
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}


module.exports.getHTMLContent = async(req,res) => {
    try {
        const { id } = req.auth;
        const { project_id } = req.params;
        if(!project_id)return res.status(400).send({message: "Invalid Request"});

        let htmlContent = await mongodb_client.collection("projects").findOne({
            _id: project_id
        })

        // Remove ``` from the HTML Content
        htmlContent.html_content = htmlContent.html_content.replace(/```html/g, "");
        htmlContent.html_content = htmlContent.html_content.replace(/```/g, "");

        return res.status(200).send(htmlContent.html_content);

    } catch (error) {
        logger.error("[Project] Error getting HTML", error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}


module.exports.postHTMLContent = async(req,res) => {
    const producer = kafka.producer();
    try {
        const { id } = req.auth;
        const { project_id } = req.params;
        const { html_content } = req.body;
        if(!project_id || !html_content)return res.status(400).send({message: "Invalid Request"});

        await producer.connect();
        await producer.send({
            topic: 'code-generation',
            messages: [
                { value: JSON.stringify({ project_id, html_content, type_of_message: "update" })},
            ],
        });

        return res.status(200).send({
            message: "HTML Content Updated"
        });

    } catch (error) {
        logger.error("[Project] Error updating HTML", error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}


module.exports.deleteProject = async(req,res) => {
    try {
        const {  id } = req.auth;
        const { project_id } = req.body;

        if(!project_id)return res.status(400).send({message: "Invalid Request"});

        const delete_success = await prisma.project.delete({
            where: {
                id: project_id,
                user_id: id
            }
        });

        if(!delete_success) return res.status(400).send({
            message: "Project not found"
        });
        
        await mongodb_client.collection("projects").deleteOne({
            _id: project_id
        });

        return res.status(200).send({
            message: "Project Deleted"
        });


    } catch (error) {
        logger.error("[Project] Error updating HTML", error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}


module.exports.listUserProjects = async(req,res) => {
    try {
        const { id } = req.auth;
        const projects = await prisma.project.findMany({
            where: {
                user_id: id
            }
        });

        return res.status(200).send(projects);

    } catch (error) {
        logger.error("[Project] Error getting user projects", error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}