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
    listings:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
      }
    ],

    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    }
}
,{timestamps:true});

const Host = mongoose.model("Host",hostSchema);

export default Host;
