// mongoose
const mongoose = require('mongoose');
// User model
const User = require('../api/model/user');
// db functions
const { connect, findUser, saveUser, disconnect } = require('./db');


jest.mock('./db')

beforeEach(async () => {
    // call connect
    console.log('connecting');
    await connect();
});

describe('', () => {
    test ('save user', async () => {
        // create user
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'Keri',
            lastName: 'Russin',
            address: '123 51st St N',
            city: 'Saint Petersburg',
            state: 'Florida',
            zip: '54321',
            email: 'karussin@testemail.com',
            password: 'kar1234',
        });
        // saveUser pass user
        const user = await saveUser(newUser);
        // expect
        expect(user.firstName).toBe('Keri');
        expect(user.lastName).toBe('Russin');
        expect(user.city).not.toBe('Cleveland');
    });

    test ('find user', async () => {
        // get user findUser({})
        const email = 'karussin@testemail.com'
        const login = await findUser(email);
        //expect
        expect(login.firstName).toBe('Keri');
        expect(login.lastName).toBe('Russin');
        expect(login.zip).not.toBe('12345')
    });
});

afterEach(async () => {
    // call disconnect
    console.log('disconnected');
    await disconnect();
});