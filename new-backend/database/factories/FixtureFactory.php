<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

class FixtureFactory extends Factory
{
    public function definition(): array
    {
        return [
            'home_team_id' => Team::factory(),
            'away_team_id' => Team::factory(),
            'date_time' => $this->faker->dateTimeBetween('-1 month', '+2 months'),
            'location' => 'Club Grounds',
            'competition' => 'Senior League',
        ];
    }
}
