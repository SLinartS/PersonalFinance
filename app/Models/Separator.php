<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Separator extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'separators';
    protected $hidden = ['pivot'];

    public function options() {
        return $this->hasMany(Option::class);
    }
}
