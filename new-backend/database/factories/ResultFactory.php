<?php

namespace Database\Factories;

use App\Enums\ResultStatus;
use App\Models\Fixture;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResultFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fixture_id' => Fixture::factory(),
            'home_score' => $this->faker->numberBetween(0, 5) . '-' . $this->faker->numberBetween(5, 20),
            'away_score' => $this->faker->numberBetween(0, 5) . '-' . $this->faker->numberBetween(5, 20),
            'status' => ResultStatus::Final,
        ];
    }
}
