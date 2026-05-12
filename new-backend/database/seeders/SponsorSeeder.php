<?php

namespace Database\Seeders;

use App\Enums\SponsorTier;
use App\Models\Sponsor;
use Illuminate\Database\Seeder;

class SponsorSeeder extends Seeder
{
    public function run(): void
    {
        $sponsors = [
            [
                'name' => 'The Monasterboice Inn - Donegans',
                'website' => 'https://monasterboice-inn.ie/',
                'tier' => SponsorTier::Gold,
                'logo' => 'sponsors/monastraboice-logo.png',
                'is_active' => true,
            ],
            [
                'name' => 'Assist Electrical',
                'website' => 'https://www.assistelectrical.ie/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/assist electrical service.png',
                'is_active' => true,
            ],
            [
                'name' => 'Jim Farrell Financial',
                'website' => 'https://www.linkedin.com/in/jim-farrell-qfa-rpa-apa-55546715/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/jim farrel.png',
                'is_active' => true,
            ],
            [
                'name' => 'Lennon Solar',
                'website' => 'https://lennon.ie/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/lennon solar logo.png',
                'is_active' => true,
            ],
            [
                'name' => 'Tullyallen Pharmacy Ltd',
                'website' => 'https://www.tullyallenpharmacy.ie/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/slane pharmacy tullyallen pharmacy.png',
                'is_active' => true,
            ],
            [
                'name' => 'JP Rooney / Trinity Finances',
                'website' => 'https://trinityfinances.com/about-us/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/trinity finance.png',
                'is_active' => true,
            ],
            [
                'name' => 'Physio Performance',
                'website' => 'https://www.physioperformance.ie/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/phisio performance.png',
                'is_active' => true,
            ],
            [
                'name' => 'Belview Egg Farm Ltd',
                'website' => 'https://belview.ie/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/belview egg.png',
                'is_active' => true,
            ],
            [
                'name' => 'Ashcroft Developments',
                'website' => 'https://ashcroftdevelopments.com/',
                'tier' => SponsorTier::Silver,
                'logo' => 'sponsors/ashcroft developments.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Campbells Build & Pave',
                'website' => 'https://www.campbellsbuildandpave.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/campells build and pave logo.png',
                'is_active' => true,
            ],
            [
                'name' => 'Maths Plantations',
                'website' => 'https://mathsplantations.com/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/mathsplantations_logo.png',
                'is_active' => true,
            ],
            [
                'name' => 'Drogheda Hire',
                'website' => 'https://www.dhscompletehire.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/drogheda hire.png',
                'is_active' => true,
            ],
            [
                'name' => "Tony O'Brien",
                'website' => '#',
                'tier' => SponsorTier::Bronze,
                'logo' => "sponsors/tony o'brien.png",
                'is_active' => true,
            ],
            [
                'name' => 'Drogheda Credit Union Ltd',
                'website' => 'https://droghedacu.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/drogheda credit union.png',
                'is_active' => true,
            ],
            [
                'name' => 'Declan Branigan Designs Ltd',
                'website' => 'http://declanbranigandesign.com/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/declan branigan.png',
                'is_active' => true,
            ],
            [
                'name' => 'Callanan Autos',
                'website' => 'https://www.callananautos.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/calanan autos logo.png',
                'is_active' => true,
            ],
            [
                'name' => 'Jason Fahy Heating Ltd',
                'website' => 'https://jasonfahyheating.com/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/jason-fahy-heating-ico.png',
                'is_active' => true,
            ],
            [
                'name' => 'LC Blinds Ltd',
                'website' => 'https://www.lcblinds.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/LC Blinds & Interiors logo design.png',
                'is_active' => true,
            ],
            [
                'name' => 'Eleanor Kelly',
                'website' => 'https://www.eleanorkellyandco.com/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/eleanor kelly.png',
                'is_active' => true,
            ],
            [
                'name' => 'SMF',
                'website' => 'https://www.smfmotorfactors.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/smf-logo.png',
                'is_active' => true,
            ],
            [
                'name' => 'Tenure Stores',
                'website' => 'https://www.facebook.com/p/XL-Tenure-Stores-100057847171636/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/tenure.png',
                'is_active' => true,
            ],
            [
                'name' => 'Devine Building Services Ltd',
                'website' => 'https://www.devinebuilding.ie/',
                'tier' => SponsorTier::Bronze,
                'logo' => 'sponsors/devinebuilding.png',
                'is_active' => true,
            ],
        ];

        foreach ($sponsors as $sponsor) {
            Sponsor::query()->updateOrCreate(
                ['name' => $sponsor['name']],
                $sponsor,
            );
        }
    }
}
