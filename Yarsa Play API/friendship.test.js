const axios = require('axios');
require('dotenv').config();

describe('Gamer Friendship', ()=>{
    const token = process.env.access_token
    let id = process.env.player_id

    test('Get gamer profile', async()=>{
            const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/profile',
                {
                    headers: {Authorization: `Bearer ${token}`}
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

    test.only('Block a User', async()=>{

        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/block`, {}, {
            headers:{Authorization: `Bearer ${token}`}
        })
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        expect(response.data.message).toBe('User has been blocked')
    });

    test('Unblock a user', async()=>{
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {},{
            headers:{Authorization: `Bearer ${token}`}
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        expect(response.data.message).toBe('User has been unblocked')
    });

    // Negative Unblock test, using expect().rejects method
    test('Unblocking an already unblocked user returns 404', async()=>{
       await expect(
        axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {}, {
            headers:{Authorization: `Bearer ${token}`}
        })
       ).rejects.toMatchObject({response:{status:404}});
    });

    // using try catch method to execute the negative test
    test('Attempt to unblock unblocked user returns 404', async()=>{
        try{
            await axios.patch(`https://dev-api.yarsaplay.com/api/v1/user/${id}/unblock`, {} ,{
                headers:{Authorization: `Bearer ${token}`}
            })
            fail('Request should have failed')
        }
        catch(error){
            expect(error.response.status).toBe(404);
            expect(error.response.data).toHaveProperty('message');
            expect(error.response.data).toHaveProperty('timestamp');
        }
    });
    
});

describe('Friendship', ()=>{
    const token = process.env.access_token
    // let id = process.env.player_id

    test('Get Friend List', async()=>{
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/friendship',{
            headers:{Authorization: `Bearer ${token}`},
            params: {
                'status': 'Pending',
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

    test('Send Friend Request', async()=>{
        payload ={'id': '0a841dba-0f17-400d-8d67-2f7b34cef191'}
        const response = await axios.post('https://dev-api.yarsaplay.com/api/v1/friendship', payload, {
            headers: {Authorization: `Bearer ${token}`}},
        )
        expect(response.status).toBe(201);

    });
    test('Accept Friend Request', async()=>{
        const id = 'd9b41e12-c393-4856-9ad0-8a585b76057c'
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}/accept`, {}, {
            headers:{Authorization: `Bearer ${token}`}}
        )
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty(message)
    });


    test('Delete Friend Request', async()=>{
        const id = '0a841dba-0f17-400d-8d67-2f7b34cef191'
        const response = await axios.delete(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}`, {
            headers: {Authorization: `Bearer ${token}`}},
        )
        expect(response.status).toBe(200);

    });
})