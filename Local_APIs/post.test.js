const axios = require('axios');

describe('POST Request', () => {
  let response;        
  let responseTime;   

  const payload = {
    name: "Sanam",
    gamesPlayed: 220,
    gamesWon: 57,
    premiumUser: true,
    winPercentage: 25
  };

  beforeAll(async () => {
    const startTime = Date.now();

    response = await axios.post(
      'http://localhost:3000/gamers',
      payload
    );

    responseTime = Date.now() - startTime;
  });

  test('The response code is 201', () => {
    expect(response.status).toBe(201);
  });

  test('Response time is under 500ms', () => {
    expect(responseTime).toBeLessThan(500);
  });

  test('Response body contains created gamer', () => {
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(payload.name);
    expect(response.data.premiumUser).toBe(true);
  });
});
