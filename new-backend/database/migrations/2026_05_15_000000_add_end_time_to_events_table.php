<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('events', 'end_time')) {
            Schema::table('events', function (Blueprint $table) {
                $table->time('end_time')->nullable()->after('time');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('events', 'end_time')) {
            Schema::table('events', function (Blueprint $table) {
                $table->dropColumn('end_time');
            });
        }
    }
};
