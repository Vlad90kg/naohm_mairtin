<?php

namespace Database\Factories;

use App\Enums\EventCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'date' => $this->faker->dateTimeBetween('now', '+3 months'),
            'time' => '19:30:00',
            'location' => 'Clubhouse',
            'category' => $this->faker->randomElement(EventCategory::cases()),
            'description' => $this->faker->paragraph(),
            'image' => null,
        ];
    }
}
