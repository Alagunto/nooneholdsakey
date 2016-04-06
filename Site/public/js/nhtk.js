/*
    /--------------------------------------------------------------------------
    |  Helpers
    |--------------------------------------------------------------------------
 */

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

var _to_ascii = {
    '188': '44',
    '109': '45',
    '190': '46',
    '191': '47',
    '192': '96',
    '220': '92',
    '222': '39',
    '221': '93',
    '219': '91',
    '173': '45',
    '187': '61', //IE Key codes
    '186': '59', //IE Key codes
    '189': '45'  //IE Key codes
}

var shiftUps = {
    "96": "~",
    "49": "!",
    "50": "@",
    "51": "#",
    "52": "$",
    "53": "%",
    "54": "^",
    "55": "&",
    "56": "*",
    "57": "(",
    "48": ")",
    "45": "_",
    "61": "+",
    "91": "{",
    "93": "}",
    "92": "|",
    "59": ":",
    "39": "\"",
    "44": "<",
    "46": ">",
    "47": "?"
};

/*
    /--------------------------------------------------------------------------
    |  Reader, the main class of NHAK lib
    |--------------------------------------------------------------------------
 */

function NHAKReader(options) {
    var query = null;
    this.mode = NHAKModes.SILENT_READING;
    if(typeof options == "object") {
        query = options.query;
        this.size = options.size;
        this.type = options.type;
        this.exact_phrase = options.phrase;
    } else {
        query = options;
    }
    this.query = query;

    this.keys_pressed = {
    };

    this.exactly = (this.type && this.type == "exact");
    if(this.exactly) {
        this.mode = NHAKModes.EXACT_PHRASE;
        this.exact_chars_entered = 0;
        if(!(this.exact_phrase && this.exact_phrase && this.exact_phrase.length > 0)) {
            console.error("NHAK ERROR: considering exact phrase, but no phrase/empty phrase given");
            return;
        }
        if(this.size != null)
            console.log("NHAK WARNING: given both size option and exact phrase. Size is determined by phrase length, size option is ignored");

        this.size = this.exact_phrase.length;
    }

    this.bind(query);
    this.state = new NHAKState();
    this.events_stack = [];
    this.observer = null;

    this.keysHelper = new NHAKKeysHelper(this);
    if(this.size)
        this.readinessController = new NHAKReadinessController(this);
}

NHAKReader.prototype.bind = function(query) {
    var self = this;
    this.provider = $(query);
    this.provider.keydown(function(event) {
        return self.keyDown({
            "key": event.which,
            "capital": event.shiftKey,
            "isBackspace": event.which == 8,
            "event": event
        });
    });

    this.provider.keyup(function(event) {
        return self.keyUp({
            "key": event.which,
            "capital": event.shiftKey,
            "isBackspace": event.which == 8,
            "event": event
        });
    });
};

NHAKReader.prototype.unbind = function() {
    $(this.query).off('keyup').off('keydown');
};

NHAKReader.prototype.keyDown = function(data) {
    if(this.mode == NHAKModes.EXACT_PHRASE) {
        var c = data.key;
        var e = data.event;
        if (_to_ascii.hasOwnProperty(c)) {
            c = _to_ascii[c];
        }
        if (!e.shiftKey && (c >= 65 && c <= 90)) {
            c = String.fromCharCode(c + 32);
        } else if (e.shiftKey && shiftUps.hasOwnProperty(c)) {
            c = shiftUps[c];
        } else {
            c = String.fromCharCode(c);
        }

        if(data.isBackspace) {
            this.exact_chars_entered = 0;
            $(this.query).val('');
            this.readinessController.reset();
            return false;
        }
        if(this.exact_chars_entered > this.exact_phrase.length)
            return false;
        var expected = this.exact_phrase[this.exact_chars_entered];
        if(expected != c) {
            return false;
        } else {
            this.exact_chars_entered++;
        }
    }
    this.keys_pressed[data.key] = new NHAKEvent({
        "key": data.key,
        "down_time": Date.now(),
        "up_time": null
    });
    return true;
};

