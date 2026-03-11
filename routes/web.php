<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\patientsController;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/record-finder', [patientsController::class, 'index'])->name('patients.index');

require __DIR__.'/settings.php';
