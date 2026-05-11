<?php

namespace App\Filament\Resources;

use App\Enums\TeamCategory;
use App\Filament\Resources\TeamResource\Pages;
use App\Models\Team;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class TeamResource extends Resource
{
    protected static ?string $model = Team::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user-group';
    protected static string|\UnitEnum|null $navigationGroup = 'Club';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Team Details')
                    ->tabs([
                        Tab::make('General')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->rule('required')
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $state, Set $set) => $set('slug', Str::slug($state))),
                                Forms\Components\TextInput::make('slug')
                                    ->rule('required')
                                    ->unique(ignoreRecord: true),
                                Forms\Components\Select::make('category')
                                    ->options([
                                        TeamCategory::Adult->value => TeamCategory::Adult->getLabel(),
                                        TeamCategory::Juvenile->value => TeamCategory::Juvenile->getLabel(),
                                    ])
                                    ->rule('required')
                                    ->default(TeamCategory::Adult->value)
                                    ->live(),
                                Forms\Components\Select::make('senior_group')
                                    ->label('Senior Group')
                                    ->options([
                                        'senior_men' => 'Senior Men',
                                        'senior_ladies' => 'Senior Ladies',
                                        'social' => 'Social',
                                    ])
                                    ->default('senior_men')
                                    ->visible(fn (Get $get): bool => $get('category') === TeamCategory::Adult->value)
                                    ->helperText('Use this to place adult teams under Senior Men or Senior Ladies pages.'),
                                Forms\Components\TextInput::make('contact_email')
                                    ->rule('nullable')
                                    ->rule('email'),
                                Forms\Components\Toggle::make('is_internal')
                                    ->default(true),
                            ]),
                        Tab::make('Content')
                            ->schema([
                                Forms\Components\FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('teams'),
                                Forms\Components\Textarea::make('description')
                                    ->rows(5)
                                    ->helperText('Optional team text shown on the website behind a click-to-show button.'),
                                Forms\Components\Repeater::make('managers')
                                    ->schema([
                                        Forms\Components\TextInput::make('name'),
                                    ])
                                    ->collapsible(),
                                Forms\Components\Repeater::make('training_times')
                                    ->schema([
                                        Forms\Components\TextInput::make('time'),
                                    ])
                                    ->collapsible(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('senior_group')
                    ->badge()
                    ->label('Senior Group')
                    ->toggleable(),
                Tables\Columns\IconColumn::make('is_internal')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options(TeamCategory::class),
            ])
            ->actions([
                Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTeams::route('/'),
            'create' => Pages\CreateTeam::route('/create'),
            'edit' => Pages\EditTeam::route('/{record}/edit'),
        ];
    }
}
