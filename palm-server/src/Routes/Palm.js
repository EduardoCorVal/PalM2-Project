const express = require("express");
const PalmController = require("../controllers/PalmController");
const oRouter = express.Router();

const Controller = new PalmController();

oRouter.post("/chatting", (oRequest, oResponse) => {
    Controller.chatting(oRequest, oResponse);
});

module.exports = oRouter;