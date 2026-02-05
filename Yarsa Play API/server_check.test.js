const axios = require('axios');

describe('Server Check', () => {
    test('API Server is up and returns welcome message', async () => {
    const startTime = Date.now();
    const response = await axios.get('https://dev-api.yarsaplay.com/api');
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(response.data).toContain('Welcome to Yarsa Play API!');
    console.log('Welcome Message:', response.data);
    console.log('Response Time: ', responseTime);
  });
  describe('Server Health Check', ()=>{
    test('The server is running well', async ()=>{
        const startTime = Date.now();
    const response = await axios.get('https://dev-api.yarsaplay.com/api/health');
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('ok');
    expect(response.data.info.prisma.status).toBe('up');
    console.log('Server Response:\n', response.data);
    console.log('Response Time: ', responseTime);
    })

  });
});
