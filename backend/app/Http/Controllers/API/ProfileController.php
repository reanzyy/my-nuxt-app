<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return $this->sendSuccess($user, 'successfully load profile', 200);
    }

    function update(Request $request)
    {
        $request->validate([
            'name' => 'nullable',
            'email' => 'nullable|email',
            'password' => 'nullable|min:8',
            'old_password' => 'required_with:password',
        ]);

        $user = auth()->user();

        if ($request->has('password')) {
            if (!Hash::check($request->old_password, $user->password)) {
                return $this->sendError('Invalid old password');
            }

            $user->password = bcrypt($request->password);
        }

        $user->name = $request->name;
        $user->save();

        return $this->sendSuccess($user, 'successfully update profile');
    }
}
