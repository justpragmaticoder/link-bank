const express = require('express');
const router = express.Router();
const path = require('path');
const knex = require('./../db/knex_db_connection.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const validate = require('./../validate/my_validate.js');

/* JWT Passport authentication */
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

/* JWT Passport init */
router.use(passport.initialize());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

/* JWP Passport strategy*/
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    knex('users').select().where('id', jwt_payload.id).then((entry) => {
        let user = entry[0];
        if (user) {
            next(null, user);
            return;
        }
        next(null, false);
    });
});
passport.use(strategy);

/* Providing static files */
router.use(express.static(path.join(path.join(__dirname, '/../../client-side'))));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client-side', 'index.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client-side', 'login.html'));
});

router.post('/login', (req, res) => {
    // if (validate.validateAuthData(req, res)) {
    //     return;
    // }
    if (req.body.login && req.body.password) {
        let login = req.body.login;
        let password = req.body.password;
        knex('users').select().where('login', login).then((tableEntry) => {
            for (let i = 0; i < tableEntry.length; i++) {
                let userEntry = tableEntry[i];
                if (!userEntry) {
                    res.status(401).json({message: "no such user found"});
                    return;
                }
                if (userEntry.password === password) {
                    /* from now on we'll identify the user by the id and the id is the
                    only personalized value that goes into our token */
                    let payload = {id: userEntry.id};
                    let token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({message: "ok", token: token});
                    return;
                }
            }
            res.status(401).json({message: "passwords did not match"});
        });
    }
});

router.post('/register', (req, res) => {
    knex('users').returning('id').insert(req.body).then((id) => {
        knex('users').select().where('id', id).then((data) => {
            res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
        });
    });
});

router.post('/create-table', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let valParams = validate.isTableParamsValid(req.body);
    if (valParams.length > 0) {
        res.status(400).send(JSON.stringify(valParams));
        return;
    }
    knex('linkTables').returning('id').insert(req.body).then((id) => {
        knex('linkTables').select().where('id', id).then((data) => {
            res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
        })
    });
});

router.post('/create-url', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let data = req.body;
    if (validate.regArray['url'].test(data.url)) {
        req.body.text = req.body.text || req.body.url;
        knex('links').returning('id').insert(req.body).then((id) => {
            knex('links').select().where('id', id).then((data) => {
                res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
            });
        });
        return;
    }
    res.status(400).send(JSON.stringify({'status': 'error', 'data': 'url is not valid'}));

});

router.get('/tables/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {
    let userId = req.params.userId;
    console.log(userId);
    if (validate.isNumberValid(+userId, 0)) {
        knex('linkTables').select().where('userID', userId).then((data) => {
            res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
        });
        return;
    }
    res.status(400).send(JSON.stringify({'status': 'error', 'data': 'error userID'}));
});
router.get('/links/:id', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let id = req.params.id;
    if (validate.isNumberValid(+id, 0)) {
        knex('links').select().where('tableId', id).then((data) => {
            res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
        });
        return;
    }
    res.status(400).send(JSON.stringify({'status': 'error', 'data': 'error table number'}));
});

router.put('/update-table/:id', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let tableID = req.params.id;
    if (validate.isNumberValid(+tableID, 0)) {
        let valParams = validate.isTableParamsValid(req.query);
        if (valParams.length > 0) {
            res.status(400).send(valParams);
        }
        else {
            knex('linkTables').where('id', tableID).update(JSON.parse(req.query)).then(() => {
                knex('linkTables').select().where('id', tableID).then((data) => {
                    res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
                });
            });
        }
        return;
    }
    res.status(400).send(JSON.stringify({'status': 'error', 'text': 'url id is not valid'}));
});

router.put('/update-url/:id', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let urlId = req.params.id;
    if (validate.isNumberValid(+urlId, 0)) {
        let valParams = validate.isTableParamsValid(req.query);
        if (valParams.length > 0) {
            res.status(400).send(valParams);
            return;
        }
        knex('links').where('linkID', linkID).update(req.query).then(() => {
            knex('links').select().where('linkID', linkID).then((data) => {
                res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
            })
        });
    }
});

router.delete('/delete-table/:id', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let tableID = req.body.id;
    knex('linkTables').where('id', tableID).del().then(() => {
        knex('links').where('tableID', tableID).del().then();
        res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
    });
});

router.post('/delete-url/:id', passport.authenticate('jwt', {session: false}), jsonParser, (req, res) => {
    let linkID = req.body.linkID;
    knex('links').where('linkID', linkID).del().then(() => {
        res.status(200).send(JSON.stringify({'status': 'ok', 'data': data}));
    });
});

module.exports = router;