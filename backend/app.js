global.config = require(process.env.NODE_ENV === "production"
? "./config-prod.json"
: "./config-dev.json");
const path = require("path")
const PORT = 3001;
const fileUpload = require("express-fileupload");
const userController = require("./controllers/user-controller");
const adminController = require("./controllers/admin-controller");
const authController = require("./controllers/auth-controller");
const express = require("express");
const cors = require("cors");
const server = express();
const socketHelper = require("./helpers/socket-helper")

server.use(fileUpload());
server.use(cors());
server.use(express.json());
//for hosting
server.use(express.static(path.join(__dirname,"../frontend")))
//*
server.use("/api", userController);
server.use("/api/admin", adminController);
server.use("/api/auth", authController);

//*
server.use("*",(request,response)=>{
    response.sendFile(path.join(__dirname,"../frontend/src/index.tsx"))
})
//*

const listener = server.listen(PORT, () => console.log(`Lisiting on port ${PORT}...`));

socketHelper.start(listener);