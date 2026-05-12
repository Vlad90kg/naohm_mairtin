<?php

namespace Tests\Feature;

use App\Enums\EventCategory;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomepageEventsTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_returns_next_upcoming_featured_event_and_upcoming_events(): void
    {
        $laterFeatured = Event::factory()->create([
            'title' => 'Later Featured Event',
            'date' => now()->addDays(7),
            'category' => EventCategory::ClubEvents,
            'is_featured' => true,
        ]);

        $nextFeatured = Event::factory()->create([
            'title' => 'Next Featured Event',
            'date' => now()->addDays(2),
            'category' => EventCategory::ClubEvents,
            'is_featured' => true,
        ]);

        $upcomingEvent = Event::factory()->create([
            'title' => 'Open Training Night',
            'date' => now()->addDay(),
            'category' => EventCategory::Training,
        ]);

        Event::factory()->create([
            'title' => 'Past Featured Event',
            'date' => now()->subDays(3),
            'category' => EventCategory::ClubEvents,
            'is_featured' => true,
        ]);

        $response = $this->getJson('/api/homepage');

        $response->assertOk()
            ->assertJsonPath('featured_event.id', $nextFeatured->id)
            ->assertJsonPath('featured_event.is_featured', true)
            ->assertJsonPath('featured_event.slug', 'next-featured-event')
            ->assertJsonPath('upcoming_events.0.id', $upcomingEvent->id)
            ->assertJsonPath('upcoming_events.1.id', $nextFeatured->id)
            ->assertJsonPath('upcoming_events.2.id', $laterFeatured->id);
    }

    public function test_homepage_falls_back_to_latest_featured_event_when_no_upcoming_featured_event_exists(): void
    {
        Event::factory()->create([
            'title' => 'Older Featured Event',
            'date' => now()->subDays(10),
            'category' => EventCategory::ClubEvents,
            'is_featured' => true,
        ]);

        $latestFeatured = Event::factory()->create([
            'title' => 'Latest Featured Event',
            'date' => now()->subDay(),
            'category' => EventCategory::ClubEvents,
            'is_featured' => true,
        ]);

        $response = $this->getJson('/api/homepage');

        $response->assertOk()
            ->assertJsonPath('featured_event.id', $latestFeatured->id);
    }

    public function test_homepage_returns_null_when_no_featured_events_exist(): void
    {
        Event::factory()->create([
            'title' => 'Regular Event',
            'date' => now()->addDays(5),
            'category' => EventCategory::ClubEvents,
            'is_featured' => false,
        ]);

        $response = $this->getJson('/api/homepage');

        $response->assertOk()
            ->assertJsonPath('featured_event', null)
            ->assertJsonCount(1, 'upcoming_events');
    }
}
