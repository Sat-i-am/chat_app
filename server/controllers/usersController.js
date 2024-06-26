const User = require("../model/userModel");
const bcrypt = require("bcrypt");
//controller tells what to do with data coming from front-end


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

module.exports.login = async (req,res,next) => { //in this 'req' data is coming from front end when we did post request
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username });//checking if this user is present
        if(!user)
            return res.json({msg: "Incorrect username or password", status: false });

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if( !isPasswordValid )
            return res.json({msg: "Incorrect username or password", status: false})
                
        return res.json({status: true, user});
    } catch (err){
        next(err);
    }
}; 
module.exports.setAvatar = async (req, res, next)=>{ //this defines what backend does when we enter setAvatar route 
    console.log(`this is the request from front end ${req}`);
    
    try{ 
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        })
        //console.log(userData);
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })
    } catch( err ){
        console.log("here is error")
        next(err);
    }
}

module.exports.getAllUsers = async(req,res,next) => {
    try{
        const users = await User.find({_id: { $ne: req.params.id} }).select([
       // const users = await User.find({ _id: { $ne: req.params.id } }).select([    
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        // console.log(users);
        return res.json(users);
    } catch (err) {
        console.log("there is error");
        next(err);
    }
}