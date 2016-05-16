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
use GuzzleHttp\Client;

function sendWritings($user, $events, $client) {

}

Route::group(['middleware' => ['web']], function () {
    Route::get('/', function() {
        return view('index');
    });

    Route::get('/auth-test', function() {
        return view('auth-test');
    });

    Route::get('/auth-test/isRunning', function() {
        try {
            $data = file_get_contents(config("nhak.auth-test.host") . "/status");
        } catch(Exception $ex) {
            return response(["data" => ["running" => false]], 200)->header("Content-Type", "application/json");
        }
        $ans = [];
        $ans["log"] = [
            array("request", "GET", "/status"),
            array("response", "/status", "200", $data)
        ];
        $ans["requests"] = ["/status"];
        $ans["responses"] = [json_decode($data)];
        $ans["data"] = json_decode($data);
        return response($ans, 200);
    });

    Route::post('/auth-test/register', function(Request $request) {
        if(Validator::make($request->all(), [
            "login" => "required|max:255|min:1|unique:authtest_user",
            "password" => "required"
        ])->invalid()) return response("Login already exists", 400);

        $login = $request->input('login');
        $password = $request->input('password');

        $log = [];

        $client = new Client([
            'base_uri' => config("nhak.auth-test.host"),
            'timeout'  => 2.0,
            'exceptions' => false
        ]);

        // POST /accounts
        $response = $client->request("POST", "/accounts", ["form_params" => [
            "operator_token" => config("nhak.auth-test.operator_id"),
            "password" => $password
        ]]);

        $log[] = array("request", "POST", "/accounts", json_encode([
            "operator_token" => config("nhak.auth-test.operator_id"),
            "password" => $password
        ]));

        $id = $response->getBody()->getContents();
        $log[] = array("response", "/accounts/", $response->getStatusCode(), $id);

        $user = \App\AuthtestUser::create(["login" => $login, "password" => $password, "account" => $id]);

        try {
            $events1 = json_decode($request->input("events1"));
            $events2 = json_decode($request->input("events2"));
        } catch (Exception $ex) {
            return response("", 400);
        }

        // POST /accounts/writings
        $events = [];
        foreach($events1 as $k => $v) {
            $events[] = array("key" => $v->key, "ts_up" => $v->up_time, "ts_down" => $v->down_time);
        }

        $response = $client->request("POST", "/accounts/writings", ["form_params" => [
            "operator_token" => config("nhak.auth-test.operator_id"),
            "account_token" => $user->account,
            "events" => json_encode($events)
        ]]);

        $log[] = array("request", "POST", "/accounts/writings", json_encode([
            "operator_token" => config("nhak.auth-test.operator_id"),
            "account_token" => $user->account,
            "events" => json_encode($events)
        ]));

        $log[] = array("response", "/accounts/writings", $response->getStatusCode(), ($response->getBody()->getContents()));

        //POST /accounts/writings
        $events = [];
        foreach($events2 as $k => $v) {
            $events[] = array("key" => $v->key, "ts_up" => $v->up_time, "ts_down" => $v->down_time);
        }

        $response = $client->request("POST", "/accounts/writings", ["form_params" => [
            "operator_token" => config("nhak.auth-test.operator_id"),
            "account_token" => $user->account,
            "events" => json_encode($events)
        ]]);

        $log[] = array("request", "POST", "/accounts/writings", json_encode([
            "operator_token" => config("nhak.auth-test.operator_id"),
            "account_token" => $user->account,
            "events" => json_encode($events)
        ]));

        $log[] = array("response", "/accounts/writings", $response->getStatusCode(), ($response->getBody()->getContents()));

        return response([
            "log" => $log,
            "account_id" => $user->account,
            "success" => true
        ]);
    });

    Route::post("/auth-test/enter", function(Request $request) {
        if(Validator::make($request->all(), [
            "login" => "required|max:255|min:1",
            "password" => "required",
            "events" => "required"
        ])->invalid()) return response("Login already exists", 400);

        $user = \App\AuthtestUser::where("login", $request->input("login"))->get();
        if(count($user) == 0)
            return response("Invalid credentials", 403);
        if($user[0]->password != $request->input("password"))
            return response("Invalid credentials", 403);
        $user = $user[0];

        $client = new Client([
            'base_uri' => config("nhak.auth-test.host"),
            'timeout'  => 2.0,
            'exceptions' => false
        ]);
        $log = [];

        $events = [];
        foreach(json_decode($request->input("events")) as $k => $v) {
            $events[] = array("key" => $v->key, "ts_up" => $v->up_time, "ts_down" => $v->down_time);
        }

        // POST /accounts/writings
        $response = $client->request("POST", "/accounts/writings", ["form_params" => [
            "operator_token" => config("nhak.auth-test.operator_id"),
            "account_token" => $user->account,
            "events" => json_encode($events)
        ]]);

        $log[] = array("request", "POST", "/accounts/writings", json_encode([
            "operator_token" => config("nhak.auth-test.operator_id"),
            "account_token" => $user->account,
            "events" => json_encode($events)
        ]));

        $ans = $response->getBody()->getContents();
        $log[] = array("response", "/accounts/", $response->getStatusCode(), $ans);
        if($response->getStatusCode() == 400) {
            return response([
                "log" => $log,
                "success" => false,
                "scary" => 1
            ]);
        }
        return response([
            "log" => $log,
            "scary" => json_decode($ans)->scary,
            "success" => true
        ]);
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
