/*
    /--------------------------------------------------------------------------
    |  Helpers
    |--------------------------------------------------------------------------
 */

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

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
        this.exact_phrase = options.exact_prase;
    } else {
        query = options;
    }

    this.keys_pressed = {
    };

    this.exactly = (this.type && this.type == "exact");
    if(this.exactly) {
        this.mode = NHAKModes.EXACT_PHRASE;
        if(!(this.exact_phrase && this.exact_phrase > 0)) {
            console.error("NHAK ERROR: considering exact phrase, but no phrase/empty phrase given");
        }
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
        self.keyDown({
            "key": event.which,
            "capital": event.shiftKey
        });
    });

    this.provider.keyup(function(event) {
        self.keyUp({
            "key": event.which,
            "capital": event.shiftKey
        })
    });
};

NHAKReader.prototype.keyDown = function(data) {
    this.keys_pressed[data.key] = new NHAKEvent({
        "key": data.key,
        "down_time": Date.now(),
        "up_time": null
    });
};

NHAKReader.prototype.keyUp = function(data) {
    var event = null;
    try {
        event = this.keys_pressed[data.key];
    } catch (Exception) {
        console.error("NHAK ERROR: key is up, but was never down!");
        this.keys_pressed[data.key] = undefined; // Cleaning
    }

    event.up_time = Date.now();
    this.events_stack.push(event);
    this.keys_pressed[data.key] = null;
    event.build();
    this.observer && this.observer.newEvent && this.observer.newEvent(event);
    this.readinessController && this.readinessController.newEvent(event);
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
    if(this.chars == this.charsNeeded())
        this.reader.observer && this.reader.observer.ready && this.reader.observer.ready(this.reader.getRaw());
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