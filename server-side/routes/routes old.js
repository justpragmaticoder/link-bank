const express = require('express');
const router = express.Router();
const path = require('path');
const knex = require('./../db/knex_db_connection.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(express.static(path.join(path.join(__dirname, '/../../client-side'))));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client-side', 'index.html'));
});

router.post('/create-table', jsonParser, (req, res) => {
    knex('linkTables').insert(req.body).then(getTablesData(res));
});

router.post('/create-url', jsonParser, (req, res) => {
    knex('links').insert(req.body).then(getTablesData(res));
});

router.get('/retrieve', (req, res) => {
    getTablesData(res);
});

router.post('/update-table', jsonParser, (req, res) => {
    let newData = req.body;
    let tableID = newData.id;
    delete newData["id"];
    knex('linkTables').where('id', tableID).update(newData).then(getTablesData(res));
});

router.post('/update-url', jsonParser, (req, res) => {
    let newData = req.body;
    let linkID = newData.linkID;
    delete newData["id"];
    knex('links').where('linkID', linkID).update(newData).then(getTablesData(res));
});

router.post('/delete-table', jsonParser, (req, res) => {
    let tableID = req.body.id;
    knex('linkTables').where('id', tableID).del().then();
    knex('links').where('tableID', tableID).del().then(getTablesData(res));
});

router.post('/delete-url', jsonParser, (req, res) => {
    let linkID = req.body.linkID;
    knex('links').where('linkID', linkID).del().then(getTablesData(res));
});

function getTablesData(res) {
    knex.select().from('linkTables').leftJoin('links', 'links.tableID', 'linkTables.id')
        .then((data) => {
            res.send(data);
        });
}

module.exports = router;