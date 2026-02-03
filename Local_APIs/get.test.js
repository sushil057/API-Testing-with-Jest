const axios = require('axios');

describe('GET /gamers API', () => {
    let response;
    let responseTime;

    beforeAll(async () => {
        const startTime = Date.now();
        response = await axios.get('http://localhost:3000/gamers');
        const endTime = Date.now();
        responseTime = endTime - startTime;
    });

    test('Response status code is 200', () => {
        expect(response.status).toBe(200);
    });

    test('Response time is less than 100 ms', () => {
        expect(responseTime).toBeLessThan(100);
    });

    test('Response is valid JSON', () => {
        expect(typeof response.data).toBe('object');
    });

    test('Content-Type header is application/json', () => {
        expect(response.headers['content-type']).toContain('application/json');
    });

    test('First gamer object has required properties', () => {
        expect(response.data[0]).toHaveProperty('id');
        expect(response.data[0]).toHaveProperty('name');
    });

    test('All gamer objects have correct property types', () => {
        response.data.forEach(gamer => {
            expect(gamer).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
                gamesPlayed: expect.any(Number),
                gamesWon: expect.any(Number),
                premiumUser: expect.any(Boolean),
                winPercentage: expect.any(Number),
            });
        });
    });
});
