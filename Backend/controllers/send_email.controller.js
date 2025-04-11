// controller/emailcontroller.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmailToUser = async (req, res) => {
  const { employeeCount, services, contactInfo, email, companyName } = req.body;

  console.log(employeeCount, services, contactInfo, email, companyName);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acknowledgement of Proposal Request – SwasthyaPro</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
      .header img { width: 120px; }
      ul { padding-left: 20px; }
      .footer { margin-top: 20px; text-align: center; color: #555; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://www.swasthyapro.com/assets/logo-DWAgZfOs.png" alt="SwasthyaPro Logo" />
      </div>
      <p>Dear ${companyName},</p>
      <p>Greetings from SwasthyaPro.</p>
      <p>Thank you for showing interest in our Corporate Health & Wellness Services. We have received your request for a proposal and will get back to you soon.</p>

      <p><strong>Details Provided:</strong></p>
      <ul>
        <li><strong>Employee Count:</strong> ${employeeCount}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Contact:</strong> ${contactInfo}</li>
        <li><strong>Services Interested:</strong>
          <ul>
            ${services.map(service => `<li>${service}</li>`).join('')}
          </ul>
        </li>
      </ul>

      <p>Our representative will reach out to you shortly.</p>
      <p>Warm regards,<br>Team SwasthyaPro</p>

      <div class="footer">
        <p>📞 +91-8368240887 | 📧 <a href="mailto:sales@swasthyapro.com">sales@swasthyapro.com</a><br>🌐 <a href="https://www.swasthyapro.com">www.swasthyapro.com</a></p>
        <p>&copy; 2025 SwasthyaPro. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Acknowledgement of Proposal Request – SwasthyaPro Corporate Health Solutions',
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).send('Test email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
};
