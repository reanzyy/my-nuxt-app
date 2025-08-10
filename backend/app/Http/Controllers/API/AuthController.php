<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email|unique:users,email',
                'name' => 'required',
                'password' => 'required|confirmed|min:8'
            ]
        );

        $user = new User();
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = bcrypt($request->password);
        $user->save();

        Auth::login($user);
        $token = $user->createToken('app')->plainTextToken;

        return $this->sendSuccess([
            'token' => $token,
        ], 'authenticated successfully');
    }

    public function login(Request $request)
    {

        $request->validate(
            [
                'email' => 'required|email',
                'password' => 'required'
            ]
        );

        $attemt = Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ]);

        if (!$attemt) {
            return $this->sendError('Invalid email and password');
        }

        $user = Auth::user();
        $token = $user->createToken('app')->plainTextToken;

        return $this->sendSuccess([
            'token' => $token,
        ], 'authenticated successfully');
    }

    function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        $user = auth()->user();
        $user->save();

        return $this->sendSuccess(null, 'logout successfully');
    }
}
