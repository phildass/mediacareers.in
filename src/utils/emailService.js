const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.testMode = process.env.TEST_MODE === 'true' || process.env.NODE_ENV === 'test';
    if (!this.testMode) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // no-op transporter for tests
      this.transporter = {
        sendMail: async (msg) => {
          EmailService._sentInTests = EmailService._sentInTests || [];
          EmailService._sentInTests.push(msg);
          return Promise.resolve({ accepted: [], rejected: [] });
        }
      };
    }
  }

  static getSentInTests() {
    return EmailService._sentInTests || [];
  }

  async sendWelcomeEmail(to, data) {
    const message = {
      from: process.env.FROM_EMAIL || 'no-reply@mediacareers.in',
      to,
      subject: 'Welcome to MediaCareers',
      text: `Hello ${data.name}, welcome to MediaCareers.`,
      html: `<p>Hello ${data.name}, welcome to MediaCareers.</p>`
    };

    return this.transporter.sendMail(message);
  }
}

module.exports = EmailService;