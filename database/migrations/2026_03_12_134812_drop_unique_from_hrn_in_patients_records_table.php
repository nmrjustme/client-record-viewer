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
        Schema::table('patients_records', function (Blueprint $table) {
            $table->dropForeign(['hrn_patients']);

            // Drop the unique index
            $table->dropUnique('patients_records_hrn_patients_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients_records', function (Blueprint $table) {
            //
        });
    }
};
