const Order = require('../orders');
const mongoose = require('mongoose');
const dbConnect = require('../db');

describe('Orders DB connection', () => {
    beforeAll(() => {
        return dbConnect();
    })

    beforeEach((done) => {
        Order.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a order in the DB', (done) => {
        const order = new Order({name: "lala",
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
    });
        order.save((err, order) => {
            expect(err).toBeNull();
            Order.find({}, (err, orders) => {
                expect(orders).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})