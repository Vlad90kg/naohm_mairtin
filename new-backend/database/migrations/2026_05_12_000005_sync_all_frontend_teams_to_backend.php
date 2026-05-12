<?php

use App\Enums\TeamCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $teams = [
            [
                'name' => 'Senior Men',
                'slug' => 'senior-men',
                'category' => TeamCategory::Adult->value,
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
                'category' => TeamCategory::Adult->value,
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
                'category' => TeamCategory::Adult->value,
                'senior_group' => 'senior_ladies',
                'image' => 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80',
                'managers' => [
                    ['role' => 'Manager', 'name' => 'Sarah Greene', 'phone' => '085 444 3322', 'email' => null],
                    ['role' => 'Coach', 'name' => 'Mick Lynch', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Mondays: 7:00 PM', 'Thursdays: 7:00 PM'],
                'contact_email' => null,
            ],
            [
                'name' => 'U17 Boys',
                'slug' => 'u17-boys',
                'category' => TeamCategory::Juvenile->value,
                'senior_group' => null,
                'image' => 'https://images.unsplash.com/photo-1529900948632-58674ba19306?w=800&q=80',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'Paul Connor', 'phone' => '087 000 1111', 'email' => null],
                ],
                'training_times' => ['Tuesdays: 6:30 PM'],
                'contact_email' => null,
            ],
            [
                'name' => 'U15 Boys',
                'slug' => 'u15-boys',
                'category' => TeamCategory::Juvenile->value,
                'senior_group' => null,
                'image' => 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'Seamus Quinn', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Mondays: 6:00 PM'],
                'contact_email' => null,
            ],
            [
                'name' => 'U13 Boys',
                'slug' => 'u13-boys',
                'category' => TeamCategory::Juvenile->value,
                'senior_group' => null,
                'image' => 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&q=80',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'David Kelly', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Wednesdays: 6:30 PM'],
                'contact_email' => null,
            ],
            [
                'name' => 'U12 Girls',
                'slug' => 'u12-girls',
                'category' => TeamCategory::Juvenile->value,
                'senior_group' => null,
                'image' => 'https://images.unsplash.com/photo-1516244122345-381a171d1887?w=800&q=80',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'Laura Brennan', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Fridays: 6:00 PM'],
                'contact_email' => null,
            ],
        ];

        foreach ($teams as $team) {
            $existing = DB::table('teams')
                ->where('is_internal', true)
                ->where(function ($query) use ($team) {
                    $query->where('slug', $team['slug'])
                        ->orWhere('name', $team['name']);
                })
                ->first();

            $payload = [
                'name' => $team['name'],
                'slug' => $team['slug'],
                'category' => $team['category'],
                'senior_group' => $team['senior_group'],
                'image' => $team['image'],
                'description' => null,
                'managers' => json_encode($team['managers'], JSON_UNESCAPED_SLASHES),
                'training_times' => json_encode($team['training_times'], JSON_UNESCAPED_SLASHES),
                'contact_email' => $team['contact_email'],
                'is_internal' => true,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('teams')
                    ->where('id', $existing->id)
                    ->update($payload);

                continue;
            }

            DB::table('teams')->insert([
                ...$payload,
                'created_at' => now(),
            ]);
        }

        DB::table('teams')
            ->where('is_internal', true)
            ->whereNotIn('slug', array_column($teams, 'slug'))
            ->delete();
    }

    public function down(): void
    {
        // Canonical sync is intentionally one-way.
    }
};