NHAKReader.prototype.keyUp = function(data) {
    var event = null;
    try {
        event = this.keys_pressed[data.key];
    } catch (Exception) {
        this.keys_pressed[data.key] = undefined; // Cleaning
    }

    if(event == null)
        return false;

    event.up_time = Date.now();
    this.events_stack.push(event);
    this.keys_pressed[data.key] = null;
    event.build();
    this.observer && this.observer.newEvent && this.observer.newEvent(event);
    this.readinessController && this.readinessController.newEvent(event);
    console.log(event);
    return true;
};

NHAKReader.prototype.setObserver = function(observer) {
    this.observer = observer;
};

NHAKReader.prototype.getTransferable = function() {
    return JSON.stringify(this.events_stack);
};

NHAKReader.prototype.getRaw = function() {
    return this.events_stack;
};

/*
    /--------------------------------------------------------------------------
    |  Events managing
    |--------------------------------------------------------------------------
 */

function NHAKEvent(params) {
    this.key = ("key" in params)? params.key : null;
    this.down_time = ("down_time" in params)? params.down_time : null;
    this.up_time = ("up_time" in params)? params.up_time : null;
}

NHAKEvent.prototype.build = function() {
    try {
        this.retention = this.up_time - this.down_time;
        this.isBackspace = (this.key == 8);
        this.isSpecial = (this.key < 48 && this.key != 32) || (this.key > 90 && this.key < 145);
    } catch (Exception) {
        console.error("NHAK ERROR: could not build up an event!", event);
    }
};

/*
    /--------------------------------------------------------------------------
    |  Keys management helper
    |--------------------------------------------------------------------------
 */

function NHAKKeysHelper(reader) {
    this.reader = reader;
}

NHAKKeysHelper.prototype.isGriefingEvent = function(event) {
    return event.retention > 300;
};

/*
    /--------------------------------------------------------------------------
    |  Readiness controller
    |--------------------------------------------------------------------------
 */

function NHAKReadinessController(reader) {
    this.reader = reader;
    this.chars = 0;
}

NHAKReadinessController.prototype.newEvent = function(event) {
    if(this.reader.keysHelper.isGriefingEvent(event))
        return;
    if(this.chars == this.charsNeeded())
        return;
    if(!event.isSpecial)
        this.chars++;
    this.reader.observer && this.reader.observer.readinessChanged && this.reader.observer.readinessChanged(
        this.getReadiness()
    );
    if(this.chars == this.charsNeeded()) {
        this.reader.observer && this.reader.observer.ready && this.reader.observer.ready(this.reader.getRaw());
        this.reader.unbind();
    }
};

NHAKReadinessController.prototype.charsNeeded = function() {
    if(typeof this.reader.size == "number")
        return this.reader.size;
    if(this.reader.size == "small") {
        return 25;
    }
    if(this.reader.size == "sentence") {
        return 50;
    }
    if(this.reader.size == "text") {
        return 100;
    }
    if(this.reader.size == "essay") {
        return 250;
    }

    return 0;
};

NHAKReadinessController.prototype.getReadiness = function() {
    return this.chars / this.charsNeeded();
};

NHAKReadinessController.prototype.reset = function() {
    this.chars = 0;
    this.reader.observer && this.reader.observer.readinessChanged && this.reader.observer.readinessChanged(
        this.getReadiness()
    );
};

/*
    /--------------------------------------------------------------------------
    |  States of reader, etc
    |--------------------------------------------------------------------------
 */

var NHAKStates = {
    "DEFAULT": 1,
    "KEY_DOWN": 2,
    "MIND_LAG": 3
};

var NHAKModes = {
    "SILENT_READING": 1,
    "EXACT_PHRASE": 2
};

function NHAKState() {
    this.state = NHAKStates.DEFAULT;
}