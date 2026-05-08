<?php

namespace App\Models;

use App\Enums\SponsorTier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Sponsor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'website',
        'logo',
        'tier',
        'is_active',
    ];

    protected $casts = [
        'tier' => SponsorTier::class,
        'is_active' => 'boolean',
    ];

    protected static function booted()
    {
        static::addGlobalScope('order_by_tier_and_name', function (Builder $builder) {
            $builder->orderByRaw("
                CASE tier
                    WHEN 'gold' THEN 1
                    WHEN 'silver' THEN 2
                    WHEN 'bronze' THEN 3
                    ELSE 4
                END
            ")->orderBy('name');
        });
    }
}
