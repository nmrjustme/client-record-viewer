<?php

use App\Http\Controllers\Admin\PatientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\patientsController;
use Laravel\Fortify\Features;

// Home page
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// All routes for authenticated + verified users
Route::middleware(['auth', 'verified'])->group(function () {

    // -------------------- Dashboard for all logged-in users --------------------
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // -------------------- Admin + Viewer --------------------
    Route::middleware('role:admin,viewer')->group(function () {
        Route::get('/record_finder', [patientsController::class, 'index'])
            ->name('patients.index');
    });

    // -------------------- Admin only --------------------
    Route::middleware('role:admin')->group(function () {
        // Patient Page
        Route::inertia('patient', 'admin/PatientPage')->name('patient');

        // CRUD routes
        Route::get('/patient', [PatientController::class, 'index'])->name('patient');
        Route::post('/patient', [PatientController::class, 'store'])->name('patient.store');
    });

    // -------------------- Staff only --------------------
    Route::middleware('role:staff')->group(function () {
        Route::inertia('staff', 'staff/StaffPage')->name('staff');
    });
});

Route::prefix('/viewer')->name('patients.')->group(function () {
    Route::get('/record-finder', [patientsController::class, 'index']);
    Route::get('/{hrn}/folder', [patientsController::class, 'getFiles']);
});


require __DIR__.'/settings.php';
