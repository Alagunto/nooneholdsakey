var fioReader = null;
var familiarPhraseReader = null;
var smallRussianTextReader = null;
var smallEnglishTextReader = null;
var firstPasswordReader = null;
var secondPasswordReader = null;
var bigTextReader = null;
var commentReader = null;

$(document).ready(function(){
    if(mobilecheck()) {
        $("#go-mobile").removeClass('hide');
        $("#go").attr('disabled', 'disabled');
        return;
    }
    $("#go").click(scene_1);
    $("#go-1").click(scene_2);
    $("#go-2").click(scene_3);
    $("#go-3").click(scene_4);
    $("#go-4").click(scene_5);
    $("#go-5").click(scene_6);
    $("#skip-6").click(scene_7);
    $("#go-6").click(scene_7);
});

window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


function scene_1() {
    setProgress(15);

    var leave_text = "Если ты уйдёшь, твои данные потеряются, и я не смогу проанализировать твой почерк. Уверен, что хочешь уйти?";

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