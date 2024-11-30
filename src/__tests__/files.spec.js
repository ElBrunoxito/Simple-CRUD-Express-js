const request = require('supertest')
const app = require('../app/index');
const { number } = require('joi');

let token;
let id;


beforeAll(async () => {
    const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ username: 'brunox', password: '123456'});
    token = loginResponse.body.body.token;
    //console.warn("gaTOKEN: " + token)
    
    expect(token).toBeDefined();
});


describe("CRUD Files", ()=>{
    console.warn("gaTOKEN: " + token)
    test("should respond wirht a list ", async ()=>{
        const response = await request(app)
        .get('/api/files/getAll')
        .set('Authorization', `Bearer ${token}`);
        expect(Array.isArray(response.body.body.files)).toBe(true)
      })

    const insert ={
        type: "pdf",
        weight: 1.2,
        quantity: 5
    }
    test("should response with a objetc of file", async()=>{
        const response = await request(app)
        .post('/api/files/addFile')
        .set('Authorization', `Bearer ${token}`)
        .send(insert);

        console.log(response.body);

        const data = response.body.data;

        expect(response.statusCode).toBe(200);
        expect(data.id).toBeDefined();
        id = data.id;
        expect(data.weight).toBe(insert.weight)
        expect(data.type).toBe(insert.type);
        expect(data.quantity).toBe(insert.quantity);
        expect(data.user_id).toBeDefined();
        
    })


    test("should response with a Archivo eliminado correctamente message ", async()=>{
        const response = await request(app)
        .delete(`/api/files/deleteFile/${id}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.body.body).toBe("Archivo eliminado correctamente")
    })


})