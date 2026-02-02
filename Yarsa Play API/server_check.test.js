const axios = require('axios');

describe('Server Check', () => {
  test('API is up and returns welcome message', async () => {
    const response = await axios.get('https://dev-api.yarsaplay.com/api');

    expect(response.status).toBe(200);
    expect(response.data).toContain('Welcome to Yarsa Play API!');
  });
});
