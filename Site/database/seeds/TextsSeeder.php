<?php

use App\Text;
use Illuminate\Database\Seeder;

class TextsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Text::truncate();
        Text::create([
            "text" => "I'm so happy, cause today I've found my friends. They're in my head, I'm so ugly, that's ok, cause so are you.",
            "cite" => "Kurt Cobain, Nirvana",
            "size" => "sentence"
        ]);
        Text::create([
            "text" => "One for the trouble,
                two for the bass,
                three to get ready,
                let's rock this place!",
            "cite" => "Limp Bizkit",
            "size" => "sentence"
        ]);
        Text::create([
            "text" =>
                "Прочь из моей головы!
                Наугад в темноту, c середины концерта.
                Сквозь толпу, сквозь охрану, сквозь двери, сквозь парк,
                чтоб чуть-чуть постоять над водой на мосту",
            "cite" => "Сплин \"Прочь из моей головы\"",
            "size" => "sentence"
        ]);
        Text::create([
            "text" =>
                "Теряясь в ночной тишине среди книжных изданий,
                походкой болезненно шаткой к окну подхожу.
                Сквозь контуры новорожденных космических зданий
                на глупую злую луну как волчонок гляжу",
            "cite" => "Маша Badda Boo \"Луна\"",
            "size" => "sentence"
        ]);

        Text::create([
            "text" =>
                "Будешь есть оливку или нет?
                 Лейн мельком взглянул на свой бокал мартини, потом на Фрэнни.
                 - Нет, - холодно сказал он. - Хочешь съесть?
                 - Если  ты  не  будешь,  -  сказала Фрэнни. По выражению лица Лейна она
                    поняла,  что  спросила  невпопад.  И что еще хуже, ей совершенно не хотелось
                    есть оливку, и она сама удивилась - зачем  она  ее попросила. Но делать было
                    нечего:  Лейн  протянул  бокал,  и  пришлось  выловить  оливку и съесть ее с
                    показным  удовольствием.  Потом она взяла сигарету из пачки Лейна, он дал ей
                    прикурить и закурил сам.",
            "cite" => "J.D. Salinger \"Franny\"",
            "size" => "text"
        ]);
    }
}
