var fioReader = null;
var familiarPhraseReader = null;
var smallRussianTextReader = null;
var smallEnglishTextReader = null;
var firstPasswordReader = null;
var secondPasswordReader = null;
var bigTextReader = null;
var commentReader = null;

$(document).ready(function(){
    $("#go").click(scene_1);
    $("#go-1").click(scene_2);
    $("#go-2").click(scene_3);
    $("#go-3").click(scene_4);
    $("#go-4").click(scene_5);
    $("#go-5").click(scene_6);
    $("#skip-6").click(scene_7);
    $("#go-6").click(scene_7);

});


function scene_1() {
    setProgress(15);

    var leave_text = "Если ты уйдёшь, твои данные потеряются, и я не смогу проанализировать твой почерк. Уверен, что хочешь уйти?";
    var leaveFunc = function() {
        return window.confirm(leave_text);
    };

    $("#home-link").click(leaveFunc);
    window.onbeforeunload = function() {
        return leave_text;
    };

    $("#scene-0").slideUp(400);
    fioReader = new NHAKReader({
        query: "#name",
        size: "phrase"
    });
    $("#help-me-progress").css('display', 'none').removeClass('hide').slideDown(400);
    $("#top-bar").slideUp(400, function() {
        $("#scene-1").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#name").focus();
        });
    });
}

function scene_2() {
    setProgress(27);
    $("#scene-0").hide();
    $("#scene-1").slideUp(400, function() {
        $("#scene-2").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#familiar_phrase").focus();
        });
    });
    formBuilder.providePersonData({
        'name': $('#name').val(),
        'gender': $('[name=gender]').val(),
        'name_writing': fioReader.getTransferable()
    });
    familiarPhraseReader = new NHAKReader({
        query: "#familiar_phrase",
        size: "small"
    });
    familiarPhraseReader.setObserver({
        readinessChanged: function(readiness) {
            $('#familiar-progress .progress-meter').css('width', Math.round(readiness * 100) + '%');
            if(readiness > 0.4) {
                $('#familiar-progress').removeClass('alert').addClass('warning');
            }
            if(readiness > 0.8) {
                $('#familiar-progress').removeClass('warning').addClass('success');
            }
        },
        ready: function() {
            $('#familiar-enough').removeClass('hide');
            $('#familiar_phrase').blur();
            formBuilder.provideFamiliarPhrase({
                "phrase": $('#familiar_phrase').val(),
                "phrase_writing": familiarPhraseReader.getTransferable()
            });
        }
    });
}

function scene_3() {
    setProgress(37);
    $("#scene-2").slideUp(400, function() {
        $("#scene-3").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#small-russian-text").focus();
        });
    });
    smallRussianTextReader = new NHAKReader({
        query: "#small-russian-text",
        size: "text"
    });
    smallRussianTextReader.setObserver({
        readinessChanged: function(readiness) {
            $('#small-russian-text-progress .progress-meter').css('width', Math.round(readiness * 100) + '%');
            if(readiness > 0.4) {
                $('#small-russian-text-progress').removeClass('alert').addClass('warning');
            }
            if(readiness > 0.8) {
                $('#small-russian-text-progress').removeClass('warning').addClass('success');
            }
        },
        ready: function() {
            $('#small-russian-text-enough').removeClass('hide');
            $('#small-russian-text').blur();
            formBuilder.provideSmallRussianText({
                "text": $('#small-russian-text').val(),
                "phrase_writing": smallRussianTextReader.getTransferable()
            });
        }
    });
}

function scene_4() {
    setProgress(52);
    $("#scene-3").slideUp(400, function() {
        $("#scene-4").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#small-english-text").focus();
        });
    });
    smallEnglishTextReader = new NHAKReader({
        query: "#small-english-text",
        size: "text"
    });
    smallEnglishTextReader.setObserver({
        readinessChanged: function(readiness) {
            $('#small-english-text-progress .progress-meter').css('width', Math.round(readiness * 100) + '%');
            if(readiness > 0.4) {
                $('#small-english-text-progress').removeClass('alert').addClass('warning');
            }
            if(readiness > 0.8) {
                $('#small-english-text-progress').removeClass('warning').addClass('success');
            }
        },
        ready: function() {
            $('#small-english-text-enough').removeClass('hide');
            $('#small-english-text').blur();
            formBuilder.provideSmallEnglishText({
                "text": $('#small-english-text').val(),
                "phrase_writing": smallEnglishTextReader.getTransferable()
            });
        }
    });
}

