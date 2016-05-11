var models = require('../models');


/*
    @return scariness level in range of 0..1 or false if writing is incorrect for this account
 */
function newWritingsToAccount(writings, account, callback) {
    var password = account.password.toUpperCase();
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
    if(buf != password) {
        callback(false);
        return false;
    }

    var retention = [];
    var between = [];
    var last_up = 0;
    for(event in clean_events) {
        if(!clean_events.hasOwnProperty(event))
            continue;
        event = clean_events[event];

        if(last_up == 0)
            last_up = event.ts_up;
        else {
            between.push({value: event.ts_down - last_up});
            last_up = event.ts_up;
        }

        retention.push({value: event.ts_up - event.ts_down});
    }

    var retention_error = 0.0;
    var between_error = 0.0;
    var retention_avg = 0;
    var between_avg = 0;

    if(account.avg_retention === null && account.avg_between === null) {
        account.avg_retention = retention;
        account.avg_between = between;
        account.save(function(err) {
            if(err) {
                console.error("Error: cannot save account", err);
                callback(false);
            }
            callback(0);
        })
    } else
    try {
        for(var i = 0; i < password.length; i++) {
            retention_error += Math.pow(account.avg_retention[i].value - retention[i].value, 2);
            retention_avg += account.avg_retention[i].value;
        }
        for(var i = 0; i < password.length - 1; i++) {
            between_error += Math.pow(account.avg_between[i].value - between[i].value, 2);
            between_avg += account.avg_retention[i].value;
        }
        retention_avg /= password.length;
        between_avg /= password.length - 1;

        retention_error /= Math.pow(retention_avg, 2);
        between_error /= Math.pow(between_avg, 2);

        callback(1 - 1 / (retention_error * 0.05 + between_error * 0.2 + 1));
    } catch(err) {
        console.error("Error: cannot calculate retention and between errors", err);
        callback(false);
    }
}

module.exports = {
    "newWritingsToAccount": newWritingsToAccount
};
