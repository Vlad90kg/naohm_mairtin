<?php

namespace Database\Factories;

use App\Enums\SponsorTier;
use Illuminate\Database\Eloquent\Factories\Factory;

class SponsorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'website' => $this->faker->url(),
            'logo' => null, // Will be handled in seeder if needed
            'tier' => $this->faker->randomElement(SponsorTier::cases()),
            'is_active' => true,
        ];
    }
}
