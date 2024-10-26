const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength:4,
        maxLength:30
    },
    lastName : {
        type: String,
        required : true
    },
    age : {
        type: Number,
        min:18

    },
    gender :{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid.")
            }
        }
    },
    emailId : {
        type : String,
        required :true,
        unique: true,
        lowercase : true,
        trim: true
    },
    password : {
        type: String,
        required :true
    },
    about : {
      type : String,
      default:"I am a Full Stack MERN Developer."
    },
    skills :{
        type:[String]
    },
    photoUrl : {
        type: String,
        default:"https://pngtree.com/freepng/user-profile-avatar_13369988.html"
    }

},
{
    timestamps:true
});

const User = mongoose.model("User", userSchema);

module.exports = User;