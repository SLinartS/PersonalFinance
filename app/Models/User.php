<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'users';
    protected $hidden = ['pivot'];

    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function debts()
    {
        return $this->hasMany(Debt::class);
    }

    public function savings()
    {
        return $this->hasMany(Saving::class);
    }

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }

    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }

    public function options()
    {
        return $this->hasOne(Option::class);
    }
    
    public function category()
    {
        return $this->belongsToMany(Category::class, "users_categories");
    }
}
