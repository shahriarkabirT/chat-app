const bcrypt = require("bcrypt");
const User = require("../models/people")
const getUsers = (req,res) =>{
    res.render("users");
}

const addUser = async (req,res) =>{
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    if(req.files && req.files.length > 0){
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword
        })
    } else{
        newUser = new User({
            ...req.body,
            password: hashedPassword
        })
    }
    try{
        const result = await newUser.save();
        res.status(200)
        .json({
            message:"User was added successfully!",
        })
    } catch(err){
        res.status(500).json({
            errors:{
                common:{
                   msg: "Unknown error occured",
                }
            },
        })
    }
}
module.exports = {
    getUsers,addUser
};