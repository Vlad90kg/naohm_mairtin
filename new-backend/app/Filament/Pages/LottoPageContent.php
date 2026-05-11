<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class LottoPageContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationLabel = 'Lotto Page Content';

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 20;

    protected static ?string $title = 'Lotto Page Content';

    protected string $view = 'filament.pages.lotto-page-content';

    public ?array $data = [];

    private const STORAGE_PATH = 'cms/page-content.json';

    public function mount(): void
    {
        $this->form->fill($this->loadLottoContent());
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make('Page Introduction')
                    ->description('Controls the hero headline and summary at the top of /lotto.')
                    ->schema([
                        TextInput::make('hero_eyebrow')->label('Hero Eyebrow')->required()->maxLength(80)->helperText('Small label above the main hero title.'),
                        TextInput::make('hero_title')->label('Hero Title')->required()->maxLength(120)->helperText('First part of the big hero title.'),
                        TextInput::make('hero_highlight')->label('Hero Highlight')->required()->maxLength(120)->helperText('Highlighted second part of the hero title.'),
                        Textarea::make('hero_description')->label('Hero Description')->required()->rows(3)->helperText('Main intro text describing the lotto.'),
                    ])->columns(2),
                Section::make('Draw & Results')
                    ->description('Public draw values and latest result details.')
                    ->schema([
                        TextInput::make('jackpot_label')->label('Jackpot Label')->required(),
                        TextInput::make('jackpot_amount')
                            ->label('Current Jackpot Amount')
                            ->required()
                            ->helperText('Plain text is fine, e.g. EUR8,500.'),
                        TextInput::make('next_draw_label')->label('Next Draw Label')->required(),
                        TextInput::make('next_draw_date')->label('Next Draw Date Text')->required()->helperText('Example: Every Monday Night'),
                        TextInput::make('latest_results_title')->label('Latest Results Section Title')->required(),
                        TextInput::make('latest_draw_date')->label('Latest Draw Date Text')->required(),
                        TextInput::make('winning_numbers')
                            ->label('Winning Numbers')
                            ->required()
                            ->helperText('Comma separated numbers, e.g. 7, 14, 21, 28'),
                        Toggle::make('jackpot_won')->label('Jackpot Won')->helperText('Enable if the latest jackpot was won.'),
                        TextInput::make('latest_jackpot_amount')->label('Latest Jackpot Amount')->required(),
                        TextInput::make('winners_section_title')
                            ->label('Prize Winners Section Title')
                            ->required()
                            ->helperText('Use wording for this week only, e.g. "This Week\'s Prize Winners".'),
                    ])->columns(2),
                Section::make('Prize Winners')
                    ->description('Add winners for the latest draw only (this week). No historical archive is stored here.')
                    ->schema([
                        Repeater::make('winners')
                            ->label('Winners')
                            ->schema([
                                TextInput::make('prize')->label('Prize')->required()->placeholder('Match 3'),
                                TextInput::make('winner')->label('Winner')->required()->placeholder('John Murphy'),
                                TextInput::make('amount')->label('Amount')->required()->placeholder('EUR50'),
                            ])
                            ->default([])
                            ->addActionLabel('Add This Week\'s Winner')
                            ->reorderable(false)
                            ->columns(3),
                    ]),
                Section::make('Links & Calls To Action')
                    ->description('Buttons and helper text that direct visitors to buy tickets or download the app.')
                    ->schema([
                        TextInput::make('buy_tickets_text')->label('Buy Tickets Button Text')->required()->maxLength(80),
                        TextInput::make('buy_tickets_url')->label('Buy Tickets URL')->required()->url()->helperText('Public button link, must be valid URL.'),
                        TextInput::make('app_download_text')->label('App Download Button Text')->required()->maxLength(80),
                        TextInput::make('app_download_url')->label('App Download URL')->required()->url(),
                        TextInput::make('helper_text')->label('Helper Text')->required()->maxLength(255),
                        TextInput::make('how_it_works_title')->label('How It Works Section Title')->required(),
                        TextInput::make('bottom_cta_title')->label('Bottom CTA Title')->required(),
                        Textarea::make('bottom_cta_description')->label('Bottom CTA Description')->required()->rows(2),
                    ])->columns(2),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('openFrontend')
                ->label('Open Frontend Page')
                ->url('/lotto', shouldOpenInNewTab: true),
            Action::make('save')
                ->label('Save Lotto Page Content')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();
        $pages = $this->loadAllPages();

        $state['winning_numbers'] = $this->parseWinningNumbers((string) ($state['winning_numbers'] ?? ''));
        $state['jackpot_won'] = (bool) ($state['jackpot_won'] ?? false);
        $state['winners'] = $this->normalizeWinners($state['winners'] ?? []);
        $pages['lotto'] = $state;

        Storage::disk('local')->put(
            self::STORAGE_PATH,
            json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        Notification::make()
            ->title('Lotto page content saved successfully')
            ->success()
            ->send();
    }

    private function parseWinningNumbers(string $numbers): array
    {
        return collect(explode(',', $numbers))
            ->map(fn (string $n) => (int) trim($n))
            ->filter(fn (int $n) => $n > 0)
            ->values()
            ->all();
    }

    private function normalizeWinners(array $winners): array
    {
        return collect($winners)
            ->map(function (array $winner, int $index): array {
                return [
                    'id' => (string) ($winner['id'] ?? ('winner-' . ($index + 1))),
                    'prize' => (string) ($winner['prize'] ?? ''),
                    'winner' => (string) ($winner['winner'] ?? ''),
                    'amount' => (string) ($winner['amount'] ?? ''),
                ];
            })
            ->filter(fn (array $winner): bool => $winner['prize'] !== '' || $winner['winner'] !== '' || $winner['amount'] !== '')
            ->values()
            ->all();
    }

    private function loadLottoContent(): array
    {
        $pages = $this->loadAllPages();
        $lotto = $pages['lotto'] ?? $this->defaultLotto();
        $lotto['winning_numbers'] = implode(', ', $lotto['winning_numbers'] ?? []);

        return $lotto;
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

    private function defaultLotto(): array
    {
        return [
            'hero_eyebrow' => 'Weekly Club Lotto',
            'hero_title' => 'Club',
            'hero_highlight' => 'Lotto',
            'hero_description' => 'Play the Naomh Mairtin CPG weekly lotto and support your club.',
            'jackpot_label' => 'Current Jackpot',
            'jackpot_amount' => 'EUR8,500',
            'next_draw_label' => 'Draw',
            'next_draw_date' => 'Every Monday Night',
            'buy_tickets_url' => 'https://member.clubspot.app/club/naomh-mairtin-gaa/fundraisers',
            'buy_tickets_text' => 'Buy Lotto Tickets Online',
            'app_download_url' => 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
            'app_download_text' => 'Download ClubSpot App',
            'helper_text' => 'Online purchase is the quickest option.',
            'latest_results_title' => 'Latest Draw Results',
            'latest_draw_date' => 'Monday 24th March 2025',
            'winning_numbers' => [7, 14, 21, 28],
            'jackpot_won' => false,
            'latest_jackpot_amount' => 'EUR8,500',
            'winners_section_title' => 'This Week\'s Prize Winners',
            'winners' => [],
            'how_it_works_title' => 'How the Lotto Works',
            'bottom_cta_title' => 'Support Your Club - Play the Lotto',
            'bottom_cta_description' => 'Every ticket purchased goes directly back into Naomh Mairtin CPG.',
        ];
    }
}
