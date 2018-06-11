let regArray = {
    'username': /^[a-zA-Z]+$/,
    'password': /^[a-zA-Z0-9]+$/,
    'email': /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'url': /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/

};

let isStringValid = (val, text, regExp) => {
    let msg = {
        status: 'error',
        error: ''
    };
    if (val === "") {
        msg.error = "Error: your " + text + " is empty";
        return msg;
    }
    if (val.length < 5 || val.length > 20) {
        msg.error = "Error: " + text + " must be greater than 5 and less than 20 characters";
        return msg;
    }
    if (!val.match(regExp) && text === 'username') {
        msg.error = "Error: " + text + " must consist only of letters";
        return msg;
    }
    if (!val.match(regExp) && text === 'password') {
        msg.error = "Error: " + text + " must consist only of letters and digits";
        return msg;
    }
    msg.status = 'ok';
    return msg;
};

let isEmailValid = (_email) => {
    return regArray['email'].test(_email);
};

let isNumberValid = (value, min, max = Infinity) => {
    return Number.isInteger(value) && value >= min && value <= max;

};

let isTableParamsValid = (table) => {
    let errors = [];
    for (let params in table) {
        switch (params) {
            case 'name':
                if (table[params] === '') {
                    errors.push('name is empty');
                }
                else if (table[params].length > 50) {
                    errors.push('name must be less then 50');
                }
                break;
            case 'width':
            case 'height':
                if (!isNumberValid(table[params], 0, 2000)) {
                    errors.push('width or height must be number between 0 and 2000 px');
                }
                break;
            case 'x':
            case 'y':
                if (!isNumberValid(table[params], 0, 2000)) {
                    errors.push('x or y coords must be number between 0 and 2000 px');
                }
                break;
        }
    }
    return errors;
};

let validateAuthData = (req, res,) => {
    let data = req.body;
    let usernameError = isStringValid(data.login, 'username', regArray['username']);
    let passwordError = isStringValid(data.password, 'password', regArray['password']);
    if (usernameError.status === 'error') {
        res.status(400).send(JSON.stringify(usernameError));
        return false;
    }
    if (passwordError.status === 'error') {
        res.status(400).send(JSON.stringify(passwordError));
        return false;
    }
    return true;
};

module.exports = {
    regArray,
    isStringValid,
    isEmailValid,
    isNumberValid,
    isTableParamsValid,
    validateAuthData
};