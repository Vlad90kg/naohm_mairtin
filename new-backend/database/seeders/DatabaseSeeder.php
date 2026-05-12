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

class DatabaseSeeder extends Seeder
{
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
        $seniorMen = Team::factory()->create(['name' => 'Senior Men', 'category' => TeamCategory::Adult]);
        $seniorLadies = Team::factory()->create(['name' => 'Senior Ladies', 'category' => TeamCategory::Ladies]);
        $u14Boys = Team::factory()->create(['name' => 'U14 Boys', 'category' => TeamCategory::Juvenile]);
        
        $otherTeams = Team::factory()->count(5)->create(['is_internal' => false]);

        // Fixtures & Results
        foreach ([$seniorMen, $seniorLadies, $u14Boys] as $internalTeam) {
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
        Event::factory()->count(10)->create();
    }
}
