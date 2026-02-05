const axios = require('axios');
require ('dotenv').config();

describe('Statistics', ()=>{
    // const token = process.env.access_token
    const applicationId = process.env.application_id

    test('Get stats configired for the application', async()=>{
        const response = await axios.get(`https://dev-api.yarsaplay.com/api/v1/${applicationId}/stats`, {
        })
        expect(response.status).toBe(200);
        console.log(response.data)
    });
});