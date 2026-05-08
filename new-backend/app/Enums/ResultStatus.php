<?php

namespace App\Enums;

enum ResultStatus: string
{
    case Final = 'final';
    case Postponed = 'postponed';
    case Abandoned = 'abandoned';

    public function getLabel(): string
    {
        return match($this) {
            self::Final => 'Final',
            self::Postponed => 'Postponed',
            self::Abandoned => 'Abandoned',
        };
    }
}
