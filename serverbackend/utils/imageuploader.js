const cloudinary = require('cloudinary').v2

exports.imageupload=async(file,folder="dhairyahelp")=>{
    
const options={folder};
// if(height){
//     options.height=height;}
//     if(quality){
//         options.quality=quality;
//     }
//     if(width){
//         options.width=width;
//     }
    options.resource_type="auto";
return await cloudinary.uploader.upload(file.tempFilePath,options);

    
}
