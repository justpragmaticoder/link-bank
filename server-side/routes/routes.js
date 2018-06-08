const express = require('express');
const router = express.Router();
const path = require('path');
const knex = require('./../db/knex_db_connection.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const validate = require('./../validate/my_validate.js');

router.use(express.static(path.join(path.join(__dirname, '/../../client-side'))));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client-side', 'index.html'));
});

router.get('/login', jsonParser, (req, res) => {
    let data = req.body;
    let usernameError = validate.isStringValid(data.username,'username',reArray['username']);
    let passwordError = validate.isStringValid(data.password,'password',reArray['password']);
    if (usernameError.status == 'error') {
        res.send(400).send(JSON.stringify(usernameError));
    }
    if (passwordError.status == 'error') {
        res.send(400).send(JSON.stringify(passwordError));
    }
    if (!validate.isEmailValid(data.email)) {
        res.send(400).send(JSON.stringify({'status':'error','error':'Email is not valid'}));
    }

    // status - ok
});

router.post('/create-table', jsonParser, (req, res) => {
    let valParams = validate.isTableParamsValid(req.body);
    if (valParams.length > 0){
        res.status(400).send(JSON.stringify(valParams));
    }
    else{
        knex('linkTables')
        .returning('id')
        .insert(req.body)
        .then((id)=>{
            knex('linkTables')
            .select()
            .where('id', id)
            .then((data)=>{
                res.status(200).send(JSON.stringify({'status':'ok','data':data}));
            })
        });
    }
});

router.post('/create-url', jsonParser, (req, res) => {
    let data = req.body;
    if (validate.regArray['url'].test(data.url)){
        req.body.text = req.body.text || req.body.url;
        knex('links')
        .returning('id')
        .insert(req.body)
        .then((id)=>{
            knex('links')
            .select()
            .where('id', id)
            .then((data)=>{
                res.status(200).send(JSON.stringify({'status':'ok','data':data}));
            });
        });
    }
    else {
        res.status(400).send(JSON.stringify({'status':'error','data':'url is not valid'}));
    }
    
});

router.get('/tables/:userid', (req, res) => {
    let userid = req.params.userid;
    console.log(userid);
    if (validate.isNumberValid(+userid,0)) {
        knex('linkTables')
        .select()
        .where('userid', userid)
        .then((data)=>{
            res.status(200).send(JSON.stringify({'status':'ok','data':data}));
        });
    }
    else {
        res.status(400).send(JSON.stringify({'status':'error','data':'error userid'}));
    }
});
router.get('/links/:id', jsonParser, (req, res)=>{
    let id = req.params.id;
    if (validate.isNumberValid(+id,0)) {
        knex('links')
        .select()
        .where('tableId', id)
        .then((data)=>{
            res.status(200).send(JSON.stringify({'status':'ok','data':data}));
        });
    }
    else {
        res.status(400).send(JSON.stringify({'status':'error','data':'error table number'}));
    }
});

router.put('/update-table/:id', jsonParser, (req, res) => {
    let tableID = req.params.id;
    if (validate.isNumberValid(+tableID, 0)){
        let valParams = validate.isTableParamsValid(req.query);
        if (valParams.length > 0){
            res.status(400).send(valParams);
        }
        else {
            knex('linkTables')
            .where('id', tableID)
            .update(JSON.parse(req.query))
            .then(()=>{
                knex('linkTables')
                .select()
                .where('id', tableID)
                .then((data)=>{
                    res.status(200).send(JSON.stringify({'status':'ok','data':data}));
                });
            });
        }
    }
    else {
        res.status(400).send(JSON.stringify({'status':'error','text':'url id is not valid'}));
    }
});

router.put('/update-url/:id', jsonParser, (req, res) => {
    let urlId = req.params.id;
    if (validate.isNumberValid(+urlId,0)){
        let valParams = validate.isTableParamsValid(req.query);
        if (valParams.length > 0){
            res.status(400).send(valParams);
        }
        else {
            knex('links')
            .where('linkID', linkID)
            .update(req.query)
            .then(()=>{
                knex('links')
                .select()
                .where('linkID', linkID)
                .then((data)=>{
                    res.status(200).send(JSON.stringify({'status':'ok','data':data}));
                })
            });
        }
    }
    
});

router.delete('/delete-table/:id', jsonParser, (req, res) => {
    let tableID = req.body.id;
    knex('linkTables').where('id', tableID).del().then();
    knex('links').where('tableID', tableID).del().then(getTablesData(res));
});

router.post('/delete-url/:id', jsonParser, (req, res) => {
    let linkID = req.body.linkID;
    knex('links').where('linkID', linkID).del().then(getTablesData(res));
});

module.exports = router;