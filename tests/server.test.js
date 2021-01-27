const app = require('../server.js');
const request = require('supertest');
const db = require('../db.js');
const order= require('../orders.js');
const { response, query } = require('express');
//const { query } = require('express');
const ApiKey = require('../apikey.js');
const apikey = require('../apikey');
describe("Hello world tests", () => {


    it("Should do an stupid test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });

});


describe("Orders API", () => {
    describe("GET /", () => {

        const user = {
            user: "test",
            apikey: "49ac"
        };
   
        auth = jest.spyOn(ApiKey, "findOne");
        auth.mockImplementation((query, callback) => {
            callback(null, new ApiKey(user));
        });

        it("Should return an HTML document", () => {
            return request(app).get("/")
            .set('apikey', '49ac')
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /orders", () => {
        
        beforeAll(() => {
            const or = [
             new order    ( {"Name": "hanna",
                    "DNI": "QQQQQQ",
                    "email":"ah@gmail.com",
                    "total": 1,
                    "status": "DELIVERED",
                    
                    "cartItems": [
                        {
                            
                            "title": "FEEE",
                            "price": 1,
                            "count": 1
                        }
                    ]
                })
            ];

            const user = {
                user: "test",
                apikey: "49ac"
            }

            dbFind = jest.spyOn(order, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, or);
            });

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            })
        });
        it('Should return all orders', () => {
            return request(app).get('/api/v1/orders')
            .set('apikey', '49ac')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(1);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });
    describe('POST /orders', () => {
        const or = {Name: "lala",
        DNI: "QnQ6QQ",
        email:"ahqhh@gmail.com",
        total: 16,
        status: "DELIVERED",
        
        cartItems: [
            {
                
                title: "rrrrr",
                price: 3,
                count: 3
            }
        ]
    };
        let dbInsert;

        beforeEach(() => {
            dbInsert = jest.spyOn(order, "create");
        });
        const user = {
            user: "test",
            apikey: "49ac"
        };

        auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            });
        it('Should add a new order if everything is fine', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post('/api/v1/orders')
            .set('apikey', '49ac')
            .send(or).then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(or, expect.any(Function));
            });
        });

        it('Should return 500 if there is a problem with the DB', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post('/api/v1/orders')
            .set('apikey', '49ac')
            .send(or).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });







    describe('PUT /order', () => {
        let dbUpdate;

        const or = {cod: "A65321782",
        name: "hola 3",
        DNI: "12345t",
        address: "Malaga",
        email: "or3@gmail.com",
        total: 13,
        };


        
        const user = {
            user: "test",
            apikey: "49ac"
        };

        auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            });
        beforeEach(() => {
        dbUpdate = jest.spyOn(order, "updateOne");
        });

        it('Should update a  order', () => {
            dbUpdate.mockImplementation((query,a,callback) =>{
                callback(false);
            });

            return request(app).put("/api/v1/order/info/A65321782")
            .set('apikey', '49ac')
            .send(or)
            .then((response) =>{
                expect(response.statusCode).toBe(200);
                expect(or.name).toEqual("hola 3");
                //expect(response.text).toEqual(expect.stringContaining("order Updated"));
            });
        });

        it('Should return an error in DB', () => {
            dbUpdate.mockImplementation((query,c,d, callback) => {
                callback(true);
            });

            return request(app).put("/api/v1/order/info/A65321782")
            .set('apikey', '49ac')
            .send(or)
            .then((response) => {
                expect(response.statusCode).toBe(500);
            });

        });

        
    });



    describe('DELETE /orders', () => {
        
        beforeEach(() => {
        dbRemove = jest.spyOn(order, "deleteMany");
        });

        const user = {
            user: "test",
            apikey: "49ac"
        }

        auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            })

        it('Should delete all order', () => {
            dbRemove.mockImplementation((query, c, callback) =>{
                callback(false);
            });

            return request(app).delete('/api/v1/orders')
            .set('apikey', '49ac')
            .then((response) =>{
                expect(response.statusCode).toBe(204);
                expect(response.body).toBeNaN();
                expect(dbRemove).toBeCalledWith({}, {multi: true}, expect.any(Function));
            });
        });

        it('Shoul return an error in DB',() => {
            dbRemove.mockImplementation((query, c, callback) => {
                callback(true);
            });
            return request(app).delete('/api/v1/orders')
            .set('apikey', '49ac')
            .then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });
});  
