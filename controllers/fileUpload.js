const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka hadnler
// exports.imageUpload1 = async(req,res)=>{
   
// res.send("<p>irejg</p>");
//     }

exports.imageUpload = async (req, res) => {
    try{   //data fetch

        //name remove kara yaha se sirf tags aur email hi use ho raha tha

        const { tags, email} = req.body;
        console.log(tags,email);

        //ye niche add kiya for all file support

        const file = req.files.file  || req.files.videoFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png","mov","pdf","mp4","txt"];
        var fileType = file.name.split('.')[1].toLowerCase();
        var fileName = file.name.split('.')[0].toLowerCase();
     fileName = Date.now();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "devjii",60);
        console.log(response);

        //db me entry save krni h
        console.log("testing here");
        console.log(file);
        const myfile = await File.create({
            name:fileName,
            tags,
            email,
            imageUrl:response.secure_url,
        });
        console.log("db saved");
        console.log(myfile);
       // console.log(doc);
      // res.send(myfile);
      // res.send('<p>image upload</p><label for="myfile">Select a file:</label><input type="file" id="myfile" name="myfile"><input type="submit">');


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}