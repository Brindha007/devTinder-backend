const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength:4,
        maxLength:30
    },
    lastName : {
        type: String,
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
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address "+value);
            }
        }
    },
    password : {
        type: String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong password " +value );
            }
        }
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL "+value);
            }
        }
    }

},
{
    timestamps:true
});

const User = mongoose.model("User", userSchema);

module.exports = User;