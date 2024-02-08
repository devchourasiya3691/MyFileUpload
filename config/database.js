const mongoose=require("mongoose");

require("dotenv").config();
exports.dbConnect=() =>{
   mongoose.connect(process.env.DATABASE_URL)

 .then(console.log("db connecton sucessfull"))
 .catch((error)=>{
    console.error(error);
    console.log("error in db connection");
    process.exit(1);
 });
  

}

//module.exports(dbConnect);