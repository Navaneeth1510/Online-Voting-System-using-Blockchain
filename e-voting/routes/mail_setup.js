import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'online.voting.system645@gmail.com',
    pass: 'janc bldx wznq ynir', 
  },
});

 

router.get('/send-otp/:name/:email/:otp', async (req, res) => { 
  const { name, email, otp } = req.params;
  const mailOptions = {
    from: 'online.voting.system645@gmail.com',
    to: email,
    subject: 'Your OTP for Authentication',
    text: `Your OTP : ${otp}`,
    html: `
      <div style="padding: 20px; border: 2px solid #e4dcf8; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://i.imgur.com/zLStdRj.png" alt="Logo" style="max-width: 40%; height: auto;" />  
        </div>
        <div style="color:black">
          <h2 style="color:#5522D0">Hello ${name},</h2>
          You are receiving this email because a request was made for a one-time code that can be used for authentication.<br>
          Please enter the following code for verification:<br>
          <h2 style="text-align: center;">${otp}</h2>
          If you did not request this, please change your password.
        </div>
        <div>
          <h3>Best regards,</h3>
          <h4>Online Voting System</h4>
        </div>
      </div>
    `,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'OTP sent successfully', info });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send({ error: 'Error sending OTP' });
  }
});

export default router;


