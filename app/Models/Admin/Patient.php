<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = ['hrn', 'lastname', 'firstname', 'middlename'];

    // Add this method
    public function records()
    {
        return $this->hasMany(Record::class); // make sure Record model exists
    }
}
