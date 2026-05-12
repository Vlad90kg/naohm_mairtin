<?php

namespace Database\Seeders;

use App\Enums\TeamCategory;
use App\Models\Event;
use App\Models\Fixture;
use App\Models\Result;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    private function canonicalJuvenileTeamNames(): array
    {
        return [
            'All Stars',
            'Nursery',
            'U7 Boys & Girls',
            'U8 Boys & Girls',
            'U9 Boys',
            'U9 Girls',
            'U10 Boys',
            'U10 Girls',
            'U11 Boys',
            'U11 Girls',
            'U12 Boys',
            'U12 Girls',
            'U13 Girls',
            'U13 Boys',
            'U14 Boys',
            'U14 Girls',
            'U15 Boys',
            'U15 Girls',
            'U16 Boys',
            'U16 Girls',
            'Minor Men',
            'Minor Ladies',
        ];
    }

    private function canonicalTeams(): array
    {
        return [
            [
                'name' => 'Senior Men',
                'slug' => 'senior-men',
                'category' => TeamCategory::Adult,
                'senior_group' => 'senior_men',
                'image' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
                'managers' => [
                    ['role' => 'Manager', 'name' => 'Declan Reilly', 'phone' => '087 123 4567', 'email' => null],
                    ['role' => 'Coach', 'name' => 'John Murphy', 'phone' => null, 'email' => null],
                    ['role' => 'Selector', 'name' => 'Paddy Smith', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Tuesdays: 7:30 PM', 'Thursdays: 8:00 PM'],
                'contact_email' => 'secretary.naomhmairtin.louth@gaa.ie',
            ],
            [
                'name' => 'Junior Men',
                'slug' => 'junior-men',
                'category' => TeamCategory::Adult,
                'senior_group' => 'senior_men',
                'image' => 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80',
                'managers' => [
                    ['role' => 'Manager', 'name' => 'Thomas Byrne', 'phone' => '086 987 6543', 'email' => null],
                ],
                'training_times' => ['Wednesdays: 7:30 PM'],
                'contact_email' => null,
            ],
            [
                'name' => 'Senior Ladies',
                'slug' => 'senior-ladies',
                'category' => TeamCategory::Adult,
                'senior_group' => 'senior_ladies',
                'image' => 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80',
                'managers' => [
                    ['role' => 'Manager', 'name' => 'Sarah Greene', 'phone' => '085 444 3322', 'email' => null],
                    ['role' => 'Coach', 'name' => 'Mick Lynch', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Mondays: 7:00 PM', 'Thursdays: 7:00 PM'],
                'contact_email' => null,
            ],
            ...collect($this->canonicalJuvenileTeamNames())
                ->map(fn (string $name): array => [
                    'name' => $name,
                    'slug' => Str::slug(str_replace('&', 'and', $name)),
                    'category' => TeamCategory::Juvenile,
                    'senior_group' => null,
                    'image' => null,
                    'managers' => [],
                    'training_times' => [],
                    'contact_email' => null,
                ])
                ->all(),
        ];
    }

    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ],
        );

        $this->call(SponsorSeeder::class);

        // Teams
        Team::query()
            ->where('is_internal', true)
            ->whereNotIn('slug', collect($this->canonicalTeams())->pluck('slug'))
            ->delete();

        $internalTeams = collect($this->canonicalTeams())->map(function (array $team) {
            $existing = Team::query()
                ->where('is_internal', true)
                ->where(function ($query) use ($team) {
                    $query->where('slug', $team['slug'])
                        ->orWhere('name', $team['name']);
                })
                ->first();

            $record = [
                ...Team::factory()->make($team)->toArray(),
                'slug' => $team['slug'],
                'category' => $team['category'],
                'senior_group' => $team['senior_group'],
                'image' => $team['image'],
                'managers' => $team['managers'],
                'training_times' => $team['training_times'],
                'contact_email' => $team['contact_email'],
                'is_internal' => true,
            ];

            if ($existing) {
                $existing->update($record);

                return $existing->fresh();
            }

            return Team::query()->create($record);
        });

        $otherTeams = Team::factory()->count(5)->create(['is_internal' => false]);

        // Fixtures & Results
        foreach ($internalTeams as $internalTeam) {
            // Upcoming Fixture
            Fixture::factory()->create([
                'home_team_id' => $internalTeam->id,
                'away_team_id' => $otherTeams->random()->id,
                'date_time' => now()->addDays(rand(1, 10)),
            ]);

            // Recent Fixture with Result
            $pastFixture = Fixture::factory()->create([
                'home_team_id' => $internalTeam->id,
                'away_team_id' => $otherTeams->random()->id,
                'date_time' => now()->subDays(rand(1, 10)),
            ]);

            Result::factory()->create([
                'fixture_id' => $pastFixture->id,
            ]);

            // Archive Fixture with Result
            $archiveFixture = Fixture::factory()->create([
                'home_team_id' => $internalTeam->id,
                'away_team_id' => $otherTeams->random()->id,
                'date_time' => now()->subDays(rand(35, 60)),
            ]);

            Result::factory()->create([
                'fixture_id' => $archiveFixture->id,
            ]);
        }

        // Events
        Event::factory()->count(9)->create();
        Event::factory()->create([
            'title' => 'Featured Club Night',
            'date' => now()->addDays(7),
            'location' => 'Clubhouse',
            'category' => 'Club Events',
            'description' => 'A sample featured event for the homepage announcement card.',
            'is_featured' => true,
        ]);
    }
}
