var fioReader = null;
var familiarPhraseReader = null;
var smallRussianTextReader = null;
var smallEnglishTextReader = null;

$(document).ready(function(){
    $("#go").click(scene_1);
    $("#go-1").click(scene_2);
    $("#go-2").click(scene_3);
    $("#go-3").click(scene_4);
    $("#go-4").click(scene_4);
    var leaveFunc = function() {
        return window.confirm("Если ты уйдёшь, твои данные потеряются, и я не смогу проанализировать твой почерк. Уверен, что хочешь уйти?");
    };

    $("#home-link").click(leaveFunc);
    //$(document).unload(leaveFunc);
});


function scene_1() {
    setProgress(15);
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

}

//scene_1();

var formBuilder = new (function() {
    var self = this;
    this.personData = null;
    this.familiarPhrase = null;
    this.smallRussianText = null;
    this.smallEnglishText = null;

    return {
        providePersonData: function(data) {
            self.personData = data;
            console.log(self.personData);
        },
        provideFamiliarPhrase: function(data) {
            self.familiarPhrase = data;
            console.log(self.familiarPhrase);
        },
        provideSmallRussianText: function(data) {
            self.smallRussianText = data;
            console.log(self.smallRussianText);
        },
        provideSmallEnglishText: function(data) {
            self.smallEnglishText = data;
            console.log(self.smallEnglishText);
        }
    }
})();

function setProgress(percents) {
    $("#help-me-progress .progress-meter").css('width', percents + '%');
    $("#help-me-progress .progress-meter-text").html(percents + '%');
}