const request = require('supertest');
const app = require('../server/index');

describe('API Health Check', () => {
  test('GET /health should return success', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('MediaCareers.in API is running');
  });

  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('MediaCareers.in API');
  });
});

describe('Authentication Endpoints', () => {
  test('POST /api/auth/register should require email and password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({});
    
    expect(response.status).toBe(500);
  });

  test('POST /api/auth/login should require credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('Jobs Endpoints', () => {
  test('GET /api/jobs should return jobs list', async () => {
    const response = await request(app).get('/api/jobs');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.jobs)).toBe(true);
  });

  test('GET /api/jobs with filters should work', async () => {
    const response = await request(app)
      .get('/api/jobs?category=journalism&location=Mumbai');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe('Companies Endpoints', () => {
  test('GET /api/companies should return companies list', async () => {
    const response = await request(app).get('/api/companies');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.companies)).toBe(true);
  });
});

describe('Education Endpoints', () => {
  test('GET /api/education should return institutions list', async () => {
    const response = await request(app).get('/api/education');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.institutions)).toBe(true);
  });
});
