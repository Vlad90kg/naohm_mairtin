<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\FixtureController;
use App\Http\Controllers\Api\PageContentController;
use App\Http\Controllers\Api\ResultController;
use App\Http\Controllers\Api\SponsorController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::patch('/events/{event}', [EventController::class, 'update']);
Route::delete('/events/{event}', [EventController::class, 'destroy']);

Route::get('/fixtures', [FixtureController::class, 'index']);
Route::get('/results', [ResultController::class, 'index']);

Route::get('/sponsors', [SponsorController::class, 'index']);
Route::post('/sponsors', [SponsorController::class, 'store']);
Route::patch('/sponsors/{sponsor}', [SponsorController::class, 'update']);
Route::delete('/sponsors/{sponsor}', [SponsorController::class, 'destroy']);

Route::get('/teams', [TeamController::class, 'index']);
Route::post('/teams', [TeamController::class, 'store']);
Route::patch('/teams/{team}', [TeamController::class, 'update']);
Route::delete('/teams/{team}', [TeamController::class, 'destroy']);
Route::get('/teams/slug/{slug}', [TeamController::class, 'show']);

Route::get('/pages/{page}', [PageContentController::class, 'show']);
Route::patch('/pages/{page}', [PageContentController::class, 'update']);

Route::post('/uploads/sponsor-logo', [UploadController::class, 'storeSponsorLogo']);
