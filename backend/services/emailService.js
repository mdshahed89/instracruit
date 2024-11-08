const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "send.one.com", 
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_TEAM, 
    pass: process.env.EMAIL_TEAM_PASS, 
  },
});

const sendInvitationEmail = async (name, email, companyName, registrationLink) => {
  const mailOptions = {
    from: "team@instacruit.no",
    to: email,
    subject: `Invitasjon til å bli med på Instarecruit-dashbordet for ${companyName || "N/A"}`,
    text: `Hi ${name || "Sir"},\n\nSå hyggelig at du har blitt invitert til å samarbeide på Instarecruit-dashbordet for ${companyName || "N/A"}!\n Du kan nå enkelt aktivere brukerkontoen din og få tilgang til alle funksjonene ved å logge inn her:\n ${registrationLink}\n\nSer frem til samarbeidet!\nVennlig hilsen,\nInstarecruit-teamet`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invitation email sent successfully");
  } catch (error) {
    console.error("Error sending invitation email:", error);
    throw new Error("Failed to send email");
  }
};

const sendContactEmail = async (
  companyName,
  email,
  phoneNumber,
  message,
  subscribe
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "send.one.com", 
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.EMAIL_ONE_CONTACT, 
        pass: process.env.EMAIL_TEAM_PASS, 
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ONE_CONTACT,
      // from: process.env.EMAIL_CONTACT,
      to: process.env.EMAIL_ONE_CONTACT,
      subject: `Ny henvendelse mottatt fra ${companyName}`,
      text: `
        Bedriftsnavn: ${companyName}
        E-post: ${email}
        Mobilnummer: ${phoneNumber}
        Melding: ${message}
        Subscribe: ${subscribe ? "Yes" : "No"}
      `,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email sending failed");
  }
};

const sideOneContact = async (
  companyName,
  email,
  phoneNumber,
  message,
  subscribe
) => {
  try {
    const sidesoneTransporter = nodemailer.createTransport({
      host: "send.one.com", 
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.EMAIL_ONE_ADMIN, 
        pass: process.env.EMAIL_TEAM_PASS, 
      },
    });

    console.log(process.env.EMAIL_ONE_ADMIN, process.env.EMAIL_TEAM_PASS);
    

    const mailOptions = {
      from: process.env.EMAIL_ONE_ADMIN,
      to: process.env.EMAIL_SIDESONE,
      subject: "New Contact Form Submission",
      text: `
        Bedriftsnavn: ${companyName}
        E-post: ${email}
        Melding: ${message}
      `,
      reaplyTo: email
    };

    const info = await sidesoneTransporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = { sendInvitationEmail, sendContactEmail, sideOneContact };
