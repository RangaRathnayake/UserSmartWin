var nodemailer = require('nodemailer');
const http = require('http');
const db = require('../util/conn');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var transporter = nodemailer.createTransport({
  host: 'mail.smartwinent.com',
  port: 26,
  secure: false, // use SSL
  auth: {
    user: 'info@smartwinent.com',
    pass: 'SWE-Info',
  },
});

const message = 'Welcome to MCK : ';

exports.emailSend = (param) => {
  try {
    let mailOptions = '';
    if (param.html) {
      mailOptions = {
        from: 'info@smartwinent.com',
        to: param.to,
        subject: param.subject,
        text: param.message,
        html: `${param.html}`,
      };
    } else {
      mailOptions = {
        from: 'info@smartwinent.com',
        to: param.to,
        subject: param.subject,
        text: param.message,
      };
    }

    // console.log(param);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    message.replace(' ', '+');
  } catch (error) {
    console.log(error);
  }
};

exports.smsSend = (param) => {
  var id = '';
  var pword = '';
  var link = '';

  //  db.execute('SELECT sms_getting_setting.sms_setting_id,sms_getting_setting.sms_gatway_id,sms_getting_setting.sms_gatway_pwd,sms_getting_setting.sms_gatway_link FROM sms_getting_setting', (er, ro, fd) => {
  //  if (!er) {
  // id = ro[0].sms_gatway_id;
  // pword = ro[0].sms_gatway_pwd;
  // link = ro[0].sms_gatway_link;

  console.log('sms send call');

  console.log(param);

  let message = param.message;
  let mobile = param.mob;

  console.log(' ----------------------------------- mobile : ' + mobile);

  // http://textit.biz/sendmsg/index.php?id=%2294753771770%22&password=%225400%22&text=%22Testing%22&to=%220702517628%22&from=%22SmartWin%22

  //http://sms.airtel.lk:5000/sms/send_sms.php?username=smart_win&password=eTomfGJt7ZQ2ai&src=SMART%20WIN&dst=94702517628&msg=message eka methana type karanna&dr=1

  // http.get("" + link + "id=" + id + "&password=" + pword + "&text=" + message + "&to=" + mobile + "&from=SmartWin", function(err, res, body) {
  http.get(
    'http://bsms.airtel.lk:5000/sms/send_sms.php?username=smart_win&password=Sm32h8Nw&src=SMART%20WIN&dst=' +
      mobile +
      '&msg=' +
      message +
      '&dr=1&lan=u',
    function (err, res, body) {
      if (err) {
        console.log('SMS  -------------- eroor on');
        console.log(body);
        // console.log(err);
      } else {
        console.log('SMS Sent ---------------');
        console.log(body);
        // console.log(res);
      }
    }
  );

  //  }
  //  });
};
