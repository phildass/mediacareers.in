const { registerSchema, loginSchema } = require('../../src/utils/validators');

// Mock dependencies to avoid actual DB/server connections
jest.mock('../../src/config/database', () => jest.fn());
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  disconnect: jest.fn().mockResolvedValue({}),
  model: jest.fn(),
  Schema: jest.fn()
}));

describe('Authentication Validation', () => {
  describe('Register Schema Validation', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'Test1234',
      firstName: 'John',
      lastName: 'Doe'
    };

    it('should validate correct user data', () => {
      const { error, value } = registerSchema.validate(validUser);

      expect(error).toBeUndefined();
      expect(value).toEqual(validUser);
    });

    it('should reject invalid email format', () => {
      const { error } = registerSchema.validate({
        ...validUser,
        email: 'invalid-email'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('valid email');
    });

    it('should reject short password', () => {
      const { error } = registerSchema.validate({
        ...validUser,
        password: 'short'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('8 characters');
    });

    it('should reject password without uppercase', () => {
      const { error } = registerSchema.validate({
        ...validUser,
        password: 'test1234'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('uppercase');
    });

    it('should reject password without lowercase', () => {
      const { error } = registerSchema.validate({
        ...validUser,
        password: 'TEST1234'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('lowercase');
    });

    it('should reject password without number', () => {
      const { error } = registerSchema.validate({
        ...validUser,
        password: 'TestTest'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('number');
    });

    it('should reject missing email', () => {
      const { error } = registerSchema.validate({
        password: 'Test1234',
        firstName: 'John',
        lastName: 'Doe'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('Email');
    });

    it('should reject missing firstName', () => {
      const { error } = registerSchema.validate({
        email: 'test@example.com',
        password: 'Test1234',
        lastName: 'Doe'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('First name');
    });

    it('should reject missing lastName', () => {
      const { error } = registerSchema.validate({
        email: 'test@example.com',
        password: 'Test1234',
        firstName: 'John'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('Last name');
    });

    it('should trim firstName and lastName', () => {
      const { error, value } = registerSchema.validate({
        ...validUser,
        firstName: '  John  ',
        lastName: '  Doe  '
      });

      expect(error).toBeUndefined();
      expect(value.firstName).toBe('John');
      expect(value.lastName).toBe('Doe');
    });

    it('should reject firstName exceeding 50 characters', () => {
      const { error } = registerSchema.validate({
        ...validUser,
        firstName: 'a'.repeat(51)
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('50 characters');
    });
  });

  describe('Login Schema Validation', () => {
    it('should validate correct login data', () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Test1234'
      };

      const { error, value } = loginSchema.validate(loginData);

      expect(error).toBeUndefined();
      expect(value).toEqual(loginData);
    });

    it('should reject invalid email format', () => {
      const { error } = loginSchema.validate({
        email: 'invalid-email',
        password: 'Test1234'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('valid email');
    });

    it('should reject missing email', () => {
      const { error } = loginSchema.validate({
        password: 'Test1234'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('Email');
    });

    it('should reject missing password', () => {
      const { error } = loginSchema.validate({
        email: 'test@example.com'
      });

      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('Password');
    });
  });
});
