<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'colors';
    protected $hidden = ['pivot'];

    public function categories() {
        return $this->hasMany(Category::class);
    }
}
