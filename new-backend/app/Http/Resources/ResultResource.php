<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $fixture = $this->relationLoaded('fixture') ? $this->fixture : null;

        return [
            'id' => $this->id,
            'fixture_id' => $this->fixture_id,
            'home_score' => $this->home_score,
            'away_score' => $this->away_score,
            'status' => $this->status?->value ?? $this->status,
            'status_display' => $this->status?->getLabel() ?? $this->status,
            'date' => $fixture?->date_time?->toDateString(),
            'time' => $fixture?->date_time?->format('H:i'),
            'datetime' => $fixture?->date_time?->toIso8601String(),
            'starts_at' => $fixture?->date_time?->toIso8601String(),
            'location' => $fixture?->location,
            'competition' => $fixture?->competition,
            'home_team' => $fixture ? new TeamResource($fixture->homeTeam) : null,
            'away_team' => $fixture ? new TeamResource($fixture->awayTeam) : null,
            'fixture' => $fixture ? [
                'id' => $fixture->id,
                'date' => $fixture->date_time->toDateString(),
                'time' => $fixture->date_time->format('H:i'),
                'datetime' => $fixture->date_time->toIso8601String(),
                'starts_at' => $fixture->date_time->toIso8601String(),
                'location' => $fixture->location,
                'competition' => $fixture->competition,
            ] : null,
        ];
    }
}
