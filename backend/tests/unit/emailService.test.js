const EmailService = require('../../src/utils/emailService');

describe('Email Service', () => {
  let emailServiceInstance;
  
  const mockUser = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe'
  };

  beforeAll(() => {
    // Ensure TEST_MODE is true for these tests
    process.env.TEST_MODE = 'true';
    process.env.NODE_ENV = 'test';
  });

  beforeEach(() => {
    // Create a new instance for each test
    emailServiceInstance = new EmailService();
    // Clear sent emails
    EmailService._sentInTests = [];
  });

  describe('sendWelcomeEmail in TEST_MODE', () => {
    it('should not send actual email in test mode', async () => {
      const result = await emailServiceInstance.sendWelcomeEmail(
        mockUser.email,
        { name: mockUser.firstName }
      );

      expect(result.accepted).toBeDefined();
      
      // Check that email was stored in test array
      const sentEmails = EmailService.getSentInTests();
      expect(sentEmails.length).toBe(1);
      expect(sentEmails[0].to).toBe(mockUser.email);
      expect(sentEmails[0].subject).toContain('Welcome');
    });

    it('should include user name in email template', async () => {
      await emailServiceInstance.sendWelcomeEmail(
        mockUser.email,
        { name: mockUser.firstName }
      );

      const sentEmails = EmailService.getSentInTests();
      expect(sentEmails[0].html).toContain(mockUser.firstName);
      expect(sentEmails[0].text).toContain(mockUser.firstName);
    });

    it('should have proper email structure', async () => {
      await emailServiceInstance.sendWelcomeEmail(
        mockUser.email,
        { name: mockUser.firstName }
      );

      const sentEmails = EmailService.getSentInTests();
      const email = sentEmails[0];
      
      expect(email.from).toBeDefined();
      expect(email.to).toBe(mockUser.email);
      expect(email.subject).toBeDefined();
      expect(email.html).toBeDefined();
      expect(email.text).toBeDefined();
    });

    it('should include MediaCareers branding', async () => {
      await emailServiceInstance.sendWelcomeEmail(
        mockUser.email,
        { name: mockUser.firstName }
      );

      const sentEmails = EmailService.getSentInTests();
      const email = sentEmails[0];
      
      expect(email.html).toContain('MediaCareers');
      expect(email.subject).toContain('MediaCareers');
    });

    it('should store multiple emails in test mode', async () => {
      await emailServiceInstance.sendWelcomeEmail('user1@test.com', { name: 'User1' });
      await emailServiceInstance.sendWelcomeEmail('user2@test.com', { name: 'User2' });

      const sentEmails = EmailService.getSentInTests();
      expect(sentEmails.length).toBe(2);
      expect(sentEmails[0].to).toBe('user1@test.com');
      expect(sentEmails[1].to).toBe('user2@test.com');
    });
  });

  describe('Email template validation', () => {
    it('should not send emails when TEST_MODE is true', async () => {
      // This is critical for the requirement
      expect(emailServiceInstance.testMode).toBe(true);
      
      await emailServiceInstance.sendWelcomeEmail(
        mockUser.email,
        { name: mockUser.firstName }
      );
      
      // Verify email was stored, not sent
      const sentEmails = EmailService.getSentInTests();
      expect(sentEmails.length).toBe(1);
    });

    it('should use correct default sender', async () => {
      await emailServiceInstance.sendWelcomeEmail(
        mockUser.email,
        { name: mockUser.firstName }
      );

      const sentEmails = EmailService.getSentInTests();
      expect(sentEmails[0].from).toBe('no-reply@mediacareers.in');
    });
  });
});
