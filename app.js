const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require('@mailchimp/mailchimp_marketing')
const path = require('path');

const app = express();

//------MailChimp Config-------//
 
mailchimp.setConfig({
  server:"us12", //your server can be found at the end of your API-key.
  apiKey:"841a55fff2efb18dfe4387836b1722a8-us12",
});


//static files into public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


//---Your post function that is used when submitting your info--//
//app.post --> included HTML action and method important! 
app.post("/", (req, res) => {
  const email = req.body.email;
  console.log(email);


//-------MailChimp add user to audience-------//
const listId = "0681173e55";
const subscribingUser = {
    email: email
};
//Mailchimp API POST New Subscriber Function
async function run(){
  //"Try" this function and if sucessful do the following
  try {
    const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed"
});
console.log("Added the contact from as an audience member" + response.subscribingUser.email);

res.sendFile(__dirname + "/success.html")
}
//If the "Try" function isn't successful, do this on failure
catch (err) {
  //This is will return the error code
  console.log(err.status);
  res.sendFile(__dirname + "/failure.html")
  }
}

run(); //runs the MailChimp function above.

});
/*
app.post("/error", (req,res) => {
res.redirect("/");
})
*/
app.listen(process.env.PORT || 3000, () => {
console.log("server is running");
});
