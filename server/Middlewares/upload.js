import multer from "multer";
import path from "path"

const uploadPath = path.resolve("uploads")
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, uploadPath)
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + "-" + file.originalname
        cb(null, uniqueSuffix)
    }
})

const fileFilter = (req, file, cb)=>{
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mime = allowedTypes.test(file.mimetype)

    if(ext && mime){
        cb(null, true)
    }else{
        cb(new Error("Only images are allowed"))
    }
}

const upload = multer({storage, fileFilter})

export default upload