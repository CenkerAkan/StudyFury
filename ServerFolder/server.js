
const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://cenkerakan:QIs0sSZtMfPQPmVV@cenkercluster.tanjvgu.mongodb.net/';
const db = new MongoClient(uri);
db.connect();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    next();
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.get('/api/posts/create',(req,res)=>{
    res.send("hello this get")
    console.log('post basarili');
});

app.post('/api/posts/create',(req,res)=>{
    console.log('post basarili');

    const { username, password } = req.body;
    try {
      console.log('Received username:', username);
      console.log('Received password:', password);
        createListing({
            username:username,
            password:password
        })
      res.status(200).json({ message: 'Post received successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
})
app.post('/api/posts/read', (req, res) => {
    const { username, password } = req.body;
    handlePostRequest(req, res, username, password);
});

app.post('/api/posts/delete', (req, res) => {
    const { username, password } = req.body;
    deleteHelper(req,res,username,password,db);
});

async function deleteHelper(req, res, username, password,db){
    const message= await handlePostRequest(req,res,username,password);
    console.log("the message is: "+message);
    if(message=='user found'){
        console.log("soon will be deleted user found")
        await deleteListingByName(db,username,password);
    }else{
        console.log("soon will be deleted user not found")
        //const data = { username: username, password: password, msg: "user can not be deleted because user not found" };
        //res.status(200).json(data);
    }
}


async function handlePostRequest(req, res, username, password) {
    try {
        const message = await loginHandler(req, res, username, password);
        const data = { username: username, password: password, msg: message };
        //console.log(data);
        res.status(200).json(data);
        return message.toString();
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


// db commands
async function createListing(newListing) {
    const result = await db.db("Users_db").collection("users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function loginHandler(req, res,username,password) {
    //console.log(username);
    let reso = await findOneListingByName(username, password);
    //console.log(reso);
    if(reso){
        return "user found";
    }else{
        return "user not found";
    }
}
async function findOneListingByName(enteredUsername, enteredPassword) {
    try {
      //console.log("fonksiyon: ",enteredUsername,"pas: ",enteredPassword);
      let result = await db.db("Users_db").collection("users").findOne({ username: enteredUsername, password: enteredPassword});
      //console.log("result= ",result);
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
async function deleteListingByName(db, username,password) {
    const result = await db.db("Users_db").collection("users")
            .deleteOne({ username:username,
            password:password});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}