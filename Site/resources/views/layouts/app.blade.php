<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Noone holds a key</title>
        <link rel="stylesheet" href="css/app.css">

        <script src="bower_components/jquery/dist/jquery.js"></script>
        <script src="bower_components/what-input/what-input.js"></script>
        <script src="bower_components/foundation-sites/dist/foundation.js"></script>
    </head>
    <body>
        <div class="title-bar" id="title-bar">
            <div class="title-bar-left">
                <span class="title-bar-title"><a href="/" style="color: white;" id="home-link">Noone holds a key</a></span>
            </div>
            <div class="title-bar-right">
                <small>НИУ Высшая Школа Экономики, Факультет компьютерных наук</small>
                <span style="padding-right: 50px; clear: both;"></span>
                <a href="http://vk.com/alagunto" target="_blank">Связаться со мной</a>
            </div>
        </div>
        <div class="top-bar" id="top-bar">
            <div>
                <div class="top-bar-left">
                    <ul class="dropdown menu" data-dropdown-menu>
                        <li><a href="/">Главная</a></li>
                        <li>
                            <a href="#">Инструменты</a>
                            <ul class="menu vertical">
                                <li><a href="/analysis">Анализ по фразе (в разработке)</a></li>
                            </ul>
                        </li>
                        <li><a href="/help-me">Анкета</a></li>
                    </ul>
                </div>
                <div class="top-bar-right"></div>
            </div>
        </div>

        <div class="column small-10 small-offset-1" style="margin-top: 12px;">
            @yield("content")
        </div>

        <script src="js/app.js"></script>
    </body>
</html>
