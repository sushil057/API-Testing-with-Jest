const axios =require('axios');
require('dotenv').config();

describe('Shop', ()=>{

    test('Get shop categories of the application', async()=>{
        const applicationId = process.env.application_id;
        const response = await axios.get(`https://dev-api.yarsaplay.com/api/v1/${applicationId}/shop-category`)

        expect(response.status).toBe(200);
        expect(response.data[0]).toBeDefined();
        expect(response.data[0]).toHaveProperty('id');
        expect(response.data[0]).toHaveProperty('name');
        expect(response.data[0]).toHaveProperty('image');
        expect(response.data[0]).toHaveProperty('meta');
        expect(response.data[0]).toHaveProperty('from');
        expect(response.data[0]).toHaveProperty('to');
        expect(response.data[0]).toHaveProperty('description');
    });

    test('Purchase shop items')
})