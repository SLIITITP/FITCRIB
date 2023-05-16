const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
dotenv.config();

cloudinary.config({
    cloud_name : "ddh58ity6",
    api_key : "547957864123496",
    api_secret : process.env.API_SECRET
})

uploadToCloudinary = (path,folder) => {
    return cloudinary.v2.uploader.upload(path,{
        folder
    }).then((data) =>{
        return {url : data.url,public_id:data.public_id};
    }).catch((error) => {
        console.log(error)
    })
}

removeFromCloudinary = async (public_id) =>{
    await cloudinary.v2.uploader.destroy(public_id,function (error,result) {
        console.log(error,result)
    })
}

module.exports = {uploadToCloudinary,removeFromCloudinary}