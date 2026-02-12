const axios = require('axios');
require('dotenv').config();
jest.setTimeout(30000);

describe('Statistics', () => {
    // const token = process.env.access_token
    const applicationId = process.env.application_id
    const token3 = process.env.access_token3
    const game_win = process.env.game_won_id

    test('Get stats configired for the application', async () => {
        const response = await axios.get(`https://dev-api.yarsaplay.com/api/v1/${applicationId}/stats`, {
        })
        expect(response.status).toBe(200);
        console.log(response.data)
    });

    test("Update logged in gamer stats", async () => {
        const payload = {
            "statsId": process.env.game_won_id,
            "value": 10
        }
        const response = await axios.post('https://dev-api.yarsaplay.com/api/v1/stats', payload, {
            headers: { Authorization: `Bearer ${token3}` }
        });

        expect(response.status).toBe(201);

    });
    test('Get Logged in gamers stats', async () => {
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/stats', {
            headers: { Authorization: `Bearer ${token3}` }
        });

        expect(response.status).toBe(200);
        expect(response.data[0]).toBeInstanceOf(Object);
        expect(response.data[0]).toHaveProperty('id');
        expect(response.data[0]).toHaveProperty('value');
        expect(response.data[0].value).toHaveProperty('total');
        expect(response.data[0].value).toHaveProperty('highest');
        console.log("The type of response is", typeof (response.data))
    });

    test('Get logged in gamers single stats', async () => {
        const id = game_win;
        const response = await axios.get(`https://dev-api.yarsaplay.com/api/v1/stats/${id}`, {
            headers: { Authorization: `Bearer ${token3}` }
        });

        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Object);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('value');
        expect(response.data.value).toHaveProperty('total');
        expect(response.data.value).toHaveProperty('highest');
    });

    //Negative test for server PAI that fails with relevant status code and message
    test('Increment Decrement of stats fro certain gamers', async () => {
        const payload = {
            "stats": [
                {
                    "statId": process.env.rank_id,
                    "gamers": [
                        {
                            "gamerId": process.env.player_id3,
                            "value": 3
                        }
                    ]
                }
            ]
        }
        try{
            await axios.post('https://dev-api.yarsaplay.com/api/v1/server/stats', payload, {
                headers: {Authorization: `Bearer ${token3}`}
            }
            )
        }catch(error){
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty('message');
            expect(error.response.data.message).toBe('Unauthorized');
        }
    })

    test("Update loggged in gamer's single stat", async () => {
        const payload = {
            "stats": [
                {
                    "id": process.env.level_id,
                    "value": 9
                }
            ]
        }
        const response = await axios.post('https://dev-api.yarsaplay.com/api/v2/stats', payload, {
            headers: { Authorization: `Bearer ${token3}` }
        });
        expect(response.status).toBe(201);
        expect(response.data[0]).toHaveProperty('id');
        expect(response.data[0]).toHaveProperty('value');
        expect(response.data[0].value).toHaveProperty('total');
        expect(response.data[0].value).toHaveProperty('highest');
    })
});