<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Андрей',
            'email' => Str::random(10) . '@gmail.com',
//            'password' => Hash::make('password'),
            'password' => 'qwerty',
            'avatar_url' => 'link1'
        ]);
        DB::table('users')->insert([
            'name' => 'Маша',
            'email' => Str::random(10) . '@mail.com',
            'password' => 'ytrewq',
            'avatar_url' => 'link2'
        ]);

//----------------------------------------------------------------------------------------------------------------------

        DB::table('accounts')->insert([
            'title' => 'Наличные',
            'amount' => '194.5',
            'user_id' => 1,
        ]);
        DB::table('accounts')->insert([
            'title' => 'Карта ВТБ',
            'amount' => '0',
            'user_id' => 1,
        ]);
        DB::table('accounts')->insert([
            'title' => 'Карта Альфа Банк',
            'amount' => '76.05',
            'user_id' => 1,
        ]);

//----------------------------------------------------------------------------------------------------------------------

        DB::table('debts')->insert([
            'title' => 'Кредит',
            'amount' => '197494.72',
            'user_id' => 1,
        ]);
        DB::table('debts')->insert([
            'title' => 'Долг Андрею',
            'amount' => '1000',
            'user_id' => 1,
        ]);

//----------------------------------------------------------------------------------------------------------------------

//        DB::table('colors')->insert([
//            'title' => 'mainBlue',
//            'value' => '#007C8D',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'mainYellow',
//            'value' => '#DFAD00',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'mainGreen',
//            'value' => '#00C064',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'mainRed',
//            'value' => '#DB4437',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'mainWhite',
//            'value' => '#F8F8F8',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'secondWhite',
//            'value' => '#EFEFEF',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'mainBlack',
//            'value' => '#222222',
//        ]);
//        DB::table('colors')->insert([
//            'title' => 'mainGray',
//            'value' => '#E1E1E1',
//        ]);

        DB::table('colors')->insert([
            'title' => 'CategoryBlue',
            'value' => '#4285F4',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryPink',
            'value' => '#F06292',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryYellow',
            'value' => '#E5CF00',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryGreen',
            'value' => '#00BF4D',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryOrange',
            'value' => '#FF8058',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryTurquoise',
            'value' => '#00ACC1',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryRed',
            'value' => '#DB4437',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryLightGreen',
            'value' => '#8BCC00',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryViolet',
            'value' => '#AB47BC',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryDarkOrange',
            'value' => '#C58000',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryLightTurquoise',
            'value' => '#5FDAB3',
        ]);
        DB::table('colors')->insert([
            'title' => 'CategoryDarkGreen',
            'value' => '#14721F',
        ]);

        //----------------------------------------------------------------------------------------------------------------------

        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Транспорт',
            'color_id' => 1,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Продукты',
            'color_id' => 2,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Подарки',
            'color_id' => 3,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Здоровье',
            'color_id' => 4,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Квартира и дом',
            'color_id' => 5,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Одежда',
            'color_id' => 6,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Вредные привычки',
            'color_id' => 7,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Животные',
            'color_id' => 8,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Дети',
            'color_id' => 9,
        ]);
        DB::table('categories')->insert([
            'type' => 'income',
            'title' => 'Зарплата',
            'color_id' => 10,
        ]);
        DB::table('categories')->insert([
            'type' => 'income',
            'title' => 'Подарок',
            'color_id' => 11,
        ]);

//----------------------------------------------------------------------------------------------------------------------

        DB::table('operations')->insert([
            'description' => 'тестовая операция зачисления 1',
            'amount' => "10000",
            'time' => "2022-03-29 00:00:00",
            "category_id" => 10,
            "user_id" => 1,

        ]);
        DB::table('operations')->insert([
            'description' => 'тестовая операция зачисления 2',
            'amount' => "500",
            'time' => "2022-03-28 00:00:00",
            "category_id" => 11,
            "user_id" => 1,
        ]);
        DB::table('operations')->insert([
            'description' => 'тестовая операция расхода 1',
            'amount' => "300",
            'time' => "2022-01-27 00:00:00",
            "category_id" => 1,
            "user_id" => 1,
        ]);
        DB::table('operations')->insert([
            'description' => 'тестовая операция расхода 2',
            'amount' => "8000",
            'time' => "2022-01-27 01:00:00",
            "category_id" => 2,
            "user_id" => 1,
        ]);
        DB::table('operations')->insert([
            'description' => 'тестовая операция расхода 3',
            'amount' => "8000",
            'time' => "2021-04-29 06:00:00",
            "category_id" => 2,
            "user_id" => 1,
        ]);
        DB::table('operations')->insert([
            'description' => 'тестовая операция расхода 4',
            'amount' => "8000",
            'time' => "2021-04-29 00:00:00",
            "category_id" => 2,
            "user_id" => 1,
        ]);

    }
}
