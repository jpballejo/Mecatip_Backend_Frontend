var nodemailer = require('nodemailer');
///////////////////////////////////////////////////API refresh_token
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2('139447647073-arg5pa61uktmphq8fihn7o2es7nbq8he.apps.googleusercontent.com', 'iSsvkp2LQOldWCmtvnNMVltn', "https://developers.google.com/oauthplayground");
oauth2Client.setCredentials({
  refresh_token: "1//04WpcDqElxT06CgYIARAAGAQSNwF-L9IrdNw5ovKIjq1ny6MQCtqIIXXNJKaEECmDtt5D-yUGtJu1N0SWylswk1pYVJmJFKGSg84"
});
var accessToken = oauth2Client.getAccessToken();
//console.log(accessToken);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var auth = {
  type: 'OAuth2',
  user: 'mecanografiastip@gmail.com',
  clientId: '139447647073-arg5pa61uktmphq8fihn7o2es7nbq8he.apps.googleusercontent.com',
  clientSecret: 'iSsvkp2LQOldWCmtvnNMVltn',
  refreshToken: '1//04WpcDqElxT06CgYIARAAGAQSNwF-L9IrdNw5ovKIjq1ny6MQCtqIIXXNJKaEECmDtt5D-yUGtJu1N0SWylswk1pYVJmJFKGSg84',
  accessToken:'ya29.Il-UBzzLd0JWwmDnhJanXK5yBmeQsvEwRSmc1RAd2sb6FySl58esAfGDOdLEtZ761SD9DQdRW25Jg1YMdb7AdGX2Pqg8oyP2rSTTfLhJJUY_XFXOsSvqqyrYQQMMUJdBag',
//  expires: 3500,
};

let transporter = nodemailer.createTransport({
 host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth,
});

transporter.on('token', token => {
  console.log('A new access token was generated');
  console.log('User: %s', token.user);
  console.log('Access Token: %s', token.accessToken);
  console.log('Expires: %s', new Date(token.expires));
});

exports.enviarMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (err, res) => {
    if(err) {
      return console.log(err);
    } else {
      return console.log(res);// (JSON.stringify(res));
    }
  });
};
exports.getMailOptions = () => {mailOptions = {
  from: 'mecanografiastip@gmail.com',
  to: '',
  subject: 'Message',
  text: ''
}};
