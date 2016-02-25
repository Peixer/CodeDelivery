<?php

use Illuminate\Database\Seeder;

class UserTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(CodeDelivery\Models\User::class, 10)->create()->each(function ($u) {
            $u->client()->save(factory(CodeDelivery\Models\Client::class)->make());
        });


        factory(CodeDelivery\Models\User::class)->create([
            'name' => "gjpeixer",
            'email' => "gjpeixer@codeDelivery.com",
            'password' => bcrypt(123),
            'remember_token' => str_random(10),
        ])->client()->save(factory(\CodeDelivery\Models\Client::class)->make());


        factory(CodeDelivery\Models\User::class)->create([
            'name' => "admin",
            'email' => "admin@codeDelivery.com",
            'password' => bcrypt(123),
            'role' => "admin",
            'remember_token' => str_random(10),
        ])->client()->save(factory(\CodeDelivery\Models\Client::class)->make());


        factory(CodeDelivery\Models\User::class, 3)->create([
            'role' => "delivery"
        ]);
    }
}
