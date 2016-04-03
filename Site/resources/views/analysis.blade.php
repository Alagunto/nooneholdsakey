@extends("layouts.app")

<?php $phrase = \App\Services\TextsService::RandomPhrase(); ?>

@section("content")
    <h2>Базовый анализ по фразе</h2>
    <div class="row column small-8 small-offset-2">
        <p class="lead text-center">Ваш почерк будет проанализирован, пока вы печатаете в это поле</p>
    </div>
    <div class="row column small-8 small-offset-2">
        <label>
            <input type="text" class="expand" style="width: 100%" id="input" />
        </label>
    </div>
    <div class="row column small-8 small-offset-2">
        <h5 class="subheader text-center expand">Пример фразы</h5>
        <blockquote>
            {{ $phrase->text }}
            <cite>{{ $phrase->cite }}</cite>
        </blockquote>
    </div>

    <script type="text/javascript" src="/js/nhtk.js"></script>
    <script>
        var reader = new NHAKReader({
            query: "#input",
            size: "sentence"
        });
        reader.setObserver({
            newEvent: function(event) {
                console.log(event.retention);
            },
            readinessChanged: function(readiness) {
                console.log(readiness);
            },
            ready: function(data) {
                console.log(data);
            }
        });
    </script>
@endsection