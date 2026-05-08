<?php

namespace App\Models;

use App\Enums\ResultStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'fixture_id',
        'home_score',
        'away_score',
        'status',
    ];

    protected $casts = [
        'status' => ResultStatus::class,
    ];

    protected static function booted()
    {
        static::addGlobalScope('latest_first', function (Builder $builder) {
            $builder->latest();
        });
    }

    public function fixture(): BelongsTo
    {
        return $this->belongsTo(Fixture::class);
    }
}
