const axios = require('axios');
require('dotenv').config();

describe('gamer friendship', ()=>{
    const token = process.env.access_token

    test('Get gamer profile executed successfully', async()=>{
            const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/profile',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('id');
            expect(response.data).toHaveProperty('avatar');
            expect(response.data).toHaveProperty('displayName');
            expect(response.data).toHaveProperty('preferences');
            expect(response.data).toHaveProperty('socials');
            console.log('Response Data: \n', response.data);
    
    });

    test('Block a User', async()=>{
        const response = await axios.patch('https://dev-api.yarsaplay.com/api/v1/user/{id}/block', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    })
});