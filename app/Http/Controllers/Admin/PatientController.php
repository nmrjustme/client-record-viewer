<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\patients;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Fetch all patients with count of related records
        $patients = patients::withCount('records')->orderBy('lastname')->get();

        // Return to Inertia page
        return inertia('admin/PatientPage', [
            'patients' => $patients->map(fn($p) => [
                'id' => $p->id,
                'hrn' => $p->hrn,
                'firstname' => $p->firstname,
                'middlename' => $p->middlename,
                'lastname' => $p->lastname,
                'records_count' => $p->records_count ?? 0,
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'hrn' => 'required|numeric|digits_between:1,15|unique:patients,hrn',
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
        ]);

        patients::create([
            'hrn' => $request->hrn,
            'lastname' => $request->lastname,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
        ]);

        return redirect()->back()->with('success', 'Patient added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(patients $patient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(patients $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, patients $patient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(patients $patient)
    {
        //
    }
}
