const axios = require('axios');
require('dotenv').config();

describe('Inventory', ()=>{
    const token2 = process.env.access_token2;
    const applicationId = process.env.application_id;

    test('Get own list of Inventory items', async()=>{
        const response = await axios.get('https://dev-api.yarsaplay.com/api/v1/inventory', {
            headers:{Authorization: `Bearer ${token2}`}
        });
        expect(response.status).toBe(200);
        expect(response.data[0]).toHaveProperty('id')
        expect(response.data[0]).toHaveProperty('quantity')
        expect(response.data[0]).toHaveProperty('item')
        expect(response.data[0].item).toHaveProperty('id')
        expect(response.data[0].item).toHaveProperty('name')
        expect(response.data[0].item).toHaveProperty('thumbnail')
        expect(response.data[0].item.thumbnail).toHaveProperty('uri')
    });

    test('Get list of aplication Inventory items', async()=>{
        const response = await axios.get(`https://dev-api.yarsaplay.com/api/v1/${applicationId}/inventory`, {
            headers:{Authorization: `Bearer ${token2}`}
        });
        expect(response.status).toBe(200);
        expect(response.data[0]).toHaveProperty('id');
        expect(response.data[0]).toHaveProperty('name');
        expect(response.data[0]).toHaveProperty('description');
        expect(response.data[0]).toHaveProperty('thumbnail');
        expect(response.data[0].thumbnail).toHaveProperty('id');
        expect(response.data[0].thumbnail).toHaveProperty('name');
        expect(response.data[0].thumbnail).toHaveProperty('description');
        expect(response.data[0].thumbnail).toHaveProperty('uri');
        expect(response.data[0].thumbnail).toHaveProperty('type');
        expect(response.data[0]).toHaveProperty('category');
        expect(response.data[0].category).toHaveProperty('id');
        expect(response.data[0].category).toHaveProperty('name');
        expect(response.data[0].category).toHaveProperty('description');
        expect(response.data[0]).toHaveProperty('maxOwnableQuantity');
        expect(response.data[0]).toHaveProperty('meta');
        expect(response.data[0]).toHaveProperty('assets');
        expect(response.data[0].assets[0]).toHaveProperty('id');
        expect(response.data[0].assets[0]).toHaveProperty('name');
        expect(response.data[0].assets[0]).toHaveProperty('description');
        expect(response.data[0].assets[0]).toHaveProperty('uri');
        expect(response.data[0].assets[0]).toHaveProperty('type');
    });

    test('Deduct Item Quantity', async()=>{
        const id = process.env.background_id;
        const payload = {
             "quantity": 1
        }
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v2/inventory/${id}/deduct`, payload, {
            headers:{Authorization: `Bearer ${token2}`}
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('item');
        expect(response.data.item).toHaveProperty('id');
        expect(response.data.item).toHaveProperty('name');
        expect(response.data.item).toHaveProperty('thumbnail');
        expect(response.data.item.thumbnail).toHaveProperty('uri');
        expect(response.data).toHaveProperty('quantity');
        expect(typeof(response.data.quantity)).toBe('number');
        // console.log(response.data);
    });

    test('Increase Item Quantity', async()=>{
        const id = process.env.background_id;
        const payload = {
             "quantity": 4
        }
        const response = await axios.patch(`https://dev-api.yarsaplay.com/api/v2/inventory/${id}/increase`, payload, {
            headers:{Authorization: `Bearer ${token2}`}
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('item');
        expect(response.data.item).toHaveProperty('id');
        expect(response.data.item).toHaveProperty('name');
        expect(response.data.item).toHaveProperty('thumbnail');
        expect(response.data.item.thumbnail).toHaveProperty('uri');
        expect(response.data).toHaveProperty('quantity');
        expect(typeof(response.data.quantity)).toBe('number');
        console.log(response.data);
    })

})