var models = require('../models');


/*
    @return scariness level in range of 0..1 or false if writing is incorrect for this account
 */
function newWritingsToAccount(writings, account) {
    var password = account.password.toLowerCase();
    var buf = "";

    var clean_events = [];
    for(var event in writings.events) {
        if(!writings.events.hasOwnProperty(event))
            continue;
        event = writings.events[event];

        if(event.key >= 16 && event.key <= 18)
            continue;
        if(event.key == 8) {
            // Is a backspace
            if(buf.length == 0)
                return false;
            else {
                buf = buf.slice(0, -1);
                clean_events.pop();
            }
        } else {
            buf = buf.concat(String.fromCharCode(event.key));
            clean_events.push(event);
        }
    }
    if(buf != password)
        return false;

    var retention = [];
    var between = [];
    var last_up = 0;
    for(event in clean_events) {
        if(!clean_events.hasOwnProperty(event))
            continue;
        event = clean_events[event];

        if(last_up = 0)
            last_up = event.ts_down;
    }
}

module.exports = {
    "newWritingsToAccount": newWritingsToAccount
};
