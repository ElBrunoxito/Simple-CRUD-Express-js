
const request = require('supertest')
const app = require('../app/index')

let token;


describe('GET api/auth/login', ()=>{

  test("shoud return a token valid", async () => {
    const response = await request(app)
    .post('/api/auth/login')
    .send({ username: 'brunox', password: '123456'});

    expect(response.statusCode).toBe(200)
    //console.log('Response body:', response.body); 

    expect(response.body.body.token).toBeDefined();
    token = response.body.body.token;
    expect(token).toBeDefined(); 

  });









})


/*
describe('API Endpoints', ()=>{

  beforeAll(async () => {
    const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ username: 'brunox', password: '123456'});

    token = loginResponse.body.token;

  });


    it('GET /api/files/getAll - deberia devolver todos los archivos', async()=>{
        const response = await request(app)
        .get('/api/files/getAll')
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200)
//        expect(response.body).toEqual([{ id: 1, name: 'Item 1'}])
        expect(Array.isArray(response.body)).toBe(true)
        
        
    })

})*/
