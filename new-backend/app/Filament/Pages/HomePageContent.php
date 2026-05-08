<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class HomePageContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Home Page Content';
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
    protected static ?int $navigationSort = 10;
    protected static ?string $title = 'Home Page Content';
    protected string $view = 'filament.pages.home-page-content';
    public ?array $data = [];
    private const STORAGE_PATH = 'cms/page-content.json';

    public function mount(): void
    {
        $this->form->fill($this->loadPage());
    }

    public function form(Schema $schema): Schema
    {
        return $schema->statePath('data')->components([
            Section::make('Hero')->schema([
                TextInput::make('hero.title')->required(),
                TextInput::make('hero.subtitle')->required(),
                TextInput::make('hero.primaryButtonText')->required(),
                TextInput::make('hero.primaryButtonLink')->required(),
                TextInput::make('hero.secondaryButtonText')->required(),
                TextInput::make('hero.secondaryButtonLink')->required(),
                FileUpload::make('hero.backgroundImage')
                    ->label('Hero Background Image (all pages)')
                    ->image()
                    ->disk('public')
                    ->directory('hero')
                    ->helperText('This background is used across all page hero sections.')
                    ->required(),
            ])->columns(2),
            Section::make('Featured Announcement')->schema([
                TextInput::make('featuredAnnouncement.title')->required(),
                TextInput::make('featuredAnnouncement.description')->required(),
                TextInput::make('featuredAnnouncement.buttonText')->required(),
                TextInput::make('featuredAnnouncement.buttonLink')->required(),
            ])->columns(2),
            Section::make('Homepage Sections')->schema([
                Toggle::make('sections.sponsors.enabled')->label('Sponsors Enabled'),
                TextInput::make('sections.sponsors.sectionTitle')->required(),
                TextInput::make('sections.sponsors.itemsLimit')->numeric()->required(),
                Toggle::make('sections.shops.enabled')->label('Shops Enabled'),
                TextInput::make('sections.shops.sectionTitle')->required(),
                TextInput::make('sections.shops.itemsLimit')->numeric()->required(),
                Toggle::make('sections.events.enabled')->label('Events Enabled'),
                TextInput::make('sections.events.sectionTitle')->required(),
                TextInput::make('sections.events.itemsLimit')->numeric()->required(),
                Toggle::make('sections.teams.enabled')->label('Teams Enabled'),
                TextInput::make('sections.teams.sectionTitle')->required(),
                TextInput::make('sections.teams.itemsLimit')->numeric()->required(),
            ])->columns(3),
            Section::make('Latest Updates - Instagram')->schema([
                FileUpload::make('social.instagramLatestPostImage')
                    ->label('Latest Instagram Screenshot')
                    ->image()
                    ->disk('public')
                    ->directory('social')
                    ->required(),
            ]),
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('openFrontend')->label('Open Frontend Page')->url('/', shouldOpenInNewTab: true),
            Action::make('save')->label('Save Home Page Content')->submit('save'),
        ];
    }

    public function save(): void
    {
        $pages = $this->loadAllPages();
        $state = $this->form->getState();
        $state['hero']['backgroundImage'] = $this->normalizePath((string) ($state['hero']['backgroundImage'] ?? ''));
        $state['social']['instagramLatestPostImage'] = $this->normalizePath((string) ($state['social']['instagramLatestPostImage'] ?? ''));
        $pages['home'] = $state;
        Storage::disk('local')->put(self::STORAGE_PATH, json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        Notification::make()->title('Home page content saved')->success()->send();
    }

    private function loadPage(): array
    {
        $pages = $this->loadAllPages();
        return $pages['home'] ?? [];
    }

    private function loadAllPages(): array
    {
        if (! Storage::disk('local')->exists(self::STORAGE_PATH)) return [];
        $decoded = json_decode(Storage::disk('local')->get(self::STORAGE_PATH), true);
        return is_array($decoded) ? $decoded : [];
    }

    private function normalizePath(string $value): string
    {
        if ($value === '') return $value;
        if (str_contains($value, '/storage/')) {
            $parts = explode('/storage/', $value, 2);
            return $parts[1] ?? $value;
        }
        return ltrim($value, '/');
    }
}
