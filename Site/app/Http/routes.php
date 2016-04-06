<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
use Illuminate\Http\Request;

Route::group(['middleware' => ['web']], function () {
    Route::get('/', function() {
        return view('index');
    });

    Route::get('/analysis', function() {
        return view('analysis');
    });

    Route::get('/help-me', function() {
        return view('help-me');
    });

    Route::post("/store/help-form", function(Request $request) {
        $data = $request->input("data");
        if(strlen($data) > 0) {
            Storage::disk('local')->put("" . \Carbon\Carbon::now() . '_' . mt_rand(1, 100000), $data);
            Log::info("New form from " . $_SERVER['REMOTE_ADDR']);
            return array("code" => "ok");
        } else {
            abort(400);
            return "";
        }
    });
});
