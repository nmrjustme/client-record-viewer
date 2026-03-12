<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class patientsRecord extends Model
{
    protected $table = 'patients_records';

    protected $fillable = [
        'hrn_patients',
        'file_name'
    ];

    public function patient()
    {
        return $this->belongsTo(patientsRecord::class);
    }
}
