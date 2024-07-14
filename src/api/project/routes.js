const ProjectController = require('./controller');
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middleware/auth');

router.get("/", verifyAccessToken, (req, res) => {
    res.send("Project API");
});

router.post("/", verifyAccessToken, ProjectController.createProject);

router.delete("/", verifyAccessToken, ProjectController.deleteProject);

router.get("/html/:project_id", verifyAccessToken, ProjectController.getHTMLContent);

router.post("/html/:project_id", verifyAccessToken, ProjectController.postHTMLContent); 

router.get("/list", verifyAccessToken, ProjectController.listUserProjects);

module.exports = router;