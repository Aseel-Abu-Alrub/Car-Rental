import multer from "multer"


export const fileValidation={
image:['image/png','image/jpeg','image/webp'],
file:['application/pdf']
}

function fileUpload(customValidation=[]){
const storage=multer.diskStorage({})

function fileFilter(req,file,cb){
if(customValidation.includes(file.mimetype)){
return cb(null,true)
}
else{
    return cb("invalid format",false)
}
}

const upload=multer({fileFilter,storage})
return upload
}


export default fileUpload