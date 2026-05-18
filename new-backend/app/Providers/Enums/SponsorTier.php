<?php

namespace App\Enums;

enum SponsorTier: string
{
    case Gold = 'gold';
    case Silver = 'silver';
    case Bronze = 'bronze';

    public function getLabel(): string
    {
        return match($this) {
            self::Gold => 'Gold',
            self::Silver => 'Silver',
            self::Bronze => 'Bronze',
        };
    }
}
