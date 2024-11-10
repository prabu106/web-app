import express from 'express';
import { MongoClient } from 'mongodb';
import mysql from 'mysql';

const uri = process.env.ME_CONFIG_MONGODB_URL ?? "mongodb://localhost:27017";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const con = mysql.createConnection({
    host: "mysqlDB",
    user: "root",
    password: "mauFJcuf5dhRMQrjj",
    database: 'quotes',
    port: 3306
});

const app = express();

app.get('/', (req, res) => {
    res.send("Home page !!!");
});

app.get('/mongo', async (_, res) => {
    try {
        await client.connect();
        const database = client.db('testDB');
        const users = database.collection('users');
        const userList = await users.find({}).toArray();
        res.send(`MongoDB Database Records....${JSON.stringify(userList)}`);
    } catch (err) {
        res.status(500).send('Error Occured ' + err.message);
    }
});

app.get('/mysql', async (_, res) => {
    try {
        con.connect((err) => {
            if (err) {
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        });

        const sql = "CREATE TABLE IF NOT EXISTS user (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });

        con.query('SELECT * FROM user', (err, rows) => {
            if (err) throw err;

            console.log('Data received from Db:');
            res.send(JSON.stringify(rows));
        });
    } catch (err) {
        res.status(500).send('Error Occured ' + err.message);
    }
});

app.listen(2000, () => {
    console.log('2000 port is running ...');
});