<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('teams')
            ->where('category', 'juvenile')
            ->where('is_internal', true)
            ->where(function ($query) {
                $query->where('slug', 'u14-boys')
                    ->orWhere('name', 'U14 Boys');
            })
            ->delete();
    }

    public function down(): void
    {
        // Legacy seeded record intentionally not restored.
    }
};
