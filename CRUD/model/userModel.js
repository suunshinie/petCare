import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    reservationDate:{
        type:Date,
        required:true
    },
    reservationTime:{
        type:Number,
        required:true
    },
    reservationService:{
        type:String,
        required:true
    }
    
})

export default mongoose.model("users",userSchema);