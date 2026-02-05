const axios = require('axios');
require('dotenv').config();

describe('Gamer Login', ()=>{
    let response;
    let response1;
    let responseTime;
    let responseTime1;
    let accessToken;
    let refreshToken;

    test('The gamer login has been successful', async()=>{
        const payload = {
            'token': 'hello world'
        }
        const startTime = Date.now();
        response = await axios.post('https://dev-api.yarsaplay.com/api/v1/auth/login', payload, {
            headers:{
                // 'applicationid': 'bf844582-50c1-438c-95f8-d1d0b919778e',
                'applicationid': process.env.application_id,
                'Content-Type': 'application/json'
            },
            params:{
                // 'provider': 'Device'
                'provider': process.env.provider
            }
        });
        const endTime = Date.now();
        responseTime = endTime - startTime;
        // console.log('Response: ', response.data);
        expect(response.status === 200 || response.status === 201).toBe(true);
        expect(response.data.accessToken).toHaveProperty('token');
        expect(response.data.accessToken).toHaveProperty('type');
        expect(response.data.accessToken).toHaveProperty('expires');
        // console.log('Access Token: ', response.data.accessToken.token);
        // process.env.access_token = response.data.accessToken.token;
        // accessToken = response.data.accessToken.token;
        // refreshToken = response.data.refreshToken.token;

        // process.env.ACCESS_TOKEN = accessToken;
        // process.env.REFRESH_TOKEN = refreshToken;

        expect(response.data.refreshToken).toHaveProperty('token');
        expect(response.data.refreshToken).toHaveProperty('type');
        expect(response.data.refreshToken).toHaveProperty('expires');
        console.log('Refresh Token:', response.data.refreshToken.token);
        refreshToken = response.data.refreshToken.token;
        process.env.refreshToken = refreshToken;

        // console.log('Refresh Token: ', refToken);
        console.log('Response Time', responseTime, 'ms');
    });

    test('Access Token created successfully', async()=>{
        payload = {
            'refreshToken': process.env.refreshToken

        }
        const startTime = Date.now();
        response1 = await axios.post('https://dev-api.yarsaplay.com/api/v1/auth/access-token', payload);
        const endTime = Date.now();
        responseTime1 = endTime - startTime;
        expect(response1.status).toBe(201);
        expect(response1.data.accessToken).toBeTruthy();
        console.log('Access Token:', response1.data.accessToken);
    });

});