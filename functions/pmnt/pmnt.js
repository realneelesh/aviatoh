const { updateOrCreateDocument, PremiumAccountsCollection } = require('./db');

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    // console.log(JSON.parse(event.body).event);
    // console.log(JSON.parse(event.body));
    const webhookPayload = JSON.parse(event.body);
      // email -> event.body.payload.subscription.entity.notes.email
  
      if(webhookPayload.event === 'subscription.activated'){
          // add the user to premium subscribers list
          console.log(`writing SUBSCRIPTION ACTIVATION for user ${webhookPayload.payload.subscription.entity.notes.email}`);
          await updateOrCreateDocument(PremiumAccountsCollection, webhookPayload.payload.subscription.entity.notes.email, {
              premium: true,
              updatedAt: new Date()
          });
      }
  
      if(webhookPayload.event === 'subscription.pending'){
          // send the user an email mentioning the inability to charge and future discontinuity
   
      }
  
      if(webhookPayload.event === 'subscription.haulted'){
         // send an email mentioning the discontinuity
         // remove the user from premium subscribers list in firestore
         console.log(`writing SUBSCRIPTION HAULT for user ${webhookPayload.payload.subscription.entity.notes.email}`);
          await updateOrCreateDocument(PremiumAccountsCollection, webhookPayload.payload.subscription.entity.notes.email, {
              premium: false,
              updatedAt: new Date()
          })
  
      }
    // const subject = event.queryStringParameters.name || 'World'
    
      return {
        statusCode: 200
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
  } catch (error) {
    console.log(".............", error.toString());
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
