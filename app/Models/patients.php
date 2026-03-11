<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class patients extends Model
{
    protected $table = 'patients';
    protected $fillable = [
        'hrn', 'firstname', 'middlename', 'lastname'
    ];

    public function records() {
        return $this->hasMany(patientsRecord::class, 'hrn_patients', 'hrn');
    }
}
