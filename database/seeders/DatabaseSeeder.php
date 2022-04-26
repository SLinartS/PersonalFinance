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
            'name' => 'unaccounted',
            'email' => "unaccounted" . '@gmail.com',
            'password' => 'Str::random(20)',
            'avatar_url' => 'unaccounted'
        ]);

        DB::table('users')->insert([
            'name' => 'Евгений',
            'email' => 't@mail.ru',
            'password' => "\$2y\$10\$enL6ffOcNFMcskSS2N8P2uJFAxa1v42V0k6eRPb2VzXrhQGEOZTZy",
            'avatar_url' => 'link1'
        ]);

        //----------------------------------------------------------------------------------------------------------------------

        DB::table('currencies')->insert([
            'value' => '₽',
        ]);
        DB::table('currencies')->insert([
            'value' => '$',
        ]);
        DB::table('currencies')->insert([
            'value' => '€',
        ]);


        DB::table('separators')->insert([
            'value' => '.',
        ]);
        DB::table('separators')->insert([
            'value' => ',',
        ]);


        DB::table('spaces')->insert([
            'value' => 'Пробел',
        ]);
        DB::table('spaces')->insert([
            'value' => 'Нет',
        ]);
        DB::table('spaces')->insert([
            'value' => 'Слэш',
        ]);

        DB::table('options')->insert([
            'user_id' => 2,
            'currency_id' => 1,
            'space_id' => 1,
            'separator_id' => 1,
        ]);

        //----------------------------------------------------------------------------------------------------------------------

        DB::table('accounts')->insert([
            'title' => 'Наличные',
            'type' => 'account',
            'user_id' => 2,
        ]);
        DB::table('accounts')->insert([
            'title' => 'Карта ВТБ',
            'type' => 'account',
            'user_id' => 2,
        ]);
        DB::table('accounts')->insert([
            'title' => 'Карта Альфа Банк',
            'type' => 'account',
            'user_id' => 2,
        ]);

        DB::table('accounts')->insert([
            'title' => 'Кредит',
            'type' => 'debt',
            'user_id' => 2,
        ]);
        DB::table('accounts')->insert([
            'title' => 'Долг Андрею',
            'type' => 'debt',
            'user_id' => 2,
        ]);

        //----------------------------------------------------------------------------------------------------------------------

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
        DB::table('colors')->insert([
            'title' => 'CategoryGray',
            'value' => '#aaaaaa',
        ]);

        //----------------------------------------------------------------------------------------------------------------------

        DB::table('categories')->insert([
            'type' => 'income',
            'title' => 'Неизв. пополнения',
            'img_url' => 'assets/files/images/question-solid.svg',
            'color_id' => 13,
        ]);

        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Неизв. расходы',
            'img_url' => 'assets/files/images/question-solid.svg',
            'color_id' => 13,
        ]);

        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Транспорт',
            'img_url' => 'assets/files/images/categories/bus.svg',
            'color_id' => 1,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Продукты',
            'img_url' => 'assets/files/images/categories/cart.svg',
            'color_id' => 2,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Подарки',
            'img_url' => 'assets/files/images/categories/gift.svg',
            'color_id' => 3,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Здоровье',
            'img_url' => 'assets/files/images/categories/medkit.svg',
            'color_id' => 4,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Квартира и дом',
            'img_url' => 'assets/files/images/categories/home.svg',
            'color_id' => 5,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Одежда',
            'img_url' => 'assets/files/images/categories/shirt.svg',
            'color_id' => 6,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Вредные привычки',
            'img_url' => 'assets/files/images/categories/smoking.svg',
            'color_id' => 7,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Животные',
            'img_url' => 'assets/files/images/categories/cat.svg',
            'color_id' => 8,
        ]);
        DB::table('categories')->insert([
            'type' => 'expenses',
            'title' => 'Дети',
            'img_url' => 'assets/files/images/categories/children.svg',
            'color_id' => 9,
        ]);
        DB::table('categories')->insert([
            'type' => 'income',
            'title' => 'Зарплата',
            'img_url' => 'assets/files/images/categories/money.svg',
            'color_id' => 10,
        ]);
        DB::table('categories')->insert([
            'type' => 'income',
            'title' => 'Подарок',
            'img_url' => 'assets/files/images/categories/gift.svg',
            'color_id' => 11,
        ]);

        //----------------------------------------------------------------------------------------------------------------------

        DB::table('operations')->insert([
            'description' => 'Зарплата',
            'amount' => "10000",
            'time' => "2022-04-01 01:00:00",
            "account_id" => 3,
            "category_id" => 12,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Подарили на работе',
            'amount' => "1000",
            'time' => "2022-04-01 01:00:00",
            "account_id" => 1,
            "category_id" => 13,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Подарок от друга',
            'amount' => "500",
            'time' => "2022-04-01 06:00:00",
            "account_id" => 2,
            "category_id" => 13,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Корм коту',
            'amount' => "700",
            'time' => "2022-04-03 12:00:00",
            "account_id" => 3,
            "category_id" => 10,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Такси до дома',
            'amount' => "500",
            'time' => "2022-04-03 12:00:00",
            "account_id" => 3,
            "category_id" => 3,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Еда домой',
            'amount' => "2000",
            'time' => "2022-04-10 06:25:00",
            "account_id" => 4,
            "category_id" => 4,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Поел в столовой',
            'amount' => "300",
            'time' => "2022-04-023 21:30:00",
            "account_id" => 1,
            "category_id" => 4,
            "user_id" => 2,
        ]);
        DB::table('operations')->insert([
            'description' => 'Купил попить',
            'amount' => "50",
            'time' => "2022-04-24 15:00:00",
            "account_id" => 2,
            "category_id" => 4,
            "user_id" => 2,
        ]);

        //----------------------------------------------------------------------------------------------------------------------
        DB::table('users_categories')->insert([
            "category_id" => 1,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 2,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 3,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 4,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 5,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 6,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 7,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 8,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 9,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 10,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 11,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 12,
            "user_id" => 2,
        ]);
        DB::table('users_categories')->insert([
            "category_id" => 13,
            "user_id" => 2,
        ]);
    }
}
