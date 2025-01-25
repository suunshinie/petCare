const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://piu:sdedZI53OdEBCNif@loginsystem.0ac7s.mongodb.net/Node_api?retryWrites=true&w=majority&appName=loginsystem')
.then(()=>{
    console.log('Connected to the Database')
})
.catch(()=>{
    console.log('Connection failed!')
})

const loginSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Optional: Enforce unique emails at the database level
    }
})

const loginCollection= new mongoose.model('loginCollection',loginSchema)

module.exports=loginCollection