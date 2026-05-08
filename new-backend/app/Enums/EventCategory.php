<?php

namespace App\Enums;

enum EventCategory: string
{
    case Matches = 'Matches';
    case ClubEvents = 'Club Events';
    case Training = 'Training';

    public function getLabel(): string
    {
        return $this->value;
    }
}
