const axios = require('axios');
require('dotenv').config();

describe('Gamer Friendship', () => {
    const token = process.env.access_token
    let id = process.env.player_id

    test.only('Get gamer profile', async () => {
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/profile',
            {
                // use token of the player who send the friend requests
                headers: {
                    Authorization: `Bearer ${token}`}
            },

        );
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('avatar');
        expect(response.data).toHaveProperty('displayName');
        expect(response.data).toHaveProperty('preferences');
        expect(response.data).toHaveProperty('socials');
        console.log('Response Data: \n', response.data);

    });

    test('Block a User', async () => {

        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/block`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        expect(response.data.message).toBe('User has been blocked')
    });

    test('Unblock a user', async () => {
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        expect(response.data.message).toBe('User has been unblocked')
    });

    // Negative Unblock test, using expect().rejects method
    test('Unblocking an already unblocked user returns 404', async () => {
        await expect(
            axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).rejects.toMatchObject({ response: { status: 404 } });
    });

    // using try catch method to execute the negative test
    test('Attempt to unblock unblocked user returns 404', async () => {
        try {
            await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fail('Request should have failed')
        }
        catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toHaveProperty('message');
            expect(error.response.data).toHaveProperty('timestamp');
        }
    });

});

describe('Friendship', () => {
    const token = process.env.access_token
    // let id = process.env.player_id

    test('Get Friend List', async () => {
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/friendship', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                'status': 'Accepted',
                'isFriendshipInitiator': 'true'
                
            }
        })
        expect(response.status).toBe(200);
        expect(response.data[0]).toHaveProperty('id')
        expect(response.data[0]).toHaveProperty('status')
        expect(response.data[0]).toHaveProperty('user')
        expect(response.data[0].user).toHaveProperty('id')
        expect(response.data[0].user).toHaveProperty('displayName')
        expect(response.data[0].user).toHaveProperty('avatar')
        console.log(response.data);
    });

    test('Send Friend Request', async () => {
        // use id from the response
        payload = { 'id': '5003e8e6-17d9-4caa-aea5-3b8c1513ca16' }
        const response = await axios.post('https://dev-api.yarsaplay.com/api/v1/friendship', payload, {
            // use token of the player who send the friend request
            headers: { Authorization: `Bearer ${token}` }
        },

        )
        expect(response.status).toBe(201);

    });
    test('Accept Friend Request', async () => {
        // use id from the response 
        const id = '5a128014-0fe2-4814-8e61-e5cf15de581c'
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}/accept`, {}, {
            // use the token of the player who receives the friend request
            headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMDNlOGU2LTE3ZDktNGNhYS1hZWE1LTNiOGMxNTEzY2ExNiIsImFwcGxpY2F0aW9uSWQiOiJiZjg0NDU4Mi01MGMxLTQzOGMtOTVmOC1kMWQwYjkxOTc3OGUiLCJhdmF0YXIiOiJhdmF0YXIxIiwiZGlzcGxheU5hbWUiOiJndWVzdC1hOTRlOTZiN2VlMjg2YWZhODkzOCIsInRva2VuSWQiOiI1NDBiM2IxYy1mZTE3LTQ4YTctOGE0Ny00NTBhYmNlNTg0ZjEiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzcwNjA5ODA5LCJleHAiOjE3NzA2OTYyMDksImlzcyI6Imh0dHBzOi8vZGFzaGJvYXJkLnBsYXkueWFyc2EuZ2FtZXMifQ.lcKrH4t_lFymRJIvA_7nbmQilEjn-KbCzrclwc3K-0eEGMvysITMHnC1DAhYyzZ8XCAPVF4jiz9RO8DL3-9iSvp9PdiZYk92v939h2vMV-pG9ZfEDLOz37QhGdbS-NvnKOmGe8qLLpga2ylAAhGyI7nfIsnxM6lF7CeHdZCm8O7-5TQYLHpun4n979xF9VUR7oHjv9GHTYogGqdL_yklL6-t6zlAebxPCJpXg_JHnQx0q7aXpzwwzeunJwcY9EVyyvCLZMejL1cWoLiIMeysgAOOVpOyt0SZ9-USkds0bRDDvEzg9J7gVXVmrGe7_rwgo2vaE8aD4R23m0O0K2BM9A` }
        }
        )
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message')
    });


    test('Delete Friend Request', async () => {
        // use the id from the response
        const id = '5a128014-0fe2-4814-8e61-e5cf15de581c'
        const response = await axios.delete(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}`, {
            // use token of any player either sender or receiver
            headers: { Authorization: `Bearer ${token}` }
        },
        )
        expect(response.status).toBe(200);

    });
})