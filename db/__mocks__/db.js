const connect = async () => {
    console.log('Mocked Connection');
};

const saveUser = async () => {
    console.log('Mocked User Found');
    return Promise.resolve({
        firstName: 'Keri',
        lastName: 'Russin',
        address: '123 51st St N',
        city: 'Saint Petersburg',
        state: 'Florida',
        zip: '54321',
        email: 'karussin@testemail.com',
        password: 'kar1234',
    });
};

const findUser = async () => {
    console.log('Mocked User Saved');
    return Promise.resolve({
        firstName: 'Keri',
        lastName: 'Russin',
    });
};

const disconnect = async () => {
    console.log('Mocked Disconnected');
};

module.exports = { connect, findUser, saveUser, disconnect };