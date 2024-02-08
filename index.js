const express = require("express");
const app = express();

//middlewares
app.use(express.json());
require("dotenv").config();
const PORT=process.env.PORT || 4000;

 const fileUpload = require("express-fileupload");
// app.use(fileUpload({
//     useTempFiles :true,
//     tempFileDir : '/tmp/'
// }))
//const fileupload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const db=require("./config/database");
db.dbConnect();

const cloud=require("./config/cloudinary");
cloud.cloudConnect();

const Upload=require("./routes/FileUpload");
app.use('/v1',Upload);

app.get("/",(req,res)=>{
    res.send("<h1>THi s is hoem page</h1>")
});
app.get("/v1/imgupload1",(req,res)=>{
    res.send("<h1>THi iamge karega uploads is hoem page</h1>")
});

app.listen(PORT,(req,res)=>{
    console.log(`App is Running on Port ${PORT}`);
});

