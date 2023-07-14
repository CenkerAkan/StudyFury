const express=require('express');
const path=require('path');
const router=express.Router();


router.get('/',(req,res)=>{
    console.log('\nblank\n');
    res.sendFile(path.join(__dirname,'../','view','first.html'));
});


router.get('/first.html',(req,res)=>{
    console.log('\nfirst\n');
    res.sendFile(path.join(__dirname,'../','view','first.html'));
});

router.get('/login.html',(req,res)=>{
    console.log('\nlogin\n');
    res.sendFile(path.join(__dirname,'../','view','login.html'));
});

router.get('/signup.html',(req,res)=>{
    console.log('\nsignup\n');
    res.sendFile(path.join(__dirname,'../','view','signup.html'));
});

router.get('/menu.html',(req,res)=>{
    console.log('\nmenu\n');
    res.sendFile(path.join(__dirname,'../','view','menu.html'));
});

router.get('/study.html',(req,res)=>{
    console.log('\nstudy\n');
    res.sendFile(path.join(__dirname,'../','view','study.html'));
});

router.get('/criticise.html',(req,res)=>{
    console.log('\ncriticise\n');
    res.sendFile(path.join(__dirname,'../','view','criticise.html'));
});

router.get('/motivation.html',(req,res)=>{
    console.log('\nmotivation\n');
    res.sendFile(path.join(__dirname,'../','view','motivation.html'));
});

router.get('/proffessionals.html',(req,res)=>{
    console.log('\nproffessionals\n');
    res.sendFile(path.join(__dirname,'../','view','proffessionals.html'));
});

router.get('/stats.html',(req,res)=>{
    console.log('\nstats\n');
    res.sendFile(path.join(__dirname,'../','view','stats.html'));
});

router.get('/store.html',(req,res)=>{
    console.log('\nstore\n');
    res.sendFile(path.join(__dirname,'../','view','store.html'));
});

module.exports=router;