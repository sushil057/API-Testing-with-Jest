const axios = require('axios');
require ('dotenv').config();

describe('Gamer Profile', ()=>{
    const token = process.env.access_token3
    // Create access token using refresh token
    // beforeAll( async()=>{

    //     payload ={
    //         'refreshToken': process.env.refresh_token,
    //         // 'refreshToken': token
    //     }
    //     const response = await axios.post('https://dev-api.yarsaplay.com/api/v1/auth/access-token', payload)
    //     token = response.data.accessToken
    //     // expect(token).toBeDefined();
    //     console.log('Refresh Token Created: ', response.data.accessToken)
    // });


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

    test('Updated Gamer Profile', async()=>{
        payload = {
            "displayName": "Ragav Tiwari",
            "avatar": "White horse"
        }
        const response = await axios.patch('https://dev-api.yarsaplay.com/api/v1/profile',payload, {
                headers: {
                    // Player with access token 1 is Sushil Tiwari
                    // Authorization: `Bearer ${process.env.access_token1}`
                    // Player with access token 2 is RAgav Tiwari
                    Authorization: `Bearer ${token}`
                },
                
        });
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('avatar');
        expect(response.data).toHaveProperty('displayName');
        expect(response.data).toHaveProperty('preferences');
        expect(response.data).toHaveProperty('socials');
        console.log('Response: ', response.data);
    });

    //  test('Update Gamer Preferences', async()=>{
    //     payload ={
    //         'body': null
    //     }
    //     const response = await axios.patch('https://dev-api.yarsaplay.com/api/v1/profile/preference', payload, {
    //         headers: {
    //             Authorization:`Bearer ${token}`
    //         }
    //     });
    //     console.log(response.data);
    // });

    test.skip('Delete Gamer Profile', async()=>{
        const response = await axios.delete('https://dev-api.yarsaplay.com/api/v1/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.status).toBe(200);
        expect(response.data.message).toBe('User deleted. This might take a while to complete')
        console.log(response.data.message);
    });

   
});