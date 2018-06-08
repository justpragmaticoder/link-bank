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

router.get('/login', jsonParser, (req, res) =>{
    let data = req.body;
    let usernameError = isStringValid(data.username,'username',reArray['username']);
    let passwordError = isStringValid(data.password,'password',reArray['password']);
    if (usernameError.status == 'error') {
        res.send(400).send(usernameError);
    }
    if (passwordError.status == 'error') {
        res.send(400).send(passwordError);
    }
    if (!validateEmail(data.email)){
        res.send(400).send({'status':'error','error':'Email is not valid'});
    }
});

router.post('/create-table', jsonParser, (req, res) => {
    let valParams = validateTableParams(req.body);
    if (valParams.length > 0){
        res.status(400).send(valParams);
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
                res.status(200).send(data);
            })
        });
    }
});

router.post('/create-url', jsonParser, (req, res) => {
    let data = req.body;
    if (regArray['url'].test(data.url)){
        req.body.text = req.body.text || req.body.url;
        knex('links')
        .returning('id')
        .insert(req.body)
        .then((id)=>{
            knex('links')
            .select()
            .where('id', id)
            .then((data)=>{
                res.status(200).send(data);
            })
        });
    }
    
});

router.get('/tables/:userid', (req, res) => {
    let userid = req.params.id;
    if (isNumber(+id,0)) {
        knex('linkTables')
        .select()
        .where('userid', userid)
        .then((data)=>{
            res.status(200).send(data);
        });
    }
    else {
        res.status(400).send('error userid');
    }
});
router.get('/get-table/:id', jsonParser, (req, res)=>{
    let id = req.params.id;
    if (isNumber(+id,0)) {
        knex('linkTables')
        .select()
        .where('id', id)
        .then((data)=>{
            res.status(200).send(data);
        });
    }
    else {
        res.status(400).send('error table number');
    }
});

router.put('/update-table/:id', jsonParser, (req, res) => {
    let tableID = req.params.id;
    console.log(req.query);
    if (validate.isNumber(+tableID, 0)){
        let valParams = validate.validateTableParams(req.query);
        if (valParams.length > 0){
            res.status(400).send(valParams);
        }
        else{
            knex('linkTables')
            .where('id', tableID)
            .update(JSON.parse(req.query))
            .then(()=>{
                knex('linkTables')
                .select()
                .where('id', tableID)
                .then((data)=>{
                    res.status(200).send(data);
                });
            });
        }
        
    }
});

router.put('/update-url/:id', jsonParser, (req, res) => {

    knex('links').where('linkID', linkID).update(newData).then();
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


console.log(validate.isStringValid('vasya', 'username', validate.regArray['username']));
console.log(validate.isStringValid('124', 'password', validate.regArray['password']));
console.log(validate.validateEmail('a@f.ru'));
console.log(validate.isNumber(1,0));
console.log(validate.regArray['url'].test("google.com"));
console.log('----'+validate.validateTableParams({'name':'',x:'20'}));
module.exports = router;