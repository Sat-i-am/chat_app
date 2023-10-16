const User = require("../model/userModel");
const bcrypt = require("bcrypt");



module.exports.register = async (req,res,next) => { //in this 'req' data is coming from front end when we did post request
    try{
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });//checking if this username is already present
        if(usernameCheck)
            return res.json({msg: "Username already used", status: false });

        const emailCheck = await User.findOne({ email });
        if(emailCheck)
            return res.json({msg: "Email already used", status: false });
        
        //if everything is fine then encrypting our password
        const hashedPassword = await bcrypt.hash(password, 10); //password is encrypted now
        const user = await User.create({
            email,
            username,
            password: hashedPassword, //in User schema, the encrypted password is stored 
        });
        delete user.password; //we deleted the unencrypted password
        return res.json({status: true, user});
    } catch (err){
        next(err);
    }
}; 