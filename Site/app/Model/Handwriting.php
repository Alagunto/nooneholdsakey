<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Handwriting extends Model {
    protected $fillable = ["author", "comment", "events"];
    protected $hidden = ["id"];
    public $timestamps = false;
}