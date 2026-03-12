    <?php

    use App\Http\Controllers\Admin\PatientController;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\patientsController;
    use Laravel\Fortify\Features;

    Route::inertia('/', 'welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ])->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {

        // Everyone logged in can access dashboard
        Route::inertia('dashboard', 'dashboard')->name('dashboard');

        // ======================== Admin only ==============================
        Route::middleware('role:admin')->group(function () {
            Route::inertia('patient', 'admin/PatientPage')->name('patient');

                // CRUD
                // List/Search patients
                Route::get('/patient', [PatientController::class, 'index'])->name('patient');

                // Add new patient
                Route::post('/patient', [PatientController::class, 'store'])->name('patient.store');
        });

        // Staff only
        Route::middleware('role:staff')->group(function () {
            Route::inertia('staff', 'staff/StaffPage')->name('staff');
        });

        // Viewer only
        Route::middleware('role:viewer')->group(function () {

            Route::get('/record-finder', [patientsController::class, 'index'])->name('patients.index');
        });

        // Route::inertia('patient', 'admin/PatientPage')->name('patient');
    });


    require __DIR__.'/settings.php';
