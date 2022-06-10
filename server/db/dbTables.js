const client = require('./client');
const {
    createUser,
} = require('./user');

const dropTables = async () => {
    try {
        console.log('Dropping All Tables...');
        // drop all tables, in the correct order
        await client.query(`
        DROP TABLE IF EXISTS users;
      `);
        console.log("Finished dropping tables!");
    } catch (error) {
        console.log(error)
        console.error("Error dropping tables!");
        throw error;
    }
}

const createTables = async () => {
    try {
        console.log("Starting to build tables...");
        // create all tables, in the correct order
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            email varchar(255) UNIQUE NOT NULL,
            password varchar(255) UNIQUE NOT NULL,
            name varchar(255) NOT NULL,
            admin BOOLEAN DEFAULT false
          );
        `);
        console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error;
    }
}

const createInitialUsers = async () => {
    try {
        const usersToCreate = [
            { username: 'Admin', email: 'admin@admin.com', password: 'admin', name: 'Admin', admin: true },
            { username: 'Bobby', email: 'bobby@gmail.com', password: 'password', name: 'Bob Johnson', admin: false },
        ]
        const users = await Promise.all(usersToCreate.map(createUser));
    } catch (error) {
        throw error
    }
}

const rebuildDB = async () => {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();

    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}

module.exports = {
    rebuildDB
};