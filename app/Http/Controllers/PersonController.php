<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    public function index()
    {
        $persons = Person::all();

        if ($persons->isEmpty()) {
            return response()->json([
                'message' => 'No hay personas registradas',
                'status' => 200
            ], 200);
        }

        return response()->json($persons, 200);
    }
    public function indexpagination(Request $request)
{
    // Obtener el número de registros por página, o por defecto 5
    $perPage = $request->get('perPage', 5);

    // Obtener las personas paginadas
    $persons = Person::paginate($perPage);

    // Devolver la respuesta en formato JSON (esto es importante para el frontend)
    return response()->json($persons);
}


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:person,email',
            'cell_phone' => 'required|string|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $person = Person::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'cell_phone' => $request->cell_phone
        ]);

        return response()->json([
            'message' => 'Persona creada exitosamente',
            'person' => $person,
            'status' => 201
        ], 201);
    }

    public function show($id)
    {
        $person = Person::find($id);

        if (!$person) {
            return response()->json([
                'message' => 'Persona no encontrada',
                'status' => 404
            ], 404);
        }

        return response()->json([
            'person' => $person,
            'status' => 200
        ], 200);
    }

    public function destroy($id)
    {
        $person = Person::find($id);

        if (!$person) {
            return response()->json([
                'message' => 'Persona no encontrada',
                'status' => 404
            ], 404);
        }

        $person->delete();

        return response()->json([
            'message' => 'Persona eliminada',
            'status' => 200
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $person = Person::find($id);

        if (!$person) {
            return response()->json([
                'message' => 'Persona no encontrada',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:person,email,' . $id,
            'cell_phone' => 'required|string|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $person->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'cell_phone' => $request->cell_phone
        ]);

        return response()->json([
            'message' => 'Persona actualizada',
            'person' => $person,
            'status' => 200
        ], 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $person = Person::find($id);

        if (!$person) {
            return response()->json([
                'message' => 'Persona no encontrada',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:person,email,' . $id,
            'cell_phone' => 'sometimes|string|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $person->update($request->only(['first_name', 'last_name', 'email', 'cell_phone']));

        return response()->json([
            'message' => 'Persona actualizada parcialmente',
            'person' => $person,
            'status' => 200
        ], 200);
    }
}
