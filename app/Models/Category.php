<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'categories';

    public function operations() {
        return $this->hasMany(Operation::class);
    }

    public function budgets() {
        return $this->hasMany(Budget::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function users() {
        return $this->belongsToMany(User::class, "user_category");
    }
}
