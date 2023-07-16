const express=require('express');
const path=require('path');
const router=express.Router();


const {MongoClient} = require('mongodb');
const uri="mongodb+srv://cenkerakan:QIs0sSZtMfPQPmVV@cenkercluster.tanjvgu.mongodb.net/";
const db =  new MongoClient(uri);
db.connect();

router.get('/',(req,res)=>{
    console.log('\nblank\n');
    res.sendFile(path.join(__dirname,'../','view','first.html'));
});

router.get('/first.html',(req,res)=>{
    console.log('\nfirst\n');
    res.sendFile(path.join(__dirname,'../','view','first.html'));
});

router.get('/login.html',(req,res,next)=>{
    console.log('\nlogin\n');
    res.sendFile(path.join(__dirname,'../','view','login.html'));
});

router.post('/login.html', (req, res) => {
    const { username, password } = req.body;
    console.log('eski ',username,' pas ',password);
    loginHandler(req,res,username,password);
    /*let reso= await findOneListingByName(username,password);
    console.log(`sonuc: ${reso}`);
    if(reso){
        res.redirect(path.join('menu.html'));
    }else{
        res.redirect(path.join('login.html'));
    }*/
});

router.get('/signup.html',(req,res)=>{
    console.log('\nsignup\n');
    res.sendFile(path.join(__dirname,'../','view','signup.html'));
    
});

router.post('/signup.html', (req, res) => {
    const { username, password } = req.body;
    try {
        
       
        //const collection = db.collection("users");
        createListing({ username:username, password:password });
        //console.log(`Yeni kullanici oluşturuldu: ${result.insertedId}`);
        console.log('deneme');
        if(username==='a'&&password==='a'){
            console.log('already exists!')
        }
        //db.close();
    } catch (error) {
        console.error("Kullanici oluşturma hatasi:", error);
    }
    res.redirect(path.join('first.html'));
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

process.on('SIGINT', () => {
    client.close(() => {
      console.log('MongoDB bağlantisi kapatildi.');
      process.exit(0);
    });
  });

/*async function createListing(client, newListing){
    const result = await db.db("users_db").collection("users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}*/
async function createListing(newListing) {
    const result = await db.db("Users_db").collection("users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function findOneListingByName(enteredUsername, enteredPassword) {
    try {
      //const collection = db.db("Users_db").collection("users");
      console.log("fonksiyon: ",enteredUsername,"pas: ",enteredPassword);
      let result = await db.db("Users_db").collection("users").findOne({ username: enteredUsername, password: enteredPassword});
      console.log("reesult= ",result);
      result !== null; // Eğer sonuç null değilse (yani eşleşme bulunduysa) true döndür
      if(result===null){
          console.log("cevap null");
        return false;
      }else{
        return true;
      }
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error finding user:", error);
      return false; // Hata durumunda false döndür
    }
}
async function loginHandler(req, res,username,password) {
    console.log(username);
    let reso = await findOneListingByName(username, password);
    console.log(`sonuc: ${reso}`);
    if (reso) {
      res.redirect(path.join('menu.html'));
    } else {
      res.redirect(path.join('login.html'));
    }
  }
module.exports=router;
