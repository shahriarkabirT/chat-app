const { check, validationResult } = require("express-validator");
const User = require("../models/people");
const createError = require("http-error");
const { unlink } = require("../routers/loginRouter");

const addUserValidator = [
    check("name")
        .isLength({min:1})
        .withMessage("Name is required")
        .isAlpha("en-US",{ignore:" -"})
        .withMessage("Name must contain anything other than alphabet")
        .trim(),
    check("email").isEmail().withMessage("Invalid email address")
        .trim()
        .custom(async(value) => {
            try{
                const user = await User.findOne({ email:value })
                if(user) throw createError("Email already exists");
                
            } catch(err){ 
                throw createError(err.message)
            }
        }),
    check("mobile")
        .isMobilePhone("Bn-BD",{
            strictMode: true,
        })
        .withMessage("Mobile must be a valid Bangladeshi Number")
        .custom(async(value)=> {
            try{
                const user = await User.findOne({mobile:value});
                if(user){
                    throw createError("Mobile number is already used");
                }
            }catch(err){
                throw createError(err.message);
            }
        })
];

const addUserValidatorHandler = (req,res,next)=>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length === 0){
        next();
    }
    else{
        if(req.files.length > 0){
            const {filename} = req.files[0];
            unlink(
                path.join(__dirname,`/./public/uploads/avaters/${filename}`),
                (err) =>{
                    if(err) console.log(err);
                }
            );
        } 
        res.status(500)
        json({
            errors : mappedErrors
        }) 
    }
}
module.exports = {
    addUserValidator,
    addUserValidatorHandler
}