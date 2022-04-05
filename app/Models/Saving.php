<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saving extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'savings';
    protected $hidden = ['pivot'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
