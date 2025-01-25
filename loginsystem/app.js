const express = require('express');
const loginCollection= require('./db')
const app=express();

app.set('view-engine','ejs');
app.use(express.static('views'));
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/register',(req,res)=>{
    res.render('register.ejs')
})


app.get('/forgetpass',(req,res)=>{
    res.render('forgetpass.ejs')
})

app.listen(3000, ()=>{
    console.log('server is listening to port 3000...')
})

app.post('/register',async(req,res)=>{
    const data=new loginCollection({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    })
    try{
        const existingUser= await loginCollection.findOne({email:req.body.email})
        if(existingUser){
            return res.status(400).json({error:'Email already registered'})
        }else{
            await data.save()
            res.redirect('/login')
        }
    }catch(error){
        res.status(500).json({error:'Server error, Try again.'})
    }

})

app.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;

        const user=await loginCollection.findOne({email:email})

        if(!user){
            return res.status(400).json({error:'Incorrect email or password'})
        }
        if(user.password !==password){
            return res.status(400).json({error:'Incorrect password'})
        }
        res.redirect('/')
    }catch(error){
        res.status(500).json({error:'An error occured. Please try again.'})
    }
})