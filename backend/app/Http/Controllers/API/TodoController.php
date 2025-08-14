<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{

    public function index(Request $request)
    {
        $query = Todo::where('user_id', Auth::id());

        if ($request->boolean('isdone')) {
            $query->where('is_done', true);
        }

        if ($request->has('id')) {
            $query->where('id', $request->id);
        }

        $todos = $query->latest()->get();

        return $this->sendSuccess($todos, 'successfully load data', 200);
    }


    public function store(Request $request)
    {
        $request->validate([
            'todo' => 'required'
        ]);

        $todo = new Todo();
        $todo->user_id = Auth::id();
        $todo->todo = $request->todo;
        $todo->is_done = false;
        $todo->save();

        return $this->sendSuccess($todo, 'successfully create data', 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $this->sendError('data not found', 404);
        }

        $request->validate([
            'todo' => 'required'
        ]);

        $todo->todo = $request->todo;
        $todo->save();

        return $this->sendSuccess($todo, 'successfully update data', 200);
    }

    public function destroy($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $this->sendError('data not found', 404);
        }

        $todo->delete();

        return $this->sendSuccess($todo, 'successfully delete data', 200);
    }

    public function isDone($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $this->sendError('data not found', 404);
        }

        $todo->is_done = !$todo->is_done;
        $todo->save();

        return $this->sendSuccess($todo, 'successfully checked data', 200);
    }
}
