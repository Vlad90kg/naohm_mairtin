<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->string('senior_group')->nullable()->after('category');
        });

        DB::table('teams')
            ->where('category', 'ladies')
            ->update([
                'category' => 'adult',
                'senior_group' => 'senior_ladies',
            ]);

        DB::table('teams')
            ->where('category', 'adult')
            ->whereNull('senior_group')
            ->update(['senior_group' => 'senior_men']);
    }

    public function down(): void
    {
        if (Schema::hasColumn('teams', 'senior_group')) {
            Schema::table('teams', function (Blueprint $table) {
                $table->dropColumn('senior_group');
            });
        }
    }
};

