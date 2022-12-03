const express = require('express');
const cors = require('cors');
const app = express();

// const deployLog = require('./scripts/deploy.js');
const getter = require('./scripts/getHash.js');
const controller = require('./scripts/controller.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.post('/store-hash/:privateKey', async (req, res) => {
    const privateKey = req.params.privateKey;
    const data = await controller.createLog(
        privateKey, 
        req.body.srcHash, 
        req.body.resultHash, 
        req.body.srcLink, 
        req.body.dataLink
    );

    res.json({ 
        data 
    });
});

app.get('/hash/:address/:privateKey', async (req, res) => {
    const address = req.params.address;
    const privateKey = req.params.privateKey;

    console.log("address: " + address);
    console.log("privateKey: " + privateKey);
    const data = await controller.getLog(privateKey, address);
    res.json({ data });
});

app.get('/get-all-contracts/:privateKey', async (req, res) => {
    const data = await controller.getAllLogHashes(req.params.privateKey);
    res.json({ data });
});

app.listen(3000, () => {
    console.log('De-Insure app listening on port 3000!');
});

function toJson(data) {
    if (data !== undefined) {
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}#bigint` : v)
            .replace(/"(-?\d+)#bigint"/g, (_, a) => a);
    }
}