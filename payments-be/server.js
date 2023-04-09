const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const Razorpay = require('razorpay');
const { updateOrCreateDocument, PremiumAccountsCollection } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors('*'));
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

app.get('/get_subscription', async (req, res) => {

    var instance = new Razorpay({ key_id: process.env.RAZORPAY_TEST_KEY_ID, key_secret: process.env.RAZORPAY_TEST_KEY_SECRET })
    res.send(await instance.subscriptions.all({}));
});

app.post('/', (req, res) => {
    // email -> req.body.payload.subscription.entity.notes.email

    if(req.body.event === 'subscription.activated'){
        // add the user to premium subscribers list
        console.log('writing');
        updateOrCreateDocument(PremiumAccountsCollection, req.body.payload.subscription.entity.notes.email, {
            premium: true,
            updatedAt: new Date()
        });
        res.send('ok');
    }

    if(req.body.event === 'subscription.pending'){
        // send the user an email mentioning the inability to charge and future discontinuity

        res.send('ok');
    }

    if(req.body.event === 'subscription.haulted'){
       // send an email mentioning the discontinuity
       // remove the user from premium subscribers list in firestore
       updateOrCreateDocument(PremiumAccountsCollection, req.body.payload.subscription.entity.notes.email, {
        premium: false,
        updatedAt: new Date(),
    });
    res.send('ok');

    }
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
