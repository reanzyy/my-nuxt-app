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
        $query = Todo::query();

        if ($request->has('isdone')) {
            $query->where('is_done', '!=', false);
        }

        $todos = $query->get();

        // $grouped = $todos->groupBy(function ($item) {
        //     $createdDate = Carbon::parse($item->created_at);
        //     $today = Carbon::today();
        //     $yesterday = Carbon::yesterday();

        //     if ($createdDate->isSameDay($today)) {
        //         return 'Today';
        //     } elseif ($createdDate->isSameDay($yesterday)) {
        //         return 'Yesterday';
        //     } elseif ($createdDate->weekOfYear == $today->weekOfYear) {
        //         return $createdDate->format('l');
        //     } else {
        //         return $createdDate->format('d F Y');
        //     }
        // });

        // $data = $grouped->all();

        return $this->sendSuccess($todos, 'successfully load data', 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'todo' => 'required'
        ]);

        $todo = new Todo();
        $todo->user_id = null;
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

        $todo->is_done = true;
        $todo->save();

        return $this->sendSuccess($todo, 'successfully checked data', 200);
    }
}
