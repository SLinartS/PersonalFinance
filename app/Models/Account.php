<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'accounts';
    protected $hidden = ['pivot'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
