<?php

use App\Enums\TeamCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $names = [
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

        $slugs = [];

        foreach ($names as $name) {
            $slug = Str::slug(str_replace('&', 'and', $name));
            $slugs[] = $slug;

            $existing = DB::table('teams')
                ->where('is_internal', true)
                ->where('category', TeamCategory::Juvenile->value)
                ->where(function ($query) use ($name, $slug) {
                    $query->where('name', $name)
                        ->orWhere('slug', $slug);
                })
                ->first();

            $payload = [
                'name' => $name,
                'slug' => $slug,
                'category' => TeamCategory::Juvenile->value,
                'senior_group' => null,
                'is_internal' => true,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('teams')->where('id', $existing->id)->update($payload);
                continue;
            }

            DB::table('teams')->insert([
                ...$payload,
                'image' => null,
                'description' => null,
                'managers' => json_encode([], JSON_UNESCAPED_SLASHES),
                'training_times' => json_encode([], JSON_UNESCAPED_SLASHES),
                'contact_email' => null,
                'created_at' => now(),
            ]);
        }

        DB::table('teams')
            ->where('is_internal', true)
            ->where('category', TeamCategory::Juvenile->value)
            ->whereNotIn('slug', $slugs)
            ->delete();
    }

    public function down(): void
    {
        // One-way sync.
    }
};
