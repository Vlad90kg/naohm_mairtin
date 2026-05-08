<?php

namespace App\Models;

use App\Enums\TeamCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'image',
        'managers',
        'training_times',
        'contact_email',
        'is_internal',
    ];

    protected $casts = [
        'category' => TeamCategory::class,
        'managers' => 'json',
        'training_times' => 'json',
        'is_internal' => 'boolean',
    ];

    protected static function booted()
    {
        static::addGlobalScope('order_by_category_and_name', function (Builder $builder) {
            $builder->orderBy('category')->orderBy('name');
        });
    }

    public function homeFixtures(): HasMany
    {
        return $this->hasMany(Fixture::class, 'home_team_id');
    }

    public function awayFixtures(): HasMany
    {
        return $this->hasMany(Fixture::class, 'away_team_id');
    }
}
