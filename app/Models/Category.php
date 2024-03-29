<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'categories';
    protected $hidden = ['pivot'];

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }

    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function user()
    {
        return $this->belongsToMany(User::class, "users_categories");
    }
}
