<?php

namespace App\Enums;

enum TeamCategory: string
{
    case Adult = 'adult';
    case Juvenile = 'juvenile';
    case Ladies = 'ladies';

    public function getLabel(): string
    {
        return match($this) {
            self::Adult => 'Adult',
            self::Juvenile => 'Juvenile',
            self::Ladies => 'Ladies',
        };
    }
}
