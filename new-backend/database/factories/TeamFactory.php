<?php

namespace Database\Factories;

use App\Enums\TeamCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TeamFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true) . ' Team';
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'category' => $this->faker->randomElement(TeamCategory::cases()),
            'image' => null,
            'managers' => ['Manager One', 'Manager Two'],
            'training_times' => ['Monday 7pm', 'Wednesday 8pm'],
            'contact_email' => $this->faker->safeEmail(),
            'is_internal' => true,
        ];
    }
}
