const app = require('../server.js');
const request = require('supertest');
//const db = require('../db.js');
const Order= require('../orders.js');

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
        it("Should return an HTML document", () => {
            return request(app).get("/").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /orders", () => {

        beforeAll(() => {
            const order = [
             new Order     ( {"Name": "hanna",
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

            dbFind = jest.spyOn(Order, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, order);
            });
        });

        it('Should return all orders', () => {
            return request(app).get('/api/v2/orders').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(1);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });
    describe('POST /orders', () => {
        const order = {Name: "lala",
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
            dbInsert = jest.spyOn(Order, "create");
        });

        it('Should add a new order if everything is fine', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post('/api/v2/orders').send(order).then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(order, expect.any(Function));
            });
        });

        it('Should return 500 if there is a problem with the DB', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post('/api/v2/orders').send(order).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });
});  
