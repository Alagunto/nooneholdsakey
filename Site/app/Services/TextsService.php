<?php namespace App\Services;

use App\Text;

class TextsService {
    public static function RandomPhrase() {
        return Text::where('size', 'sentence')->orderByRaw("RAND()")->take(1)->first();
    }
}

