const uploader = (
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
) =>{
   
    const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/}`;

    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,UPLOAD_FOLDER);
        },
        filename:(req,file,cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = 
                file.originalname
                .replace(fileExt,"")
                .toLowerCase()
                .split(" ")
                .join("-") + 
                "-" + 
                Date.now();

                cb(null,fileNmae,fileExt);
        }
    });
    const upload = multer({
        storage: storage,
        limits:{
            fileSize: max_file_size,
        },
        fileFilter: (req,res,cb) =>{
            if(allowed_file_types.include(file.mimetype)){
                cb(null,true);
            } else{
                cb(createError(error_msg));
            }
        },
    });
    return upload;
}