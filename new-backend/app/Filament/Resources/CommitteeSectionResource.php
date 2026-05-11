<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CommitteeSectionResource\Pages;
use App\Models\CommitteeSection;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class CommitteeSectionResource extends Resource
{
    protected static ?string $model = CommitteeSection::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user-group';
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
    protected static ?string $navigationLabel = 'Committee Members';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Committee Section')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('order')
                        ->numeric()
                        ->default(0),
                    Forms\Components\Toggle::make('is_active')
                        ->default(true),
                ])->columns(3),
            Section::make('Members')
                ->description('Edit member names, roles, and portraits shown on the committee page.')
                ->schema([
                    Forms\Components\Repeater::make('members')
                        ->relationship()
                        ->orderColumn('order')
                        ->collapsible()
                        ->collapsed()
                        ->reorderableWithButtons()
                        ->itemLabel(fn (array $state): ?string => $state['name'] ?? $state['role'] ?? 'Member')
                        ->schema([
                            Forms\Components\TextInput::make('role')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('name')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\Toggle::make('is_active')
                                ->default(true),
                            Forms\Components\FileUpload::make('image')
                                ->image()
                                ->disk('public')
                                ->directory('committee-members')
                                ->fetchFileInformation(false)
                                ->imagePreviewHeight('160')
                                ->openable()
                                ->downloadable(),
                            Forms\Components\TextInput::make('email')
                                ->email()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('phone')
                                ->maxLength(255),
                        ])
                        ->columns(3)
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('order')
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('members_count')
                    ->counts('members')
                    ->label('Members'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCommitteeSections::route('/'),
            'create' => Pages\CreateCommitteeSection::route('/create'),
            'edit' => Pages\EditCommitteeSection::route('/{record}/edit'),
        ];
    }
}
