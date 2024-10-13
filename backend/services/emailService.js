const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInvitationEmail = async (name, email, registrationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "You are invited to join!",
    text: `Hi ${name},\n\nYou have been invited to join. Please click on the link below to complete your registration:\n${registrationLink}`,
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
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_CONTACT,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_CONTACT,
      subject: "Ny innsendelse av kontaktskjema",
      text: `
        Bedriftsnavn: ${companyName}
        E-post: ${email}
        Mobilnummer: ${phoneNumber}
        Melding: ${message}
        Subscribe: ${subscribe ? "Yes" : "No"}
      `,
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
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `
        Bedriftsnavn: ${companyName}
        E-post: ${email}
        Melding: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = { sendInvitationEmail, sendContactEmail, sideOneContact };
