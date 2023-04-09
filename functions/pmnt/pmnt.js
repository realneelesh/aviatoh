const { updateOrCreateDocument, PremiumAccountsCollection } = require('./db');

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
      // email -> event.body.payload.subscription.entity.notes.email
  
      if(event.body.event === 'subscription.activated'){
          // add the user to premium subscribers list
          console.log('writing');
          updateOrCreateDocument(PremiumAccountsCollection, event.body.payload.subscription.entity.notes.email, {
              premium: true,
              updatedAt: new Date()
          });
          res.send('ok');
      }
  
      if(event.body.event === 'subscription.pending'){
          // send the user an email mentioning the inability to charge and future discontinuity
  
          res.send('ok');
      }
  
      if(event.body.event === 'subscription.haulted'){
         // send an email mentioning the discontinuity
         // remove the user from premium subscribers list in firestore
         updateOrCreateDocument(PremiumAccountsCollection, event.body.payload.subscription.entity.notes.email, {
          premium: false,
          updatedAt: new Date(),
      });
      res.send('ok');
  
      }
    // const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      // body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
