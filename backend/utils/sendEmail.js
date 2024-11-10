import nodemailer from 'nodemailer'


// Define the sendEmail function
async function sendEmail(to, subject, text) {
  // Set up transporter configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "sainathdev9@gmail.com",
      pass: "knxj lsgy ftsf yapk",
    },
  });

  // Set up email options
  const mailOptions = {
    from: "sainathdev9@gmail.com", // Sender address
    to: to,                       // Recipient address
    subject: subject,             // Subject line
    text: text,                   // Email body text
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendEmail;
