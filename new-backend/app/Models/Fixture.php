<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Fixture extends Model
{
    use HasFactory;

    protected $fillable = [
        'home_team_id',
        'away_team_id',
        'date_time',
        'location',
        'competition',
    ];

    protected $casts = [
        'date_time' => 'datetime',
    ];

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query
            ->where('date_time', '>=', now())
            ->orderBy('date_time', 'asc');
    }

    public function scopePast(Builder $query): Builder
    {
        return $query
            ->where('date_time', '<', now())
            ->orderBy('date_time', 'desc');
    }

    public function homeTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function result(): HasOne
    {
        return $this->hasOne(Result::class);
    }
}
