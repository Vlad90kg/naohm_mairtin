<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FixtureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = $this->result;

        return [
            'id' => $this->id,
            'date' => $this->date_time->toDateString(),
            'time' => $this->date_time->format('H:i'),
            'location' => $this->location,
            'competition' => $this->competition,
            'home_team' => new TeamResource($this->whenLoaded('homeTeam')),
            'away_team' => new TeamResource($this->whenLoaded('awayTeam')),
            'result' => $result ? [
                'id' => $result->id,
                'home_score' => $result->home_score,
                'away_score' => $result->away_score,
                'status' => $result->status?->value ?? $result->status,
                'status_display' => $result->status?->getLabel() ?? $result->status,
            ] : null,
        ];
    }
}
