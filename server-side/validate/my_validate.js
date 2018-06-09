module.exports = {
    regArray: {
        'username': /^[a-zA-Z]+$/,
        'password': /^[a-zA-Z0-9]+$/,
        'email': /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'url': /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/

    },
    isStringValid: function (val, text, regExp) {
        // let passRegex = /^[a-zA-Z0-9]+$/;
        let msg = {
            status: 'error',
            error: ''
        };
        if (val == "") {
            msg.error = "Error: your " + text + " is empty";
        }
        else if (val.length < 5 || val.length > 20) {
            msg.error = "Error: " + text + " must be greater than 5 and less than 20 characters";
        }
        else if (!val.match(regExp) && text == 'username') {
            msg.error = "Error: " + text + " must consist only of letters";
        }
        else if (!val.match(regExp) && text == 'password') {
            msg.error = "Error: " + text + " must consist only of letters and digits";
        }
        else {
            msg.status = 'ok';
        }
        return msg;
    },
    isEmailValid: function (_email) {
        if (this.regArray.email.test(_email)) {
            return true
        }
        else {
            return false;
        }
    },

    isNumberValid: function (value, min, max = Infinity) {
        return Number.isInteger(value) && value >= min && value <= max;

    },
    isTableParamsValid: function (table) {
        let mes = [];
        for (let params in table) {
            // for (i=0; i < arguments.length; i+=2){
            switch (params) {
                case 'name':
                    if (table[params] == '') {
                        mes.push('name is empty');
                    }
                    else if (table[params].length > 50) {
                        mes.push('name must be less then 50');
                    }
                    break;
                case 'width':
                case 'height':
                    if (!isNumberValid(table[params], 0, 2000)) {
                        mes.push('width or height must be number between 0 and 2000 px');
                    }
                    break;
                case 'x':
                case 'y':
                    if (!this.isNumberValid(table[params], 0, 2000)) {
                        mes.push('x or y coords must be number between 0 and 2000 px');
                    }
                    break;
            }
        }
        return mes;
    },
    validateAuthData: (req, res,) => {
        let data = req.body;
        let usernameError = this.isStringValid(data.login, 'username', this.regArray['username']);
        let passwordError = this.isStringValid(data.password, 'password', this.regArray['password']);
        if (usernameError.status === 'error') {
            res.send(400).send(JSON.stringify(usernameError));
            return false;
        }
        if (passwordError.status === 'error') {
            res.send(400).send(JSON.stringify(passwordError));
            return false;
        }
        return true;
    }
};