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

function formatDateTime(dateString) {
    // Parse the date in UTC
    const date = new Date(dateString);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getUTCDate();
    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
                day % 10 === 3 && day !== 13 ? "rd" : "th";
    const formattedDate = `${months[date.getUTCMonth()]} ${day}${suffix}, ${date.getUTCFullYear()}`;

    // Format the time
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate}  ${formattedTime}`;
}


router.get('/send/:start/:end', async (req, res) => {
    const { start, end } = req.params;
    const s = formatDateTime(start);
    const e = formatDateTime(end);
    try {
        const response = await fetch('http://localhost:5000/voter/emails');
        const voterEmails = await response.json();
        for (const voter of voterEmails) {
            const email = voter.Email;
            const name = voter.Name;
            const mailOptions = {
                from: 'online.voting.system645@gmail.com',
                to: email,
                subject: 'Election has been scheduled ',
                text: ``,
                html: `
                    <div style="padding: 20px; border: 2px solid #e4dcf8; font-family: Arial, sans-serif;">
                    <div style="text-align: center;">
                        <img src="https://i.imgur.com/zLStdRj.png" alt="Logo" style="max-width: 40%; height: auto;" />  
                    </div>
                    <div style="color:black">
                        <h2 style="color:#5522D0">Hello ${name},</h2>
                        We are excited to inform you that an election has been scheduled! This is your opportunity to make your voice heard and contribute to shaping the future. Below are the election details:<br>
                        <h2 style="text-align: center;">Start Time: ${s}</h2>
                        <h2 style="text-align: center;">End Time: ${e}</h2>
                        Your right to vote is one of the most powerful tools for change. <br>
                        We kindly request you to participate and cast your vote during the scheduled time.
                    </div>
                    <div>
                        In order to vote in the election, 
                        <a href="http://onlinevotingsystem.com:5173/">Click Here</a>
                    </div>
                    <div><br>
                        <h3>Best regards,</h3>
                        <h4>Online Voting System</h4>
                    </div>
                    </div>
                `,
            };
            try {
                const info = await transporter.sendMail(mailOptions);
            } catch (error) {
                console.error('Error sending OTP:', error);
                res.status(500).send({ error: 'Error sending OTP' });
            }
        }
        res.status(200).send({ message: 'Emails sent successfully' });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});

export default router;


