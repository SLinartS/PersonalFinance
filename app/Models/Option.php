<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'options';
    protected $hidden = ['pivot'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function space()
    {
        return $this->belongsTo(Space::class);
    }

    public function separator()
    {
        return $this->belongsTo(Separator::class);
    }
}
