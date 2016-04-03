<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Text extends Model {
    protected $fillable = ["text", "cite", "size"];
    protected $hidden = ["id"];
    public $timestamps = false;
}