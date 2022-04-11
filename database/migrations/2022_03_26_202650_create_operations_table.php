<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operations', function (Blueprint $table) {
            $table->id();
            // $table->string('description', 40)->fulltext();
            $table->string('description', 40);
            $table->string('amount', 20);
            $table->dateTime('time');
            $table->foreignId('account_id')->constrained("accounts");
            $table->foreignId('category_id')->constrained("categories");
            $table->foreignId('user_id')->constrained("users");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('operations');
    }
};
