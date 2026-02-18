const axios = require('axios');
require('dotenv').config();

describe('Gamer Friendship', () => {
    const token3 = process.env.access_token3
    let id = process.env.player_id3

    test('Get gamer profile', async () => {
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/profile',
            {
                // use token of the player who send the friend requests
                headers: {
                    Authorization: `Bearer ${token3}`}
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
            headers: { Authorization: `Bearer ${token3}` }
        })
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        expect(response.data.message).toBe('User has been blocked')
    });

    test('Unblock a user', async () => {
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
            headers: { Authorization: `Bearer ${token3}` }
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        expect(response.data.message).toBe('User has been unblocked')
    });

    // Negative Unblock test, using expect().rejects method
    test('Unblocking an already unblocked user returns 404', async () => {
        await expect(
            axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
                headers: { Authorization: `Bearer ${token3}` }
            })
        ).rejects.toMatchObject({ response: { status: 404 } });
    });

    // using try catch method to execute the negative test
    test('Attempt to unblock unblocked user returns 404', async () => {
        try {
            await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
                headers: { Authorization: `Bearer ${token3}` }
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

describe.skip('Friendship', () => {
    const token2 = process.env.access_token2
    // let id = process.env.player_id

    test('Get Friend List', async () => {
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/friendship', {
            headers: { Authorization: `Bearer ${token2}`},
            params: {
                'status': 'Pending',
                'isFriendshipInitiator': 'false'
                
            }
        });
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
        payload = { 'id':  rocess.env.player_id2}
        const response = await axios.post('https://dev-api.yarsaplay.com/api/v1/friendship', payload, {
            // use token of the player who sent the friend request
            headers: { Authorization: `Bearer ${token3}` }
        },
        )
        expect(response.status).toBe(201);

    });
    test('Accept Friend Request', async () => {
        const token1 = process.env.access_token1
        const id = process.env.player_id1
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}/accept`, {}, {
            // use the token of the player who receives the friend request
            headers: { Authorization: `Bearer ${token1}` }
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message')
    });


    test('Delete Friend Request', async () => {
        // use the id from the response
        const id = '5a128014-0fe2-4814-8e61-e5cf15de581c'
        const response = await axios.delete(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}`, {
            // use token of any player either sender or receiver
            headers: { Authorization: `Bearer ${token3}` }
        },
        )
        expect(response.status).toBe(200);

    });
})