import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true
    },
    lastName:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    listing:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"listing"
      }
    ],

    avatar:{
        type:String,
        default:"https://images.app.goo.gl/Z8Requu9qEHYfSTMA"

    }
}
,{timestamps:true});

const Host = mongoose.model("Host",hostSchema);

export default Host;
