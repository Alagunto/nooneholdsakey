<?php namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed account
 */
class AuthtestUser extends Model {
    protected $fillable = ["account", "password", "login"];
    protected $hidden = ["id"];
    protected $table = "authtest_user";
    public $timestamps = false;
}