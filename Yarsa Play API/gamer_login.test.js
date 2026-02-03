const axios = require('axios');

describe('Gamer Login', ()=>{
    let response;
    let response1;
    let responseTime;
    let responseTime1;
    let refToken;

    test('The gamer login has been successful', async()=>{
        const payload = {
            'token': 'hello world'
        }
        const startTime = Date.now();
        response = await axios.post('https://dev-api.yarsaplay.com/api/v1/auth/login', payload, {
            headers:{
                'applicationid': 'bf844582-50c1-438c-95f8-d1d0b919778e',
                'Content-Type': 'application/json'
            },
            params:{
                'provider': 'Device'
            }
        });
        const endTime = Date.now();
        responseTime = endTime - startTime;
        // console.log('Response: ', response.data);
        expect(response.status).toBe(200);
        expect(response.data.accessToken).toHaveProperty('token');
        expect(response.data.accessToken).toHaveProperty('type');
        expect(response.data.accessToken).toHaveProperty('expires');
        console.log('Access Token: ', response.data.accessToken.token);

        expect(response.data.refreshToken).toHaveProperty('token');
        expect(response.data.refreshToken).toHaveProperty('type');
        expect(response.data.refreshToken).toHaveProperty('expires');
        // console.log('Refresh Token: ', response.data.refreshToken.token);
        refToken = response.data.refreshToken.token;
        console.log('Refresh Token: ', refToken);
        
        console.log('Response Time', responseTime, 'ms');
    });

    test('Access Token created successfully', async()=>{
        payload = {
            'refreshToken': refToken,
            // 'refreshToken': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkM2JjZjJmLThhNDItNGYxMi05MjlhLTc0MmE3YTEwN2Q3MiIsImFwcGxpY2F0aW9uSWQiOiJiZjg0NDU4Mi01MGMxLTQzOGMtOTVmOC1kMWQwYjkxOTc3OGUiLCJ0b2tlbklkIjoiNGRlOTdmZDktMmMzMC00ZjY2LTg1MzAtNTA0NTVhYTFhNjYxIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAwOTUyNTUsImV4cCI6NDkyMzY5NTI1NSwiaXNzIjoiaHR0cHM6Ly9kYXNoYm9hcmQucGxheS55YXJzYS5nYW1lcyJ9.MKb3-suiKVFmqKOwjucF4lKlpU4Qgghn7UxuZUHKLKvLmUG1iO6WiLXXc1-bm5yWLfCs_3_LzBIk6yhdi4ZMVdy1-1wGhXCF6lDhm0vS3xsI3samk3pWcTkkbSFTJ3oqQ5HNUQPcb6KbUCYtgSifLODgQ60UMZogVAWXe_17x1gQQLhkXyKXjP0iRJrYpcetbzfRvwDfi1sujy1VqqoyEN-tE7UvF7ETRk3P8vABFcrwFfeRgQoXLLS2SsvqSZnC-ezWtMuTKn5o6fgnpUIswWWHEkQyYarXC2JtkTqG2oYW6HlaWhNYIWWoakifqR5NpQ1dTz3clpmmVmcqobZ1Qg'
        }
        const startTime = Date.now();
        response1 = await axios.post('https://dev-api.yarsaplay.com/api/v1/auth/access-token', payload);
        const endTime = Date.now();
        responseTime1 = endTime - startTime;
        expect(response1.status).toBe(201);
        expect(response1.data.accessToken).toBeTruthy();
        console.log('Access Token: ', response1.data.accessToken);
    });

});