function scene_5() {
    setProgress(67);
    $("#scene-4").slideUp(400, function() {
        $("#scene-5").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#password-1").focus();
        });
    });
    firstPasswordReader = new NHAKReader({
        query: "#password-1",
        type: "exact",
        phrase: "cokol-cokol"
    });
    secondPasswordReader = new NHAKReader({
        query: "#password-2",
        type: "exact",
        phrase: "Wouldyouliketolearntofly?Wouldyouliketoseemetry?"
    });
    firstPasswordReader.setObserver({
        readinessChanged: function(readiness) {
            $('#password1-progress .progress-meter').css('width', Math.round(readiness * 100) + '%');
            if(readiness > 0.4) {
                $('#password1-progress').removeClass('alert').addClass('warning');
            }
            if(readiness > 0.8) {
                $('#password1-progress').removeClass('warning').addClass('success');
            }
        },
        ready: function() {
            $('#password-1').blur().attr('disabled', 'disabled');
            $('#password-2-wrapper').removeClass('hide');
            $("#password-2").focus();
            setProgress(75);
            formBuilder.provideFirstPassword({
                "text": $('#password-1').val(),
                "writing": firstPasswordReader.getTransferable()
            });
        }
    });
    secondPasswordReader.setObserver({
        readinessChanged: function(readiness) {
            $('#password2-progress .progress-meter').css('width', Math.round(readiness * 100) + '%');
            if(readiness > 0.4) {
                $('#password2-progress').removeClass('alert').addClass('warning');
            }
            if(readiness > 0.8) {
                $('#password2-progress').removeClass('warning').addClass('success');
            }
        },
        ready: function() {
            $('#password-2').blur().attr('disabled', 'disabled');
            $('#passwords-enough').removeClass('hide');
            formBuilder.provideSecondPassword({
                "text": $('#password-2').val(),
                "writing": secondPasswordReader.getTransferable()
            });
        }
    });
}

function scene_6() {
    setProgress(80);
    $("#scene-5").slideUp(400, function() {
        $("#scene-6").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#big-text").focus();
        });
    });
    bigTextReader = new NHAKReader({
        query: "#big-text",
        size: 675
    });
    bigTextReader.setObserver({
        readinessChanged: function(readiness) {
            $('#big-text-progress .progress-meter').css('width', Math.round(readiness * 100) + '%');
            if(readiness > 0.4) {
                $('#big-text-progress').removeClass('alert').addClass('warning');
            }
            if(readiness > 0.8) {
                $('#big-text-progress').removeClass('warning').addClass('success');
            }
        },
        ready: function() {
            $('#big-text-skip').addClass('hide');
            $('#big-text').blur().attr('disabled', 'disabled');
            $('#big-text-enough').removeClass('hide').focus();
            formBuilder.provideBigText({
                "text": $('#big-text').val(),
                "writing": bigTextReader.getTransferable()
            });
        }
    });
}

function scene_7() {
    setProgress(100);
    $("#scene-6").slideUp(400, function() {
        $("#scene-7").css('display', 'none').removeClass('hide').slideDown(400, function() {
        });
    });

    commentReader = new NHAKReader({
        query: "#big-text"
    });

    $("#save-form").click(function() {
        formBuilder.provideComment({
            "text": $("#comment").val(),
            "writing": commentReader.getTransferable()
        });

        sendData();
    })
}

function scene_ok() {
    $("#scene-7").slideUp(400, function() {
        $("#scene-ok").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#help-me-progress").addClass('hide');
            $("#top-bar").slideDown(400);
        });
    });
    window.onbeforeunload = null;
    $("#home-link").off('click');
}

function scene_error(data) {
    $("#scene-7").slideUp(400, function() {
        $("#scene-error").css('display', 'none').removeClass('hide').slideDown(400, function() {
            $("#data-to-send").attr("href", "data:text/plain;charset=utf-8," + data);
        });
    });
    $("#data-to-send-select").dblclick();

    window.onbeforeunload = function() {
        return "Ты точно скачал файл?";
    };
    $("#home-link").off('click');
}

function sendData() {
    var data = formBuilder.getData();
    console.log(JSON.stringify(data));
    var btoed = Base64.encode(JSON.stringify(data));
    $.ajax({
        url: "/store/help-form",
        method: "POST",
        data: {
            "data": btoed
        },
        dataType: "json",
        success: function(result) {
            if(result && result.code == "ok") {
                scene_ok();
            } else
                scene_error(btoed);
        },
        error: function() {
            scene_error(btoed);
        }
    })
}

var formBuilder = new (function() {
    var self = this;
    this.personData = null;
    this.familiarPhrase = null;
    this.smallRussianText = null;
    this.smallEnglishText = null;
    this.firstPassword = null;
    this.secondPassword = null;
    this.bigText = null;
    this.comment = null;

    return {
        getData: function() {
            return {
                "person": self.personData,
                "familiar": self.familiarPhrase,
                "small-rus": self.smallRussianText,
                "small-en": self.smallEnglishText,
                "first-pass": self.firstPassword,
                "second-pass": self.secondPassword,
                "big-text": self.bigText,
                "comment": self.comment
            }
        },
        providePersonData: function(data) {
            self.personData = data;
        },
        provideFamiliarPhrase: function(data) {
            self.familiarPhrase = data;
        },
        provideSmallRussianText: function(data) {
            self.smallRussianText = data;
        },
        provideSmallEnglishText: function(data) {
            self.smallEnglishText = data;
        },
        provideFirstPassword: function(data) {
            self.firstPassword = data;
        },
        provideSecondPassword: function(data) {
            self.secondPassword = data;
        },
        provideBigText: function(data) {
            self.bigText = data;
        },
        provideComment: function(data) {
            self.comment = data;
        }
    }
})();

function setProgress(percents) {
    $("#help-me-progress .progress-meter").css('width', percents + '%');
    $("#help-me-progress .progress-meter-text").html(percents + '%');
}