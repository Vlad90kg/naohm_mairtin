<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Event::query();

        if ($request->has('upcoming')) {
            $query->where('date', '>=', now()->toDateString());
        }

        return response()->json(EventResource::collection($query->get())->resolve());
    }

    public function homepage(): JsonResponse
    {
        $upcomingEvents = Event::query()
            ->whereDate('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time')
            ->get();

        $featuredEvent = Event::query()
            ->where('is_featured', true)
            ->whereDate('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time')
            ->first();

        if (! $featuredEvent) {
            $featuredEvent = Event::query()
                ->where('is_featured', true)
                ->orderByDesc('date')
                ->orderByDesc('time')
                ->first();
        }

        return response()->json([
            'featured_event' => $featuredEvent ? (new EventResource($featuredEvent))->resolve() : null,
            'upcoming_events' => EventResource::collection($upcomingEvents)->resolve(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $event = Event::create($data);

        return response()->json((new EventResource($event))->resolve(), 201);
    }

    public function update(Request $request, Event $event): JsonResponse
    {
        $data = $this->validateData($request, $event->id);
        $event->update($data);

        return response()->json((new EventResource($event->fresh()))->resolve());
    }

    public function destroy(Event $event): JsonResponse
    {
        $event->delete();

        return response()->json(null, 204);
    }

    private function validateData(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'time' => ['nullable', 'date_format:H:i'],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:2048'],
            'is_featured' => ['sometimes', 'boolean'],
        ]);
    }
}
