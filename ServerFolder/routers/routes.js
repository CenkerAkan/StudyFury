const express=require('express');
const path=require('path');
const router=express.Router();
const bodyParser=require('body-parser');
const app=express();

const {MongoClient} = require('mongodb');
const uri="mongodb+srv://cenkerakan:QIs0sSZtMfPQPmVV@cenkercluster.tanjvgu.mongodb.net/";
const db =  new MongoClient(uri);
db.connect();

/*router.post('/login.html', (req, res) => {
    const { username, password } = req.body;
    console.log('eski ',username,' pas ',password);
    loginHandler(req,res,username,password);
});*/

router.post('/api/posts', (req, res) => {
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
});

router.get('/api/posts',(req,res)=>{
    console.log('\nmenu\n');
    res.sendFile(path.join(__dirname,'../','view','control.html'));
});


process.on('SIGINT', () => {
    client.close(() => {
      console.log('MongoDB bağlantisi kapatildi.');
      process.exit(0);
    });
  });


async function createListing(newListing) {
    const result = await db.db("Users_db").collection("users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function findOneListingByName(enteredUsername, enteredPassword) {
    try {
      console.log("fonksiyon: ",enteredUsername,"pas: ",enteredPassword);
      let result = await db.db("Users_db").collection("users").findOne({ username: enteredUsername, password: enteredPassword});
      console.log("reesult= ",result);
      result !== null; 
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
      return false; 
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
