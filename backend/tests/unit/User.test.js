const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');

// Mock mongoose
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue({}),
    disconnect: jest.fn().mockResolvedValue({})
  };
});

describe('User Model', () => {
  const validUserData = {
    email: 'test@example.com',
    password: 'Test1234',
    firstName: 'John',
    lastName: 'Doe'
  };

  describe('User Schema Validation', () => {
    it('should have correct schema structure', () => {
      const user = new User(validUserData);

      expect(user.email).toBe(validUserData.email);
      expect(user.firstName).toBe(validUserData.firstName);
      expect(user.lastName).toBe(validUserData.lastName);
      expect(user.isEmailVerified).toBe(false);
      expect(user.role).toBe('user');
    });

    it('should have required fields defined', () => {
      const schema = User.schema.obj;

      expect(schema.email.required).toBeTruthy();
      expect(schema.password.required).toBeTruthy();
      expect(schema.firstName.required).toBeTruthy();
      expect(schema.lastName.required).toBeTruthy();
    });

    it('should have email validation', () => {
      const schema = User.schema.obj;
      
      expect(schema.email.unique).toBe(true);
      expect(schema.email.lowercase).toBe(true);
      expect(schema.email.match).toBeDefined();
    });

    it('should have password constraints', () => {
      const schema = User.schema.obj;
      
      expect(schema.password.minlength).toEqual([8, 'Password must be at least 8 characters long']);
      expect(schema.password.select).toBe(false);
    });
  });

  describe('Password Hashing', () => {
    it('should have comparePassword method', async () => {
      const user = new User(validUserData);
      expect(typeof user.comparePassword).toBe('function');
    });

    it('comparePassword should work correctly', async () => {
      const hashedPassword = await bcrypt.hash('Test1234', 10);
      const user = new User({ ...validUserData, password: hashedPassword });

      const isMatch = await user.comparePassword('Test1234');
      expect(isMatch).toBe(true);

      const isNotMatch = await user.comparePassword('WrongPassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('Public Profile Method', () => {
    it('should return public profile without password', () => {
      const user = new User(validUserData);
      user._id = 'test-id-123';

      const profile = user.toPublicProfile();

      expect(profile).toHaveProperty('id');
      expect(profile).toHaveProperty('email', validUserData.email);
      expect(profile).toHaveProperty('firstName', validUserData.firstName);
      expect(profile).toHaveProperty('lastName', validUserData.lastName);
      expect(profile).toHaveProperty('isEmailVerified', false);
      expect(profile).toHaveProperty('role', 'user');
      expect(profile).not.toHaveProperty('password');
    });
  });

  describe('Schema Defaults', () => {
    it('should set default values correctly', () => {
      const user = new User({
        email: 'test@example.com',
        password: 'Test1234',
        firstName: 'John',
        lastName: 'Doe'
      });

      expect(user.isEmailVerified).toBe(false);
      expect(user.role).toBe('user');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should allow setting role to admin', () => {
      const user = new User({
        ...validUserData,
        role: 'admin'
      });

      expect(user.role).toBe('admin');
    });
  });
});
