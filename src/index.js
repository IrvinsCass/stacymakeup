import './index.pug'
import './index.scss'

require('dotenv').config()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var isSended = 0;

submit.onclick = function() {


  if (isSended == 1) {
    alert('Sript already runned!')
    console.log(0);
    return 0;
  }

  var customerName = document.getElementById('name').value;
  var customerPhone = document.getElementById('phone').value;
  var customerAddress = document.getElementById('address').value;
  var customerTime = document.getElementById('time').value;

  const msg = {
    to: 'irvins.cassull@gmail.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
  };
  sgMail.send(msg);

  isSended = 1;
}
