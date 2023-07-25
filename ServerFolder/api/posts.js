const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://cenkerakan:QIs0sSZtMfPQPmVV@cenkercluster.tanjvgu.mongodb.net/';
const db = new MongoClient(uri);
db.connect();

router.route('/posts')
  .get((req, res) => {
    console.log('\nmenu\n');
    res.sendFile(path.join(__dirname, '../', 'view', 'control.html'));
  })
  .post((req, res) => {
    const { username, password } = req.body;
    try {
      res.status(200).json({ message: 'Post received successfully!' });
    } catch (error) {
      console.error('Kullanici oluşturma hatasi:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

async function createListing(newListing) {
  const result = await db.db('Users_db').collection('users').insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function findOneListingByName(enteredUsername, enteredPassword) {
  try {
    console.log('fonksiyon: ', enteredUsername, 'pas: ', enteredPassword);
    let result = await db.db('Users_db').collection('users').findOne({ username: enteredUsername, password: enteredPassword });
    console.log('reesult= ', result);
    result !== null; // Eğer sonuç null değilse (yani eşleşme bulunduysa) true döndür
    if (result === null) {
      console.log('cevap null');
      return false;
    } else {
      return true;
    }
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error finding user:', error);
    return false; // Hata durumunda false döndür
  }
}

async function loginHandler(req, res, username, password) {
  console.log(username);
  let reso = await findOneListingByName(username, password);
  console.log(`sonuc: ${reso}`);
  if (reso) {
    res.redirect(path.join('menu.html'));
  } else {
    res.redirect(path.join('login.html'));
  }
}

module.exports = router;
