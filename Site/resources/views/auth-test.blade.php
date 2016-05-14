@extends("layouts.app")

@section("content")
    <script type="text/javascript" src="/js/nhtk_modded.js">
    </script>
    <style>
        #log {
            list-style: none;
            margin-left: 0;
        }
        #log li:before {
            content: "";
        }
        #log li {
            font-size: 12px;
        }

        .hidden {
            display: none;
        }

        .tooltip {
            overflow-wrap: break-word;
            max-width: 15em !important;
        }

        .is-recording {
            background-image: url(img/recording.png);
            -webkit-background-size: 22px;
            background-size: 22px;
            background-repeat: no-repeat;
            background-position: right;
            padding-right: 20px !important;
        }

        #log-wrapper {
            max-height: 500px;
            overflow: auto;
        }
    </style>
    <h2>Тестирование сервиса вторичной авторизации</h2>
    <div class="row">
        <div class="column small-8 hidden" id="commands">
            <ul class="tabs" data-tabs id="commands-menu">
                <li class="tabs-title is-active"><a href="#tab-enter" aria-selected="true">Вход</a></li>
                <li class="tabs-title"><a href="#tab-register">Регистрация</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="commands-menu">
                <div class="tabs-panel is-active" id="tab-enter">
                    <h3>Вход</h3>
                    <form class="row column small-8" id="tab-enter-form" data-abide="ajax">
                        <label>
                            Логин:
                            <input type="text" id="tab-enter-login" placeholder="account" required/>
                        </label>
                        <label>
                            Пароль:
                            <input type="text" id="tab-enter-password" placeholder="basicpassword" class="is-recording" required/>
                        </label>
                        <input type="submit" class="button" value="Войти" id="tab-enter-submit" />
                    </form>
                    <p id="tab-enter-status"></p>
                </div>
                <div class="tabs-panel" id="tab-register">
                    <h3>Регистрация</h3>
                    <form class="row column small-8" id="tab-register-form" data-abide="ajax">
                        <label>
                            Логин:
                            <input type="text" id="tab-register-login" placeholder="account" required/>
                        </label>
                        <label>
                            Пароль:
                            <input type="text" id="tab-register-password" placeholder="****" class="is-recording" required/>
                        </label>
                        <label>
                            Пароль снова:
                            <input type="text" id="tab-register-password2" data-equalto="tab-register-password" placeholder="****" class="is-recording" required/>
                        </label>
                        <input type="submit" class="button" value="Зарегистрировать" id="tab-register-submit" />
                    </form>
                    <p id="tab-register-status"></p>
                </div>
            </div>
        </div>

        <div class="column small-4">
            <div class="row callout">
                <h4>Статус сервиса:</h4>
                <ul>
                    <li id="status-running" class="loading">
                        ...
                    </li>
                </ul>
            </div>
            <div class="row callout" id="log-wrapper">
                <h4>Журнал запросов
                    <span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover="false" tabindex=1 title="Это запросы, совершаемые этим сайтом к сервису вторичной авторизации, и ответы на них">?</span>
                </h4>
                <div class="callout secondary">
                    <ul id="log">
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        function escapeHtml(text) {
            return text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
        }

        function parseLog(result_log) {
            for(var send in result_log) {
                if(!result_log.hasOwnProperty(send))
                    continue;
                send = result_log[send];
                if(send[0] == "request")
                    log.logRequest(send);
                else if(send[0] == "response")
                    log.logResponse(send);
            }
        }

        function check() {
            $.ajax({
                "url": "/auth-test/isRunning",
                "success": function(result) {
                    var running = result.data.running;
                    var status_view = $("#status-running");
                    if(running == true) {
                        status_view.html('Запущен на <a href="{{config("nhak.auth-test.host")}}" target="_blank">{{ config("nhak.auth-test.host") }}</a>');
                        parseLog(result.log);
                        isRunning();
                    } else {
                        status_view.html('Остановлен, тестирование невозможно');
                        log.close("сервис не запущен");
                    }
                }
            });
        }

        function isRunning() {
            $("#commands").removeClass('hidden');
            var registerFirstPassReader = new NHAKReader({
                query: "#tab-register-password"
            });
            var registerSecondPassReader = new NHAKReader({
                query: "#tab-register-password2"
            });
            var enterPassReader = new NHAKReader({
                query: "#tab-enter-password"
            });

            $("#tab-register-form").on("submit", function(){return false}).on("formvalid.zf.abide", function() {
                $("#tab-register-submit").attr('disabled', 'disabled');
                $.ajax({
                    url: "/auth-test/register",
                    data: {
                        "login": $("#tab-register-login").val(),
                        "password": $("#tab-register-password").val(),
                        "events1": registerFirstPassReader.getTransferable(),
                        "events2": registerSecondPassReader.getTransferable()
                    },
                    type: "post",
                    success: function(result) {
                        if(result.success == true) {
                            $("#tab-register-status").html('Аккаунт ' + escapeHtml($("#tab-register-login").val()) + ' зарегистрирован');
                        } else {
                            $("#tab-register-status").html('Регистрация не удалась: ' + result.reason);
                            console.error('Cannot register user', result);
                        }

                        parseLog(result.log);
                    },
                    error: function(error) {
                        console.error(error);
                        $("#tab-register-status").html("Ошибка! " + JSON.stringify(error));
                    }
                }).always(function() {
                    registerFirstPassReader = new NHAKReader({
                        query: "#tab-register-password"
                    });
                    registerSecondPassReader = new NHAKReader({
                        query: "#tab-register-password2"
                    });
                    $("#tab-register-submit").removeAttr("disabled");
                    $("#tab-register-password").val('');
                    $("#tab-register-password2").val('');
                });
                return false;
            });

            $("#tab-enter-form").on("submit", function(){return false}).on("formvalid.zf.abide", function() {
                $("#tab-enter-submit").attr('disabled', 'disabled');
                $.ajax({
                    url: "/auth-test/enter",
                    data: {
                        "login": $("#tab-enter-login").val(),
                        "password": $("#tab-enter-password").val(),
                        "events": enterPassReader.getTransferable()
                    },
                    type: "post",
                    success: function(result) {
                        if(result.success == true) {
                            $("#tab-enter-status").html('Вход удачен, подозрительность: ' + result.scary * 100 + '%');
                        } else {
                            $("#tab-enter-status").html('Вход неудачен');
                        }
                        parseLog(result.log);
                    },
                    error: function(error) {
                        console.error(error);
                        $("#tab-enter-status").html("Ошибка! " + JSON.stringify(error));
                    }
                }).always(function() {
                    enterPassReader = new NHAKReader({
                        query: "#tab-enter-password"
                    });
                    $("#tab-enter-password").val('');
                    $("#tab-enter-submit").removeAttr("disabled");
                });
                return false;
            })
        }

        var log = (function(){
            var isOpened = true;

            var directions = {
                "SYSTEM": 1,
                "REQUEST": 2,
                "RESPONSE": 3
            };
            var log = $("#log");

            function addToLog(direction, message) {
                if(!isOpened) {
                    return;
                }
                var date = new Date();
                var time = "";
                time += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                log.append("<li>" + "<i>" + time + "</i> " + message + "</li>");
                $(document).foundation();
            }

            function close(message) {
                if(!message)
                    message = " по неизвестной причине";
                else
                    message = ": " + message;

                addToLog(directions.SYSTEM, "Журналирование остановлено" + message);
                isOpened = false;
            }

            return {
                "addToLog": addToLog,
                "close": close,
                "directions": directions,
                "logRequest": function(send) {
                    var ans = "> " + send[1] + " ";
                    if(send[3])
                        ans += '<span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover="false" tabindex=1 title="' + escapeHtml(send[3]) +'">' + send[2] + '</span>';
                    else
                        ans += send[2];
                    this.addToLog(directions.REQUEST, ans);
                },
                "logResponse": function(send) {
                    var ans = "< " + send[1] + " ";
                    if(send[3])
                        ans += '<span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover="false" tabindex=1 title="' + escapeHtml(send[3]) +'">' + send[2] + '</span>';
                    else
                        ans += send[2];
                    console.log(ans);
                    this.addToLog(directions.RESPONSE, ans);
                }
            };
        })();

        check();
    </script>
@endsection