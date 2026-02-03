const axios = require('axios');

describe('DELETE/gamers/:id', () => {
    let response;
    const url = 'http://localhost:3000/gamers';

    beforeAll(async () => {
        response = await axios.delete(`${url}/5`);
    });

    test('Delete request successfully executed', () => {
        expect(response.status).toBe(200 || 404);
    });

    test('Deleted user details not found', ()=>{
        expect(response.status).toBe(404);
    });
});
