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
        <div class="callout warning hide" id="go-mobile">
            Прости, мне нужно, чтобы ты зашёл с компьютера =[
        </div>
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
        <button class="button success pad" id="go-1">Дальше</button>
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
        <div id="familiar-enough" class="hide pad">
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
                    Солнце -- такой долгий ядерный взрыв, мы согреты теплом этого света, <br />
                    И немного солнца мы прячем в ракетах <br />
                    Если вдруг захочется жаркого лета.  <br />
                    Если мы захотим тепла себе и другим <br />
                    Нас всегда спасут наши командиры, <br />
                    Жестяные банки ринутся вверх, <br />
                    В них вся любовь и вера этого мира. <br />
                    <cite>Люмен, "ВВИЛЭМ"</cite>
                </blockquote>
            </fieldset>
        </div>
        <div id="small-russian-text-enough" class="hide pad">
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
        <div id="small-english-text-enough" class="hide pad">
            <p class="lead">Спасибо! Дальше? </p>
            <button id="go-4" class="button success">Дальше!</button>
        </div>
    </div>

    <div id="scene-5" class="hide scene">
        <h2>Мои пароли</h2>
        <p class="lead">
            А теперь попробуй ввести пару моих паролей =)
        </p>
        <p>
            Теперь нужно вводить в точности и, желательно, без ошибок, это важно.
        </p>

        <div class="row">
            <fieldset class="column small-6" style="padding: 0">
                <label>
                    <kbd>cokol-cokol</kbd>
                    <input id="password-1" type="text" class="with-progress" />
                </label>
                <div id="password1-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="row hide" id="password-2-wrapper">
            <fieldset class="column small-6" style="padding: 0">
                <label>
                    <kbd>Wouldyouliketolearntofly?Wouldyouliketoseemetry?</kbd><small>Спасибо, Pink Floyd</small>
                    <input id="password-2" type="text" class="with-progress" />
                </label>
                <div id="password2-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
            </fieldset>
        </div>

        <div id="passwords-enough" class="hide pad">
            <p class="lead">Спасибо! Дальше? </p>
            <button id="go-5" class="button success">Дальше!</button>
        </div>
    </div>

    <div id="scene-6" class="hide scene">
        <h2>Текст побольше</h2>
        <p class="lead">
            Да, мне нужна большая статистическая база. <br />
            Я пойму, если тебе лень. Этот пункт необязателен, но ты очень-очень поможешь, если всё же не станешь пропускать.
        </p>

        <div class="row">
            <fieldset class="column small-6" style="">
                <label>
                    <textarea type="text" id="big-text" class="with-progress" style="resize: vertical; min-height: 200px;"></textarea>
                </label>
                <div id="big-text-progress" class="alert progress">
                    <div class="progress-meter" style="width: 0">
                    </div>
                </div>
            </fieldset>
            <div class="column small-1"></div>
            <blockquote id="big-text-exemplar" class="column small-5">
                <p>Он обладал еще одним достоинством &mdash; умением  правильно  рассчитывать
                время и расстояние. Делалось это, разумеется, совершенно бессознательно.
                Просто его никогда не подводило зрение, и весь его  организм,  слаженный
                лучше, чем у других собак,  работал  точно  и  быстро;  координация  сил
                умственных и физических была совершеннее, чем у  них.  Когда  зрительные
                нервы передавали мозгу Белого Клыка движущееся изображение, его мозг без
                всякого усилия определял пространство и  время,  необходимое  для  того,
                чтобы это движение завершилось. Таким  образом,  он  мог  увернуться  от
                прыжка собаки или от ее клыков и в то же время использовать  каждую  секунду, чтобы самому броситься на противника. Но воздавать ему  хвалу  за
                это не следует, - природа одарила его более щедро,  чем  других,  вот  и
                все.</p>
                <cite>Джек Лондон, "Белый Клык"</cite>
            </blockquote>
        </div>

        <div id="big-text-skip" class="pad">
            <button id="skip-6" class="button warning">Пропустить</button>
        </div>
        <div id="big-text-enough" class="hide pad">
            <p class="lead">Спасибо!!! </p>
            <button id="go-6" class="button success">Дальше</button>
        </div>
    </div>

    <div id="scene-7" class="hide scene">
        <h2>Спасибо!</h2>
        <p class="lead">
            Благодаря твоей помощи моё исследование пойдёт гораздо быстрее, и я правда это ценю.
        </p>
        <p>
            Если хочешь, можешь оставить какой-нибудь комментарий, что угодно, что я должен увидеть. Этот комментарий никогда не будет опубликован, если ты явно не напишешь, что это можно делать.
        </p>

        <div class="row">
            <fieldset class="column small-6" style="">
                <label>
                    <small>Твой почерк, впрочем, всё ещё записывается ;)</small>
                    <textarea type="text" id="comment" style="resize: vertical; min-height: 200px;"></textarea>
                </label>
            </fieldset>
        </div>

        <p>
            Когда ты нажмёшь на эту кнопку, все данные о том, как ты вводил текст попадут в мою базу данных. <br />
            Делая это, ты соглашаешься, что я могу использовать их в рамках этого и всех последующих исследований, распространять и публиковать в любой форме в обезличенном виде.
        </p>
        <button id="save-form" class="button success pad">Согласен, забирай</button>
    </div>

    <div id="scene-ok" class="hide scene">
        <h2>Спасибо!</h2>
        <p class="lead">Я всё сохранил, успех =^-^=</p>
        <p>Ты &mdash; просто чудо =3</p>

        <div class="media-object">
            <div class="media-object-section">
                <img src="/img/sweet.jpg" />
            </div>
        </div>
    </div>

    <div id="scene-error" class="hide scene">
        <h2>Ой-ой-ой!</h2>
        <p class="lead">Кажется, ты потерял соединение с моим сервером =С</p>
        <p>Не волнуйся, ничего не потерялось! Нажми на ссылку чуть ниже чтобы скачать файл со своими данными (соединение для этого не нужно), а когда сеть снова появится, отправь скачанный файл мне в личные сообщения на
            <a href="http://vk.com/alagunto" target="_blank">http://vk.com/alagunto</a> (откроется в новом окне). Прости, что такая морока ^^</p>
        <p><a id="data-to-send" href="data:application/octet-stream;charset=utf-16le;base64," target="_blank">Скачать файл с данными</a></p>
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

        .pad {
            margin-bottom: 20px;
        }

        blockquote#big-text-exemplar * {
            color: #000000 !important;
        }
    </style>
    <script src="/js/base64.min.js"></script>
    <script src="/js/nhtk.js"></script>
    <script src="/js/help-me.js"></script>
@endsection