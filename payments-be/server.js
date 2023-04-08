const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const Razorpay = require('razorpay');
const { updateOrCreateDocument, PremiumAccountsCollection } = require('./db');

const app = express();
app.use(cors('*'));
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

app.get('/get_subscription', async (req, res) => {

    var instance = new Razorpay({ key_id: 'rzp_test_EE2euGofuf2Jmh', key_secret: 'lAEyKSGZOPcleRySojKuIV2a' })
    res.send(await instance.subscriptions.all({}));
});

app.post('/', (req, res) => {
    // email -> req.body.payload.subscription.entity.notes.email

    if(req.body.event === 'subscription.activated'){
        // add the user to premium subscribers list
        updateOrCreateDocument(PremiumAccountsCollection, req.body.payload.subscription.entity.notes.email, {
            premium: true,
            updatedAt: new Date()
        })
    }

    if(req.body.event === 'subscription.pending'){
        // send the user an email mentioning the inability to charge and future discontinuity
    }

    if(req.body.event === 'subscription.haulted'){
       // send an email mentioning the discontinuity
       // remove the user from premium subscribers list in firestore
       updateOrCreateDocument(PremiumAccountsCollection, req.body.payload.subscription.entity.notes.email, {
        premium: false,
        updatedAt: new Date()
    })
    }
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
