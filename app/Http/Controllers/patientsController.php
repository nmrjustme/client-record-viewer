<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\patients;
use App\Models\patientsRecord;

class patientsController extends Controller
{
    public function index(Request $request)
    {
        $query = patients::withCount('records');

        $query->when($request->first, fn($q, $v) => $q->where('firstname', 'like', "%$v%"))
            ->when($request->last, fn($q, $v) => $q->where('lastname', 'like', "%$v%"))
            ->when($request->mid, fn($q, $v) => $q->where('middlename', 'like', "%$v%"))
            ->when($request->hrn, fn($q, $v) => $q->where('hrn', 'like', "%$v%"));

        return Inertia::render('clientsList', [
            // Ensuring an empty array is sent if no data exists to prevent .map() errors
            'patients' => $query->latest()->get() ?? [],
            'filters' => $request->only(['first', 'last', 'mid', 'hrn']),
        ]);
    }

    public function getFiles($hrn)
    {
        $files = patients::with(['records' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])
        ->where('hrn', $hrn)
        ->firstorFail();

        return Inertia::render('PatientFolder', [
            'patient' => $files
        ]);
    }
}
