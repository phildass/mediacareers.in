const emailService = require('../../src/utils/emailService');
const config = require('../../src/config');

describe('Email Service', () => {
  const mockUser = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe'
  };

  beforeAll(() => {
    // Ensure TEST_MODE is true for these tests
    process.env.TEST_MODE = 'true';
  });

  describe('sendWelcomeEmail in TEST_MODE', () => {
    it('should not send actual email in test mode', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const result = await emailService.sendWelcomeEmail(mockUser);

      expect(result.success).toBe(true);
      expect(result.testMode).toBe(true);
      expect(result.email).toBeDefined();
      expect(result.email.to).toBe(mockUser.email);
      expect(result.email.subject).toContain('Welcome');

      // Verify email was logged, not sent
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('TEST MODE'));
      
      consoleSpy.mockRestore();
    });

    it('should include user name in email template', async () => {
      const result = await emailService.sendWelcomeEmail(mockUser);

      expect(result.email.html).toContain(mockUser.firstName);
      expect(result.email.html).toContain(mockUser.email);
    });

    it('should have proper email structure', async () => {
      const result = await emailService.sendWelcomeEmail(mockUser);

      expect(result.email.from).toBeDefined();
      expect(result.email.to).toBe(mockUser.email);
      expect(result.email.subject).toBeDefined();
      expect(result.email.html).toBeDefined();
    });

    it('should include MediaCareers branding', async () => {
      const result = await emailService.sendWelcomeEmail(mockUser);

      expect(result.email.html).toContain('MediaCareers.in');
      expect(result.email.subject).toContain('MediaCareers.in');
    });

    it('should include call-to-action', async () => {
      const result = await emailService.sendWelcomeEmail(mockUser);

      expect(result.email.html).toContain('Get Started');
      expect(result.email.html).toContain('dashboard');
    });
  });

  describe('Email template validation', () => {
    it('should not send emails when TEST_MODE is true', async () => {
      // This is critical for the requirement
      expect(config.testMode).toBe(true);
      
      const result = await emailService.sendWelcomeEmail(mockUser);
      expect(result.testMode).toBe(true);
    });
  });
});
