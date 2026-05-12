<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CommitteePageResource;
use App\Http\Resources\ContentPageResource;
use App\Models\CommitteeSection;
use App\Http\Resources\ShopPageContentResource;
use App\Models\ContentPage;
use App\Models\ShopPageContent;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class PageContentController extends Controller
{
    private const STORAGE_PATH = 'cms/page-content.json';

    public function show(string $page): JsonResponse
    {
        if ($page === 'committees') {
            $sections = CommitteeSection::query()
                ->with('members')
                ->where('is_active', true)
                ->orderBy('order')
                ->get();

            return response()->json((new CommitteePageResource($sections))->resolve());
        }

        $dynamicPage = ContentPage::query()
            ->with(['sections.galleryImages'])
            ->where('slug', $page)
            ->first();

        if ($dynamicPage) {
            if (! $dynamicPage->is_published) {
                abort(404);
            }

            return response()->json((new ContentPageResource($dynamicPage))->resolve());
        }

        if ($page === 'shop') {
            return response()->json((new ShopPageContentResource($this->getShopPageContent()))->resolve());
        }

        $content = $this->getPageContent($page);

        if ($content === null) {
            abort(404);
        }

        return response()->json($content);
    }

    public function update(Request $request, string $page): JsonResponse
    {
        if ($page === 'shop') {
            return response()->json((new ShopPageContentResource($this->updateShopPageContent($request->all())))->resolve());
        }

        $current = $this->getPageContent($page);

        if ($current === null) {
            abort(404);
        }

        $updated = $this->deepMerge($current, $request->all());
        $pages = $this->loadAllPages();
        $pages[$page] = $updated;
        $this->saveAllPages($pages);

        return response()->json($updated);
    }

    private function getPageContent(string $page): ?array
    {
        if ($page === 'shop') {
            return (new ShopPageContentResource($this->getShopPageContent()))->resolve();
        }

        $pages = $this->loadAllPages();
        $defaults = $this->defaultPages();

        if (! array_key_exists($page, $defaults)) {
            return null;
        }

        if (! array_key_exists($page, $pages)) {
            $pages[$page] = $defaults[$page];
            $this->saveAllPages($pages);
        }

        return $pages[$page] ?? $defaults[$page];
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

    private function saveAllPages(array $pages): void
    {
        Storage::disk('local')->put(
            self::STORAGE_PATH,
            json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }

    private function deepMerge(array $current, array $updates): array
    {
        foreach ($updates as $key => $value) {
            if (is_array($value) && isset($current[$key]) && is_array($current[$key])) {
                $current[$key] = $this->deepMerge($current[$key], $value);
            } else {
                $current[$key] = $value;
            }
        }

        return $current;
    }

    private function defaultPages(): array
    {
        return [
            'home' => [
                'hero' => [
                    'title' => 'Naomh Mairtin CPG & LGFA',
                    'subtitle' => 'Strength in community, excellence on the field.',
                    'primaryButtonText' => 'View Events',
                    'primaryButtonLink' => '/events',
                    'secondaryButtonText' => 'Membership',
                    'secondaryButtonLink' => '/membership',
                    'backgroundImage' => 'hero_background.jpg',
                ],
                'featuredAnnouncement' => [
                    'title' => 'Title of the announcement',
                    'description' => '--------------------',
                    'buttonText' => 'Learn More',
                    'buttonLink' => '#announcement',
                ],
                'sections' => [
                    'sponsors' => ['enabled' => true, 'sectionTitle' => 'Club Sponsors', 'itemsLimit' => 5],
                    'shops' => ['enabled' => true, 'sectionTitle' => 'Official Club Shops', 'itemsLimit' => 3],
                    'events' => ['enabled' => true, 'sectionTitle' => 'Upcoming Events', 'itemsLimit' => 2],
                    'teams' => ['enabled' => true, 'sectionTitle' => 'Our Teams', 'itemsLimit' => 2],
                ],
                'social' => [
                    'instagramLatestPostImage' => 'instagram.png',
                ],
            ],
            'child-safety' => [
                'hero' => [
                    'title' => 'Safeguarding & Child Welfare',
                    'subtitle' => 'Our commitment to a safe environment for all our young members.',
                ],
                'commitment' => 'Naomh Mairtin CPG & LGFA is committed to creating a safe and enjoyable environment for all children and young people. We follow the GAA Code of Behaviour (Underage) and all national safeguarding policies.',
                'contacts' => [
                    [
                        'id' => '1',
                        'name' => 'Elma Flood',
                        'role' => 'Children\'s Officer',
                        'description' => 'Primary contact for safeguarding concerns and child welfare within the club.',
                        'email' => 'childrensofficer.naomhmairtin.louth@gaa.ie',
                        'phone' => '+353 86 174 9988',
                    ],
                    [
                        'id' => '2',
                        'name' => 'Martin Mc Hugh',
                        'role' => 'Designated Liaison Person (DLP)',
                        'description' => 'The DLP is responsible for reporting allegations or suspicions of child abuse to TUSLA and/or An Garda Síochána.',
                        'email' => 'Chairperson.naomhmairtin.louth@gaa.ie',
                        'phone' => '+353 86 1975129',
                    ],
                ],
                'documents' => [
                    [
                        'id' => '1',
                        'title' => 'Safeguarding Statement 2026',
                        'fileUrl' => '/documents/safeguarding-2026.pdf',
                        'date' => '2026-01-15',
                    ],
                ],
                'steps' => [
                    ['title' => 'Report', 'description' => 'Inform the Children\'s Officer of any concerns immediately.'],
                    ['title' => 'Record', 'description' => 'Document all details of the incident as soon as possible.'],
                    ['title' => 'Review', 'description' => 'The concern will be reviewed by the club executive.'],
                    ['title' => 'Refer', 'description' => 'If necessary, the matter will be referred to statutory authorities.'],
                ],
                'helplines' => [
                    ['name' => 'Tusla', 'phone' => '01 123 4567'],
                    ['name' => 'Gardaí', 'phone' => '999/112'],
                ],
                'cta' => [
                    'title' => 'Need to Speak Privately?',
                    'description' => 'Our Children\'s Officer is available for confidential discussions.',
                    'buttonText' => 'Contact Mary',
                    'buttonLink' => 'mailto:childrensofficer.naomhmairtin.louth@gaa.ie',
                ],
            ],
            'sponsors' => [
                'hero_eyebrow' => 'Sponsors',
                'hero_title' => 'Sponsor Directory',
                'hero_description' => 'A full directory of club sponsors, with featured supporters highlighted across the wider site.',
                'section_eyebrow' => 'Our Sponsors',
                'section_title' => 'Every Sponsor In One Place',
                'section_description' => 'Please support the businesses and individuals who support Naomh Mairtin CPG.',
                'cta_title' => 'Become A Club Sponsor',
                'cta_description' => 'We offer sponsorship options for businesses at different levels while keeping visibility clear and structured.',
                'cta_button_text' => 'Get In Touch',
                'cta_button_link' => '/contact',
            ],
            'teams' => [
                'hero_title' => 'OUR TEAMS',
                'hero_subtitle' => 'Browse all sections of the club from adult football to juvenile pathways.',
                'hub_eyebrow' => 'Teams Hub',
                'hub_title' => 'Explore Team Sections',
                'hub_description' => 'Open the adult and juvenile pathways or follow the links to each team area.',
                'gallery_eyebrow' => 'Gallery',
                'gallery_title' => 'Gallery',
                'gallery_description' => 'Team photos and highlights will appear here as they are published.',
            ],
            'fixtures' => [
                'hero_title' => 'Fixtures & Results',
                'hero_subtitle' => 'Upcoming matches and the latest results from across the club.',
            ],
            'history' => [
                'hero_title' => 'Club History',
                'hero_subtitle' => 'Naomh Mairtin GAA - "The Jocks"',
                'intro_text' => 'Founded in 1957 in Monasterboice, Co. Louth, Naomh Mairtin GFC has become a leading football club in the county.',
                'milestones_eyebrow' => 'Key Milestones',
                'timeline_items' => [
                    ['id' => 'timeline-1', 'year' => '1957', 'title' => 'Club Foundation', 'description' => 'The club was founded in Monasterboice.', 'icon' => 'users', 'image' => ''],
                    ['id' => 'timeline-2', 'year' => '1980', 'title' => 'Junior Clean Sweep', 'description' => 'A landmark unbeaten year.', 'icon' => 'shield', 'image' => ''],
                    ['id' => 'timeline-3', 'year' => '2020', 'title' => 'First Senior Title', 'description' => 'Won the first Senior Championship title.', 'icon' => 'trophy', 'image' => ''],
                ],
                'figures_eyebrow' => 'Notable Figures',
                'figures_items' => [
                    ['id' => 'figure-1', 'name' => 'Sam Mulroy', 'role' => 'Louth Captain', 'detail' => 'Club and county leader.', 'image' => ''],
                    ['id' => 'figure-2', 'name' => 'Eoghan Callaghan', 'role' => 'Captain', 'detail' => 'Led the 2025 championship team.', 'image' => ''],
                    ['id' => 'figure-3', 'name' => 'Jim Mooney', 'role' => 'Club Legend', 'detail' => 'Part of the 1966 winning squad.', 'image' => ''],
                ],
                'cta_title' => 'Be part of our future',
                'cta_button_text' => 'Join the Club',
                'cta_button_link' => 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
            ],
            'events' => [
                'hero_title' => 'Club Events',
                'hero_subtitle' => 'Fixtures, meetings, and social gatherings.',
            ],
            'contact' => [
                'hero' => [
                    'title' => 'Get in Touch',
                    'subtitle' => "Have a question about membership, teams, or events? We'd love to hear from you.",
                ],
                'form' => [
                    'title' => 'Send us a Message',
                    'endpoint' => (string) config('contact.formspree_endpoint'),
                    'successMessage' => "Message sent successfully! We'll get back to you soon.",
                ],
                'contactInfo' => [
                    'clubGroundsTitle' => 'Club Grounds',
                    'clubGroundsAddress' => "Sillogue Lane,\nNewtown Monasterboice,\nCo. Louth, A92 H678",
                    'emailTitle' => 'Email Address',
                    'email' => 'secretary.naomhmairtin.louth@gaa.ie',
                    'facebookUrl' => 'https://www.facebook.com/NaomhMairtincpg/',
                    'instagramUrl' => 'https://www.instagram.com/naomhmairtin/',
                ],
                'mapQuery' => 'Naomh Mairtin CPG, Sillogue Lane, Newtown Monasterboice, Co. Louth',
            ],
            'juvenile-teams' => [
                'hero_title' => 'Juvenile Teams',
                'hero_subtitle' => 'Browse every juvenile team at Naomh Mairtin CPG',
                'intro_eyebrow' => 'Juvenile Pathway',
                'intro_title' => 'Juvenile Teams',
                'intro_description' => 'Browse the full juvenile setup below and open any card to view the team details.',
                'card_cta_text' => 'View Details',
                'modal_eyebrow' => 'Juvenile Team',
                'coaches_title' => 'Coaches',
                'no_coaches_text' => 'No coaches listed',
                'contact_email_title' => 'Contact Email',
                'training_times_title' => 'Training Times',
                'no_training_times_text' => 'Training times TBC',
            ],
            'lotto' => [
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
                'winners_section_title' => 'Prize Winners',
                'winners' => [],
                'how_it_works_title' => 'How the Lotto Works',
                'bottom_cta_title' => 'Support Your Club - Play the Lotto',
                'bottom_cta_description' => 'Every ticket purchased goes directly back into Naomh Mairtin CPG.',
            ],
            'membership' => [
                'description' => 'We have moved our membership and club communications to the ClubSpot app.',
                'app_store_link' => 'https://apps.apple.com/ie/app/clubspot/id1506101166',
                'google_play_link' => 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
                'poster' => '',
                'secretary_email' => 'secretary.naomhmairtin.louth@gaa.ie',
            ],
            'shop' => [
                'hero_eyebrow' => 'Official Club Stores',
                'hero_title' => 'Club Shop',
                'hero_highlight' => 'Shop',
                'hero_description' => 'Support Naomh Mairtin CPG by purchasing official gear and merchandise through our approved retail partners.',
                'info_title' => 'Need Help with an Order?',
                'info_description' => 'For queries about club orders, sizes, or custom printing, contact the club directly.',
                'info_button_text' => 'Contact the Club',
                'info_button_link' => '/contact',
                'shops' => [
                    [
                        'id' => 'shop-1',
                        'name' => 'Club Shop Partner',
                        'description' => 'Official Club Gear',
                        'detail' => 'The final online shop destination will be added by the club when available.',
                        'url' => '',
                        'image' => '',
                        'isLogo' => true,
                        'cta' => 'Link Coming Soon',
                        'isPlaceholder' => true,
                    ],
                    [
                        'id' => 'shop-2',
                        'name' => 'Future Supplier',
                        'description' => 'Coming Soon',
                        'detail' => 'We are always looking to expand our range of official club gear. Stay tuned for new partnerships and exciting new merchandise options.',
                        'url' => '',
                        'image' => '',
                        'isLogo' => false,
                        'cta' => 'Coming Soon',
                        'isPlaceholder' => true,
                    ],
                ],
            ],
        ];
    }

    private function getShopPageContent(): ShopPageContent
    {
        $content = ShopPageContent::query()->with('shops')->first();

        if ($content) {
            return $content;
        }

        return DB::transaction(function () {
            $content = ShopPageContent::query()->create(Arr::only($this->defaultPages()['shop'], [
                'hero_eyebrow',
                'hero_title',
                'hero_highlight',
                'hero_description',
                'info_title',
                'info_description',
                'info_button_text',
                'info_button_link',
            ]));

            $content->shops()->createMany(array_map(function (array $shop) {
                return [
                    'name' => $shop['name'],
                    'description' => $shop['description'],
                    'detail' => $shop['detail'],
                    'url' => $shop['url'],
                    'image' => $shop['image'] ?: null,
                    'is_logo' => $shop['isLogo'],
                    'cta' => $shop['cta'],
                    'is_placeholder' => $shop['isPlaceholder'],
                ];
            }, $this->defaultPages()['shop']['shops']));

            return $content->load('shops');
        });
    }

    private function updateShopPageContent(array $updates): ShopPageContent
    {
        $content = ShopPageContent::query()->with('shops')->first();

        if (! $content) {
            $content = $this->getShopPageContent();
        }

        $contentFields = [
            'hero_eyebrow',
            'hero_title',
            'hero_highlight',
            'hero_description',
            'info_title',
            'info_description',
            'info_button_text',
            'info_button_link',
        ];

        $content->fill(Arr::only($updates, $contentFields));
        $content->save();

        if (array_key_exists('shops', $updates) && is_array($updates['shops'])) {
            DB::transaction(function () use ($content, $updates) {
                $content->shops()->delete();

                $content->shops()->createMany(array_values(array_map(function (array $shop) {
                    return [
                        'name' => $shop['name'] ?? '',
                        'description' => $shop['description'] ?? '',
                        'detail' => $shop['detail'] ?? '',
                        'url' => $shop['url'] ?? '',
                        'image' => $shop['image'] ?? null,
                        'is_logo' => (bool) ($shop['isLogo'] ?? $shop['is_logo'] ?? false),
                        'cta' => $shop['cta'] ?? 'Visit Shop',
                        'is_placeholder' => (bool) ($shop['isPlaceholder'] ?? $shop['is_placeholder'] ?? false),
                        'order' => (int) ($shop['order'] ?? 0),
                    ];
                }, $updates['shops'])));
            });
        }

        return $content->load('shops');
    }
}
