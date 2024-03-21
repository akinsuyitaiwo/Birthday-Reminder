const nodemailer = require("nodemailer");
// import config from "../../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GENERATED_PASSWORD
  }
});

const sendMail = async (email, subject,text) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: config.GMAIL, // sender address
      to: email, // list of receivers
      subject,
      text,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
