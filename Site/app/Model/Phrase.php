<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Phrase extends Model {
    protected $fillable = ["text", "cite"];
    protected $hidden = ["id"];
    public $timestamps = false;
}