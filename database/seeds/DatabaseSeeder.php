<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UserTableSeed::class);
        $this->call(CategoryTableSeed::class);
        $this->call(OrderTableSeed::class);
        $this->call(CupomTableSeed::class);

        Model::reguard();
    }
}
