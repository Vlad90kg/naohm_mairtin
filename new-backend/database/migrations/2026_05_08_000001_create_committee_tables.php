<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('committee_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('committee_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('committee_section_id')->constrained()->cascadeOnDelete();
            $table->string('role');
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        $sourceDir = dirname(base_path()) . '/frontend/src/assets/Committee Photos';
        $targetDir = 'committee-members';

        $committees = [
            [
                'title' => 'Senior Committee',
                'order' => 1,
                'members' => [
                    ['role' => 'Chairperson', 'name' => 'Martin McHugh', 'image' => 'Martin Mc Hugh.jpeg'],
                    ['role' => 'Vice Chairperson', 'name' => 'Paul McDonnell', 'image' => 'Paul McDonnell.jpeg'],
                    ['role' => 'Secretary', 'name' => 'Sandra O’Rourke'],
                    ['role' => 'Treasurer', 'name' => 'Joe Walsh', 'image' => 'Joe Walsh.jpeg'],
                    ['role' => 'Asst Treasurer', 'name' => 'Grainne McCullough'],
                    ['role' => 'Communication Officer', 'name' => 'Ben McCourt'],
                    ['role' => 'Asst Communication Officer', 'name' => 'Claire Clarke'],
                    ['role' => 'Cultural Officer', 'name' => 'Patricia Madden', 'image' => 'Patricia Madden.jpeg'],
                    ['role' => 'Language Officer', 'name' => 'Deirdre Ryan', 'image' => 'Deirdre Ryan.jpeg'],
                    ['role' => 'Health & Wellbeing Officer', 'name' => 'Audrey Gannon', 'image' => 'Audrey Gannon.jpeg'],
                    ['role' => 'Health & Wellbeing Officer', 'name' => 'Linda Donohue'],
                    ['role' => 'County Board Rep', 'name' => 'Neil Cooney', 'image' => 'Neil Cooney.jpeg'],
                    ['role' => 'County Board Rep', 'name' => 'Paul Carry', 'image' => 'Paul Carry.jpeg'],
                    ['role' => 'Children’s Officer', 'name' => 'Elma Flood', 'image' => 'Elma Flood.jpeg'],
                    ['role' => 'Green Club Officer', 'name' => 'Dolores McAloon'],
                ],
            ],
            [
                'title' => 'Ladies Committee',
                'order' => 2,
                'members' => [
                    ['role' => 'Chairperson', 'name' => 'Stuart McDonnell'],
                    ['role' => 'Secretary', 'name' => 'Edel Matthews'],
                ],
            ],
            [
                'title' => 'Juvenile Committee',
                'order' => 3,
                'members' => [
                    ['role' => 'Co-Chairperson', 'name' => 'Ollie Ginty'],
                    ['role' => 'Co-Chairperson', 'name' => 'Ailish Harty'],
                    ['role' => 'Coaching Officer', 'name' => 'Francis McCullough'],
                ],
            ],
        ];

        $now = now();

        foreach ($committees as $sectionIndex => $section) {
            $sectionId = DB::table('committee_sections')->insertGetId([
                'title' => $section['title'],
                'order' => $section['order'] ?? ($sectionIndex + 1),
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            foreach ($section['members'] as $memberIndex => $member) {
                $imagePath = null;
                $sourceFilename = $member['image'] ?? null;

                if (is_string($sourceFilename) && $sourceFilename !== '') {
                    $sourcePath = $sourceDir . '/' . $sourceFilename;
                    $targetFilename = preg_replace('/[^a-z0-9\.\-_]+/i', '-', strtolower($sourceFilename));
                    $targetPath = $targetDir . '/' . $targetFilename;

                    if (is_file($sourcePath)) {
                        Storage::disk('public')->put($targetPath, file_get_contents($sourcePath));
                        $imagePath = $targetPath;
                    }
                }

                DB::table('committee_members')->insert([
                    'committee_section_id' => $sectionId,
                    'role' => $member['role'],
                    'name' => $member['name'],
                    'image' => $imagePath,
                    'email' => $member['email'] ?? null,
                    'phone' => $member['phone'] ?? null,
                    'order' => $memberIndex + 1,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('committee_members');
        Schema::dropIfExists('committee_sections');
    }
};
