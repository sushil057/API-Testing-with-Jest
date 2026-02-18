const axios = require('axios');

describe('PATCH /gamers/:id', () => {
    let response;
    const url = 'http://localhost:3000/gamers';

    beforeAll(async () => {
        const payload = { gamesWon: 130 }; // only updating one field
        response = await axios.patch(`${url}/3`, payload);
    });

    test('PATCH request successfully updates the field', () => {
        expect(response.status).toBe(200);
        expect(response.data.gamesWon).toBe(130);
    });

    test('Other fields remain unchanged', () => {
        expect(response.data.name).toBe('Riya');
        expect(response.data.gamesPlayed).toBe(95);
        expect(response.data.premiumUser).toBe(false);
    });
});
