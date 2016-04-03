@extends("layouts.app")

@section("content")
    <div class="scene" id="scene-0">
        <h2>Привет!</h2>
        <p class="lead">
            Скорее всего, ты здесь, потому что перешёл по отправленной мной ссылке, и я прошу тебя о помощи.
        </p>
        <p>
            Моя курсовая работа посвящена анализу клавиатурного почерка (того, как человек вводит текст на клавиатуре). <br />
            Её конечной задачей является возможность использования клавиатурного почерка для вторичной авторизации.
            То есть, я буду оценивать не только то, какой пароль ты ввёл, но и то, как ты его ввёл.
        </p>
        <p>
            И теперь я хочу узнать, какие бывают почерки. Поможешь мне? <br />
            Это не займёт много времени, честно.
        </p>
        <button class="button success" id="go">Погнали!</button>
    </div>

    <div class="hide scene" id="scene-1">
        <h2>
            Знакомство
        </h2>
        <p class="lead">Будет очень здорово, если ты укажешь немного информации о себе.</p>
        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <legend>
                    Как тебя зовут? Если не сильно затруднит, полные ФИО. <br />
                </legend>
                <input type="text" placeholder="Петя" name="name" id="name"/>
            </fieldset>
        </div>
        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <legend>
                    Какого ты пола? <small>(я попробую научиться угадывать это по почерку)</small>
                </legend>
                <input type="radio" name="gender" id="genderMan" value="man" /> <label for="genderMan">Мужского</label>
                <input type="radio" name="gender" id="genderWoman" value="woman" /> <label for="genderWoman">Женского</label>
                <input type="radio" name="gender" id="genderNone" value="none" checked /> <label for="genderNone">Не скажу/не знаю</label>
            </fieldset>
        </div>
        <p>Если вдруг захочешь указать что-то дополнительно, у тебя будет возможность сделать это в самом конце.</p>
        <button class="button success" id="go-1">Дальше</button>
    </div>

    <div class="hide scene" id="scene-2">
        <h2>Небольшая знакомая фраза</h2>
        <p class="lead">
            Несмотря на то, что я уже записал, как ты вводишь знакомую тебе фразу (твои ФИО), мне бы хотелось,
            чтобы ты написал ещё что-нибудь небольшое и хорошо знакомое лично тебе.
        </p>
        <p>
            Это может быть, например, "спокойной ночи, солнышко <3" или какой-нибудь старый, неиспользуемый (!) пароль, который твои руки помнят наизусть.
        </p>

        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <label>
                    Мне нужно 25 касаний:
                    <input type="text" class="with-progress" placeholder="Would you like to learn to fly?" id="familiar_phrase" name="familiar_phrase"/>
                </label>
                <div id="familiar-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
            </fieldset>
        </div>
        <div id="familiar-enough" class="hide">
            <p class="lead">Спасибо! Больше будет излишне =)</p>
            <button id="go-2" class="button success">Дальше</button>
        </div>
    </div>

    <div class="hide scene" id="scene-3">
        <h2>Небольшой текст на русском</h2>
        <p class="lead">
            Не обязательно переписывать весь текст, я скажу, когда хватит
        </p>

        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <label>
                    <textarea type="text" id="small-russian-text" class="with-progress" style="resize: vertical; min-height: 200px;"></textarea>
                </label>
                <div id="small-russian-text-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
                <blockquote>
                    Прочь из моей головы! <br />
                    Наугад в темноту, c середины концерта <br />
                    Сквозь толпу, сквозь охрану, сквозь двери, сквозь парк <br />
                    Чтоб чуть-чуть постоять над водой на мосту <br />
                    <cite>Сплин, "Прочь из моей головы"</cite>
                </blockquote>
            </fieldset>
        </div>
        <div id="small-russian-text-enough" class="hide">
            <p class="lead">Спасибо! Дальше? </p>
            <button id="go-3" class="button success">Дальше!</button>
        </div>
    </div>

    <div id="scene-4" class="hide scene">
        <h2>Небольшой текст на английском</h2>
        <p class="lead">
            Попробую найти различия в почерке на разных языках.
        </p>

        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <label>
                    <textarea type="text" id="small-english-text" class="with-progress" style="resize: vertical; min-height: 200px;"></textarea>
                </label>
                <div id="small-english-text-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
                <blockquote>
                    We held our breath when the clouds began to fall <br />
                    But you were lost in the beating of the storm <br />
                    And in the end we were made to be apart <br />
                    In separate chambers of the human heart <br />
                    <cite>Linkin park, "Burning in the skies"</cite>
                </blockquote>
            </fieldset>
        </div>
        <div id="small-english-text-enough" class="hide">
            <p class="lead">Спасибо! Дальше? </p>
            <button id="go-5" class="button success">Дальше!</button>
        </div>
    </div>

    <div id="scene-5" class="hide scene">
        <h2>Мои пароли</h2>
        <p class="lead">
            А теперь попробуй ввести пару моих паролей =)
        </p>
        <p>
            Теперь фразы нужно ввести в точности, это важно.
        </p>

        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <label>
                    <textarea type="text" id="small-english-text" class="with-progress" style="resize: vertical; min-height: 200px;"></textarea>
                </label>
                <div id="small-english-text-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
            </fieldset>
        </div>
        <div id="passwords-enough" class="hide">
            <p class="lead">Спасибо! Дальше? </p>
            <button id="go-5" class="button success">Дальше!</button>
        </div>
    </div>

    <div id="help-me-progress" class="success progress hide">
        <div class="progress-meter" style="width: 20%">
            <p class="progress-meter-text">15%</p>
        </div>
    </div>

    <style>
        #help-me-progress {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin-bottom: 0;
        }

        .with-progress {
            margin-bottom: 0;
        }
    </style>
    <script src="/js/nhtk.js"></script>
    <script src="/js/help-me.js"></script>
@endsection