const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload,imageUpload1} = require("../controllers/FileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
//router.get("/imageUpload1",imageUpload1 );
router.post("/imageUpload",imageUpload );
//router.post("/videoUpload",videoUpload );
//router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;