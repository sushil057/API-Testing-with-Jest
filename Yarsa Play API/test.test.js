const axios = require('axios')
describe('Sample Test', () => {
    test('Updating Gamer Profile', async () => {
        const payload = {
            "displayName": "Yarsa Play",
            "avatar": "Bengol Tiger",
        }
        const response = await axios.patch('https://dev-api.yarsaplay.com/api/v1/profile', payload, {
            headers: { Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZWMzYjE4LTkyMTUtNDA5MS05ZDhhLWNlOTRjMmNkMzU0OSIsImFwcGxpY2F0aW9uSWQiOiJiZjg0NDU4Mi01MGMxLTQzOGMtOTVmOC1kMWQwYjkxOTc3OGUiLCJhdmF0YXIiOiJ1cGRhdGVkIGF2YXRhcjEiLCJkaXNwbGF5TmFtZSI6IlVwZGF0ZWQgcGxheWVyIiwidG9rZW5JZCI6IjFmMDVmODI4LWVjZTQtNGQ5YS1iM2JkLTExZGI5Y2UzZDY2MCIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NzAzNTYwNjYsImV4cCI6MTc3MDQ0MjQ2NiwiaXNzIjoiaHR0cHM6Ly9kYXNoYm9hcmQucGxheS55YXJzYS5nYW1lcyJ9.Pt9CZ3O0iQoj-JDiL7mwjnjRlaNBoWd8nYdjcdO8pL616TScrxuN1qDfmKY6kPbwFf0JgtGceIJ9kKTb5btteu8PBubz-6rAtMuiqj9Luojnt3FGyqmVpNfZCbdRtwHdwlevJoyk35_rsRO5Deq9rJlbZkvimFS1ZTywa3eqrjnx9JRS1mo5ndqM0ytp9Y6-_xeMRetJZksBGx6YrKttX9e1YKeyzIB8zRoVYDGqRQSeg1hI0lW5EBNukydruACjHOPPvbYahXcaH9aQ6-SVXyVw5Y8hW8Q9gS6Je1Tka0FESdcXUm1iCQYO0ETBZ7k5_EfRqFrlplqUvQ1pDW1kPA' }
        });

        expect(response.status).toBe(200);
        console.log(response.data);

    });
    test('Accept Friend Request', async () => {
        // Use the id provided in the top of the response data of Get Friendship request.
        const id = '38ca4086-71d1-49b3-b240-bdd796e13c7f'
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v1/friendship/${id}/accept`, {}, {
            headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkY2I0ZmJhLTMyZDMtNGQ2Mi05YmY0LTI1ODI5MmVjYzM2NiIsImFwcGxpY2F0aW9uSWQiOiJiZjg0NDU4Mi01MGMxLTQzOGMtOTVmOC1kMWQwYjkxOTc3OGUiLCJhdmF0YXIiOiJhdmF0YXIxIiwiZGlzcGxheU5hbWUiOiJndWVzdC0yOWZjM2IzZjIxNDRlNGZlYzc1MCIsInRva2VuSWQiOiJmMTFmNTdjNC00ZjBmLTRmYmQtYjNhYS01OGJiNGYzYzBjZWMiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzcwNjA5OTc2LCJleHAiOjE3NzA2OTYzNzYsImlzcyI6Imh0dHBzOi8vZGFzaGJvYXJkLnBsYXkueWFyc2EuZ2FtZXMifQ.PmXWuE_0ESql30qRkb5txAXb1RrEYvaNxy1ueA8Lktnt8XtTfZyAcSS-kYUWnAFiZWEsYeSTlrivSZ1rm3tE5uwD25BZ_ELYNb1-iPz1btaUB3AnKABjvsYu-4FCkXlm0rk7vSfyfznTgaIYt-GzMFhuJJDWX9VOq-wfxxEsjvB2elQSXDFN-ZY8VUxGUaDwjP_8BDMZdZEl2JYjgKzBnVFYYvCV53mcYjYEFbArzSgPbJtuFzAlopSlei4YgOaGplSPJrZnS-ig041qG89lFmxQt9IIkX-hJjPUvez2P-XocnzpE4iRx6BG32i3Eb8q9DmW7osAGew8TOYEU2swMQ` }
        }
        )
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
        console.log(response.data);
    });

    test.only('Increase/Decrease Stats for certain gamers', async () => {
        const payload = {
            "stats": [
                {
                    "statId": "4ab85719-ae8c-4edc-b3dd-8bf7582ca96a",
                    "gamers": [
                        {
                            "gamerId": "a692810a-2dde-4c8e-a9f4-ae052b7413a5",
                            "value": 100
                        }
                    ]
                }
            ]
        }
        const response = await axios.post('https://dev-api.yarsaplay.com/api/v1/server/stats', payload)
        expect(response.status).toBe(200);
        console.log(error.response)
        })
})