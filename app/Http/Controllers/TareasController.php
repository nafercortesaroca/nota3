<?php

namespace App\Http\Controllers;

use App\Models\Tareas;
use Illuminate\Http\Request;

class TareasController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Tareas::all()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:150',
            'descripcion' => 'required|string',
            'fecha_entrega' => 'required|date',
            'estado' => 'required|string|max:30',
            'id_categoria' => 'required|integer',
            'id_materia' => 'required|integer',
            'id_usuario' => 'required|integer',
        ]);

        $tarea = Tareas::create($validated);

        return response()->json(['data' => $tarea], 201);
    }

    public function show(Tareas $tarea)
    {
        return response()->json(['data' => $tarea]);
    }

    public function update(Request $request, Tareas $tarea)
    {
        $validated = $request->validate([
            'titulo' => 'sometimes|string|max:150',
            'descripcion' => 'sometimes|string',
            'fecha_entrega' => 'sometimes|date',
            'estado' => 'sometimes|string|max:30',
            'id_categoria' => 'sometimes|integer',
            'id_materia' => 'sometimes|integer',
            'id_usuario' => 'sometimes|integer',
        ]);

        $tarea->update($validated);

        return response()->json(['data' => $tarea]);
    }

    public function destroy(Tareas $tarea)
    {
        $tarea->delete();

        return response()->json(null, 204);
    }
}