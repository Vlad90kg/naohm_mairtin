<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FixtureResource\Pages;
use App\Models\Fixture;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class FixtureResource extends Resource
{
    protected static ?string $model = Fixture::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-calendar';
    protected static string|\UnitEnum|null $navigationGroup = 'Games';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Forms\Components\Select::make('home_team_id')
                            ->relationship('homeTeam', 'name', fn ($query) => $query->where('is_internal', true))
                            ->required(),
                        Forms\Components\Select::make('away_team_id')
                            ->relationship('awayTeam', 'name')
                            ->required(),
                        Forms\Components\DateTimePicker::make('date_time')
                            ->required(),
                        Forms\Components\TextInput::make('location'),
                        Forms\Components\TextInput::make('competition'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('date_time')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('homeTeam.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('awayTeam.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('location'),
                Tables\Columns\TextColumn::make('competition'),
            ])
            ->filters([
                Tables\Filters\Filter::make('upcoming')
                    ->query(fn ($query) => $query->where('date_time', '>=', now())),
                Tables\Filters\SelectFilter::make('home_team')
                    ->relationship('homeTeam', 'name', fn ($query) => $query->where('is_internal', true)),
            ])
            ->actions([
                Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFixtures::route('/'),
            'create' => Pages\CreateFixture::route('/create'),
            'edit' => Pages\EditFixture::route('/{record}/edit'),
        ];
    }
}
