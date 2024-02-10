<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();

        if ($students->isEmpty()) {
            return response()->json([
                'status' => 404,
                'message' => 'No students found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'students' => $students
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'course' => 'required',
            'email' => 'required|email|unique:students',
            'phone' => 'required|digits:10'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Invalid data',
                'errors' => $validator->messages()
            ], 422);
        }

        $student = Student::create([
            'name' => $request->name,
            'course' => $request->course,
            'email' => $request->email,
            'phone' => $request->phone
        ]);

        if ($student) {
            return response()->json([
                'status' => 201,
                'message' => 'Student created successfully',
                'student' => $student
            ], 201);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 404,
                'message' => 'Student not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'student' => $student
        ], 200);
    }

    public function edit($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 404,
                'message' => 'Student not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'student' => $student->makeHidden(['created_at', 'updated_at'])
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 404,
                'message' => 'Student not found'
            ], 404);
        }

        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'course' => 'required',
            'email' => 'required|email|unique:students,email,' . $id,
            'phone' => 'required|digits:10'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Invalid data',
                'errors' => $validator->messages()
            ], 422);
        }

        $student = $student->update([
            'name' => $request->name,
            'course' => $request->course,
            'email' => $request->email,
            'phone' => $request->phone
        ]);

        if ($student) {
            return response()->json([
                'status' => 200,
                'message' => 'Student updated successfully',
                'student' => $student
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 404,
                'message' => 'Student not found'
            ], 404);
        }

        $student = $student->delete();

        if ($student) {
            return response()->json([
                'status' => 200,
                'message' => 'Student deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }
}


