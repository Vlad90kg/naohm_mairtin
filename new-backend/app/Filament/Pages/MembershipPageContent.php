<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class MembershipPageContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-device-phone-mobile';

    protected static ?string $navigationLabel = 'Membership Page Content';

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 21;

    protected static ?string $title = 'Membership Page Content';

    protected string $view = 'filament.pages.membership-page-content';

    public ?array $data = [];

    private const STORAGE_PATH = 'cms/page-content.json';

    public function mount(): void
    {
        $this->form->fill($this->loadMembershipContent());
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make('Page Introduction')
                    ->description('Controls the hero intro text at the top of the public Membership page.')
                    ->schema([
                        Textarea::make('description')
                            ->label('Intro Description')
                            ->placeholder('Explain membership registration through ClubSpot...')
                            ->helperText('Appears below the "Club Membership Now on ClubSpot" heading.')
                            ->required()
                            ->rows(3)
                            ->maxLength(1000),
                    ]),
                Section::make('App Links')
                    ->description('These links power the App Store and Google Play buttons on the public page.')
                    ->schema([
                        TextInput::make('app_store_link')
                            ->label('App Store URL')
                            ->placeholder('https://apps.apple.com/...')
                            ->helperText('Used by the "Download on the App Store" button.')
                            ->required()
                            ->url(),
                        TextInput::make('google_play_link')
                            ->label('Google Play URL')
                            ->placeholder('https://play.google.com/store/apps/details?...')
                            ->helperText('Used by the "Get it on Google Play" button.')
                            ->required()
                            ->url(),
                    ])
                    ->columns(2),
                Section::make('Membership Poster / Rates Image')
                    ->description('This image appears in the "2026 Membership Rates" section on the public frontend.')
                    ->schema([
                        FileUpload::make('poster')
                            ->label('Poster Image')
                            ->helperText('Upload a clear portrait or landscape rates poster. This is publicly visible.')
                            ->image()
                            ->disk('public')
                            ->directory('membership')
                            ->imageEditor()
                            ->required(),
                    ]),
                Section::make('Help / Registrar Contact')
                    ->description('Displayed in the help section near the bottom of the page.')
                    ->schema([
                        TextInput::make('registrar_email')
                            ->label('Registrar Email')
                            ->placeholder('registrar.naomhmairtin.louth@gaa.ie')
                            ->helperText('Used for the "Contact Registrar" email link on the public page.')
                            ->required()
                            ->email(),
                    ]),
                Section::make('Frontend Preview Notes')
                    ->description('Quick reminders about where this content appears.')
                    ->schema([
                        Placeholder::make('public_note')
                            ->label('Public visibility')
                            ->content('All saved changes are publicly visible on /membership immediately after publish.'),
                        Placeholder::make('poster_note')
                            ->label('Poster usage')
                            ->content('The uploaded poster is shown in the "2026 Membership Rates" visual block.'),
                    ]),
            ]);
    }

    protected function getHeaderActions(): array
    {
        $posterUrl = data_get($this->data, 'poster');

        return [
            Action::make('openFrontend')
                ->label('Open Frontend Page')
                ->url('/membership', shouldOpenInNewTab: true),
            Action::make('openImage')
                ->label('Open Uploaded Image')
                ->url($posterUrl ?: '#', shouldOpenInNewTab: true)
                ->visible(filled($posterUrl)),
            Action::make('save')
                ->label('Save Membership Page Content')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();
        $pages = $this->loadAllPages();
        $poster = (string) ($state['poster'] ?? '');
        $poster = $this->normalizePosterPath($poster);

        $pages['membership'] = [
            'description' => (string) ($state['description'] ?? ''),
            'app_store_link' => (string) ($state['app_store_link'] ?? ''),
            'google_play_link' => (string) ($state['google_play_link'] ?? ''),
            'poster' => $poster,
            'registrar_email' => (string) ($state['registrar_email'] ?? ''),
        ];

        Storage::disk('local')->put(
            self::STORAGE_PATH,
            json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        Notification::make()
            ->title('Membership page content saved successfully')
            ->success()
            ->send();
    }

    private function loadMembershipContent(): array
    {
        $pages = $this->loadAllPages();

        return $pages['membership'] ?? $this->defaultMembership();
    }

    private function loadAllPages(): array
    {
        if (! Storage::disk('local')->exists(self::STORAGE_PATH)) {
            return [];
        }

        $content = Storage::disk('local')->get(self::STORAGE_PATH);
        $decoded = json_decode($content, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function defaultMembership(): array
    {
        return [
            'description' => 'We have moved our membership and club communications to the ClubSpot app.',
            'app_store_link' => 'https://apps.apple.com/ie/app/clubspot/id1506101166',
            'google_play_link' => 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
            'poster' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
            'registrar_email' => 'registrar.naomhmairtin.louth@gaa.ie',
        ];
    }

    private function normalizePosterPath(string $poster): string
    {
        if ($poster === '') {
            return $poster;
        }

        if (str_contains($poster, '/storage/')) {
            $parts = explode('/storage/', $poster, 2);

            return $parts[1] ?? $poster;
        }

        return ltrim($poster, '/');
    }
}
