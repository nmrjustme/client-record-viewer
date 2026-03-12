<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class patientsRecord extends Model
{
    protected $table = 'patients_records';

    protected $fillable = [
        'hrn_patients',
        'file_name'
    ];

    public function patients()
    {
        return $this->BelongsTo(patients::class, 'hrn_patients', 'hrn');
    }
}
