<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'currencies';
    protected $hidden = ['pivot'];

    public function options() {
        return $this->hasMany(Option::class);
    }
}
