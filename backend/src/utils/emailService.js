const nodemailer = require('nodemailer');
const config = require('../config');

class EmailService {
  constructor() {
    this.transporter = null;
  }

  _getTransporter() {
    if (!this.transporter && !config.testMode) {
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: config.email.auth
      });
    }
    return this.transporter;
  }

  /**
   * Send welcome email to newly registered user
   * In TEST_MODE, this only logs the email instead of sending
   */
  async sendWelcomeEmail(user) {
    const mailOptions = {
      from: config.email.from,
      to: user.email,
      subject: 'Welcome to MediaCareers.in',
      html: this._getWelcomeEmailTemplate(user)
    };

    if (config.testMode) {
      console.log('=== TEST MODE: Email Not Sent ===');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Content:', mailOptions.html);
      console.log('================================');
      return { success: true, testMode: true, email: mailOptions };
    }

    try {
      const transporter = this._getTransporter();
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  /**
   * Generate welcome email HTML template
   */
  _getWelcomeEmailTemplate(user) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #e6d5f0 0%, #ff6b6b 100%); 
                   color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 30px; background: #e6d5f0; 
                   color: #333; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to MediaCareers.in!</h1>
          </div>
          <div class="content">
            <h2>Hi ${user.firstName},</h2>
            <p>Thank you for joining MediaCareers.in - India's premier platform for media and allied job opportunities.</p>
            <p>We're excited to help you discover amazing career opportunities in the media industry.</p>
            <p>Here's what you can do next:</p>
            <ul>
              <li>Complete your profile</li>
              <li>Upload your resume</li>
              <li>Browse available job listings</li>
              <li>Set up job alerts</li>
            </ul>
            <p style="text-align: center;">
              <a href="${config.cors.origin}/dashboard" class="button">Get Started</a>
            </p>
          </div>
          <div class="footer">
            <p>© 2024 MediaCareers.in. All rights reserved.</p>
            <p>This email was sent to ${user.email}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
