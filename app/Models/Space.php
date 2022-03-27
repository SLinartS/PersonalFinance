<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'spaces';

    public function options() {
        return $this->hasMany(Option::class);
    }
}
