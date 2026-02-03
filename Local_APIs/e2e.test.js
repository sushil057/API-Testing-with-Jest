const axios = require('axios');

describe('Gamers API flow', () => {
  const baseUrl = 'http://localhost:3000/gamers';
  let gamerId; // shared variable

  test('POST - create gamer', async () => {
    const payload = {
      name: 'Sushil',
      gamesPlayed: 10,
      gamesWon: 6
    };

    const res = await axios.post(baseUrl, payload);
    expect(res.status).toBe(201);

    gamerId = res.data.id; // store ID
    console.log('Created ID:', gamerId);
  });

  test('PUT - update gamer', async () => {
    const payload = {
      name: 'Sushil Updated',
      gamesPlayed: 20,
      gamesWon: 12
    };

    const res = await axios.put(`${baseUrl}/${gamerId}`, payload);
    expect(res.status).toBe(200);
  });

  test('PATCH - partial update', async () => {
    const payload = { gamesWon: 15 };

    const res = await axios.patch(`${baseUrl}/${gamerId}`, payload);
    expect(res.status).toBe(200);
    expect(res.data.gamesWon).toBe(15);
  });

  test('DELETE - remove gamer', async () => {
    const res = await axios.delete(`${baseUrl}/${gamerId}`);
    expect(res.status).toBe(200);
  });
});
