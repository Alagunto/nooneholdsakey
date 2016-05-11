var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');

/*
    Operator
 */

var operatorSchema = mongoose.Schema({
    name: String,
    token: String
});

operatorSchema.methods.ban = function() {

};

var Operator = mongoose.model('operator', operatorSchema);

/*
    Password writings
 */

var passwordWritingSchema = mongoose.Schema({
    "events": [{key: Number, ts_down: Number, ts_up: Number}],
    "account": String
});

var PasswordWriting = mongoose.model('passwordWriting', passwordWritingSchema);

/*
    Account
 */

var accountSchema = mongoose.Schema({
    id: String,
    password: String,
    operator: String,
    avg_retention: [{value: Number}],
    avg_between: [{value: Number}]
});


var Account = mongoose.model('account', accountSchema);

module.exports = {
    "operator": Operator,
    "account": Account,
    "passwordWriting": PasswordWriting
};

// Amen