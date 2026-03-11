<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients_records', function (Blueprint $table) {
            $table->id();
            $table->string('hrn_patients', 50)->unique();
            $table->string('file_name');
            $table->timestamps();

            $table->foreign('hrn_patients')->references('hrn')->on('patients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients_records');
    }
};
