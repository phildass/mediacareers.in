const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send welcome email
exports.sendWelcomeEmail = async (userEmail, userName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: 'Welcome to MediaCareers.in - Your Gateway to Media Jobs',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Welcome to MediaCareers.in, ${userName}!</h2>
        
        <p>Thank you for joining India's first AI-driven job platform exclusively for media professionals.</p>
        
        <h3>Getting Started:</h3>
        <ul>
          <li><strong>Upload Your Resume:</strong> Let our AI analyze your profile and match you with the best opportunities</li>
          <li><strong>Browse Jobs:</strong> Explore thousands of media jobs across India</li>
          <li><strong>AI-Powered Matching:</strong> Get personalized job recommendations based on your profile</li>
          <li><strong>Tailored Applications:</strong> Generate custom resumes and cover letters for each job</li>
        </ul>
        
        <h3>Premium Membership Benefits:</h3>
        <p>Upgrade to Premium for just ₹199 for 3 months and enjoy:</p>
        <ul>
          <li>Unlimited job applications</li>
          <li>AI-powered resume and cover letter generation</li>
          <li>Priority job matching</li>
          <li>Career advice from senior media professionals</li>
          <li>Access to education directory</li>
        </ul>
        
        <p><strong>Special Offer:</strong> If you have 1+ year of experience in the media industry, you qualify for FREE premium membership!</p>
        
        <h3>Key Features:</h3>
        <ul>
          <li>Comprehensive job listings from newspapers, magazines, TV channels, online media, PR agencies, and corporations</li>
          <li>AI-powered job matching and recommendations</li>
          <li>Custom resume generation for specific jobs</li>
          <li>Direct application to employers</li>
          <li>Career guidance and advice</li>
          <li>Media education directory</li>
        </ul>
        
        <p>Start your journey today by uploading your resume and exploring the best media opportunities across India!</p>
        
        <p style="margin-top: 30px;">Best regards,<br>
        <strong>The MediaCareers.in Team</strong></p>
        
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #888;">
          This email was sent to ${userEmail}. If you have any questions, please contact us at info@phildass.com
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', userEmail);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

// Send application confirmation email
exports.sendApplicationConfirmation = async (userEmail, userName, jobTitle, companyName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Application Confirmed: ${jobTitle} at ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Application Submitted Successfully!</h2>
        
        <p>Hi ${userName},</p>
        
        <p>Your application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been successfully submitted.</p>
        
        <p>The employer will review your application and contact you if your profile matches their requirements.</p>
        
        <h3>What's Next?</h3>
        <ul>
          <li>Keep your profile updated</li>
          <li>Continue exploring other opportunities</li>
          <li>Use our AI tools to improve your resume</li>
          <li>Prepare for interviews with our career advice feature</li>
        </ul>
        
        <p>Good luck with your application!</p>
        
        <p style="margin-top: 30px;">Best regards,<br>
        <strong>The MediaCareers.in Team</strong></p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending application confirmation:', error);
    return false;
  }
};
