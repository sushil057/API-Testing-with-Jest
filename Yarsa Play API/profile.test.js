const axios = require('axios');
require ('dotenv').config();

describe('Gamer Profile', ()=>{
    const token = process.env.access_token
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
            "displayName": "Sushil Tiwari",
            "avatar": "Black horse"
        }
        const response = await axios.patch('https://dev-api.yarsaplay.com/api/v1/profile',payload, {
                headers: {
                    // Authorization: `Bearer ${token}`
                    Authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4YjQyMjhmLWM4NmItNDAyMC05YWQ3LTM3MDc3ZWUwMDgwYSIsImFwcGxpY2F0aW9uSWQiOiJiZjg0NDU4Mi01MGMxLTQzOGMtOTVmOC1kMWQwYjkxOTc3OGUiLCJhdmF0YXIiOiJhdmF0YXIxIiwiZGlzcGxheU5hbWUiOiJndWVzdC1hNDQxZjc3YmVmYjBkOGRjODk1YyIsInRva2VuSWQiOiI4OTIyNzVmNi1jMDU0LTRlYTAtYjc3Yy0wN2RkNjhkZWU4YjUiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzcwNjA5NDQwLCJleHAiOjE3NzA2OTU4NDAsImlzcyI6Imh0dHBzOi8vZGFzaGJvYXJkLnBsYXkueWFyc2EuZ2FtZXMifQ.M2xagWg--bu6RFPz_m8WPsTUOm3TAOkx6qhiY0CGWXM8g90A-sg-IlCQjk-z48ldzJ4jhjZ1Hg83DZ-dRCX9ZG6pl3s9dSRtlYSkJLRtezW3IHEz_oQjAc4Q5lX1hdcebmT-w4MZ67FxJDpJTy_17QPekKpTe81SP2rFVECoHKh_79hYZHRJyL8pfU5uZunvqTsbbGnLJyWYbPVHWYsigbvcMpNyfnb7u1xBIVmRm1-WH1eSvqnoc-NmBOaVV71wNBbVbJc7XvqNFQVjJI0G55ed-myDMJJCr4CHd7PwKW03k2egGU2puN6tH3C4179uGPrh5qz2VJ8IJltRlou_BA'
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