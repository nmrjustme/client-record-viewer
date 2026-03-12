<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = ['patient_id', 'file_name', 'file_path']; // adjust fields as needed

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
