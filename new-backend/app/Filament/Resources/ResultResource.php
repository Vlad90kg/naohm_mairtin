<?php

namespace App\Filament\Resources;

use App\Enums\ResultStatus;
use App\Filament\Resources\ResultResource\Pages;
use App\Models\Result;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ResultResource extends Resource
{
    protected static ?string $model = Result::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-check-circle';
    protected static string|\UnitEnum|null $navigationGroup = 'Games';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Forms\Components\Select::make('fixture_id')
                            ->relationship('fixture', 'id', function ($query) {
                                return $query->orderBy('date_time', 'desc');
                            })
                            ->getOptionLabelFromRecordUsing(fn ($record) => "{$record->date_time->format('Y-m-d')}: {$record->homeTeam->name} vs {$record->awayTeam->name}")
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->searchable(),
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('home_score')
                                    ->helperText('e.g. 1-12')
                                    ->required(),
                                Forms\Components\TextInput::make('away_score')
                                    ->helperText('e.g. 2-08')
                                    ->required(),
                            ]),
                        Forms\Components\Select::make('status')
                            ->options(ResultStatus::class)
                            ->required()
                            ->native(false),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('fixture.date_time')
                    ->dateTime('d M Y')
                    ->label('Date')
                    ->sortable(),
                Tables\Columns\TextColumn::make('fixture.homeTeam.name')
                    ->label('Home'),
                Tables\Columns\TextColumn::make('home_score')
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('away_score')
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('fixture.awayTeam.name')
                    ->label('Away'),
                Tables\Columns\TextColumn::make('status')
                    ->badge(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(ResultStatus::class),
            ])
            ->actions([
                Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListResults::route('/'),
            'create' => Pages\CreateResult::route('/create'),
            'edit' => Pages\EditResult::route('/{record}/edit'),
        ];
    }
}
