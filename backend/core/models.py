from django.db import models


class Sponsor(models.Model):
    TIER_CHOICES = [
        ("gold", "Gold"),
        ("silver", "Silver"),
        ("bronze", "Bronze"),
    ]

    name = models.CharField(max_length=100)
    website = models.URLField(blank=True)
    logo = models.FileField(upload_to="sponsors/", blank=True)
    tier = models.CharField(max_length=20, choices=TIER_CHOICES)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["tier", "name"]

    def __str__(self):
        return self.name

    @property
    def logo_url(self):
        logo_name = str(self.logo or "")
        if not logo_name:
            return ""
        if logo_name.startswith("http://") or logo_name.startswith("https://"):
            return logo_name
        return self.logo.url


class SponsorsPageContent(models.Model):
    hero_eyebrow = models.CharField(max_length=80, default="Sponsors")
    hero_title = models.CharField(max_length=200, default="Sponsor Directory")
    hero_description = models.TextField(
        default="A full directory of club sponsors, with featured supporters highlighted across the wider site."
    )
    section_eyebrow = models.CharField(max_length=80, default="Our Sponsors")
    section_title = models.CharField(max_length=200, default="Every Sponsor In One Place")
    section_description = models.TextField(
        default="Please support the businesses and individuals who support Naomh Mairtin CPG."
    )
    cta_title = models.CharField(max_length=200, default="Become A Club Sponsor")
    cta_description = models.TextField(
        default="We offer sponsorship options for businesses at different levels while keeping visibility clear and structured."
    )
    cta_button_text = models.CharField(max_length=80, default="Get In Touch")
    cta_button_link = models.CharField(max_length=255, default="/contact")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sponsors page content"
        verbose_name_plural = "Sponsors page content"

    def __str__(self):
        return "Sponsors page content"


class TeamsPageContent(models.Model):
    hero_title = models.CharField(max_length=200, default="OUR TEAMS")
    hero_subtitle = models.TextField(
        default="Use this page as the club teams hub, with direct links to each section and a gallery that stays here on the main teams page"
    )
    hub_eyebrow = models.CharField(max_length=80, default="Teams Hub")
    hub_title = models.CharField(max_length=200, default="Explore Team Sections")
    hub_description = models.TextField(
        default="Each area below links to its own dedicated page. Adult Teams, Juvenile Teams, Social, and Scór now live as separate destinations, while the gallery remains here on the main Teams page."
    )
    # Fields for the 4 main hub links
    adult_title = models.CharField(max_length=100, default="Adult Teams")
    adult_description = models.TextField(default="Browse the adult football section, including links onward to the senior men, senior ladies, and social overview pages.")
    juvenile_title = models.CharField(max_length=100, default="Juvenile Teams")
    juvenile_description = models.TextField(default="Open the juvenile pathway page to view the full structure of teams and the current placeholder team details layout.")
    social_title = models.CharField(max_length=100, default="Social")
    social_description = models.TextField(default="Visit the social section for direct access to G4MO, G4DL, and Furious but not Fast.")
    scor_title = models.CharField(max_length=100, default="Scór")
    scor_description = models.TextField(default="Explore the dedicated Scór page for the cultural side of the club, including music, performance, storytelling, and quiz activity.")
    
    gallery_eyebrow = models.CharField(max_length=80, default="Gallery")
    gallery_title = models.CharField(max_length=200, default="Gallery")
    gallery_description = models.TextField(
        default="The gallery remains on the main Teams page and can continue to showcase images from across every section of the club."
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Teams page content"
        verbose_name_plural = "Teams page content"

    def __str__(self):
        return "Teams page content"


class FixturesPageContent(models.Model):
    hero_title = models.CharField(max_length=200, default="Fixtures & Results")
    hero_subtitle = models.TextField(default="Upcoming matches and latest final scores")
    
    upcoming_title = models.CharField(max_length=200, default="Upcoming Fixtures")
    upcoming_subtitle = models.CharField(max_length=200, default="Sorted By Date")
    
    results_title = models.CharField(max_length=200, default="Latest Results")
    results_subtitle = models.CharField(max_length=200, default="Most Recent Finals First")
    
    archive_cta_title = models.CharField(max_length=200, default="Need the full results archive?")
    archive_cta_description = models.TextField(default="Browse all recorded match results and use the built-in filters to find a specific team or category quickly.")
    archive_cta_button_text = models.CharField(max_length=100, default="View Results Archive")
    
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Fixtures page content"
        verbose_name_plural = "Fixtures page content"

    def __str__(self):
        return "Fixtures page content"


class HistoryPageContent(models.Model):
    hero_title = models.CharField(max_length=200, default="Club History")
    hero_subtitle = models.CharField(max_length=200, default='Naomh Mairtin GAA - "The Jocks"')
    intro_text = models.TextField(
        default="Founded in 1957 in Monasterboice, Co. Louth, Naomh Mairtin GFC has risen to become a dominant force in Louth football, achieving historic success with three Senior Championship titles in the 2020s."
    )
    milestones_eyebrow = models.CharField(max_length=80, default="Key Milestones")
    figures_eyebrow = models.CharField(max_length=80, default="Notable Figures")
    cta_title = models.CharField(max_length=200, default="Be part of our future")
    cta_button_text = models.CharField(max_length=80, default="Join the Club")
    cta_button_link = models.CharField(
        max_length=255,
        default="https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "History page content"
        verbose_name_plural = "History page content"

    def __str__(self):
        return "History page content"


class HistoryTimelineItem(models.Model):
    ICON_CHOICES = [
        ("users", "Users"),
        ("shield", "Shield"),
        ("star", "Star"),
        ("trophy", "Trophy"),
        ("award", "Award"),
    ]

    page = models.ForeignKey(HistoryPageContent, on_delete=models.CASCADE, related_name="timeline_items")
    year = models.CharField(max_length=40)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default="users")
    image = models.ImageField(
        upload_to="history/timeline/",
        blank=True,
        null=True,
        help_text="Upload a square image around 800x800 pixels.",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.year} - {self.title}"


class HistoryFigureItem(models.Model):
    page = models.ForeignKey(HistoryPageContent, on_delete=models.CASCADE, related_name="figures_items")
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    detail = models.TextField()
    image = models.ImageField(
        upload_to="history/figures/",
        blank=True,
        null=True,
        help_text="Upload a square image around 800x800 pixels.",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class ShopPageContent(models.Model):
    hero_eyebrow = models.CharField(max_length=80, default="Official Club Stores")
    hero_title = models.CharField(max_length=200, default="Club Shop")
    hero_highlight = models.CharField(max_length=80, default="Shop")
    hero_description = models.TextField(
        default="Support Naomh Mairtin CPG by purchasing official gear and merchandise through our approved retail partners."
    )
    info_title = models.CharField(max_length=200, default="Need Help with an Order?")
    info_description = models.TextField(
        default="For queries about club orders, sizes, or custom printing, contact the club directly or reach out to our retail partners using the links above."
    )
    info_button_text = models.CharField(max_length=80, default="Contact the Club")
    info_button_link = models.CharField(max_length=255, default="/contact")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Shop page content"
        verbose_name_plural = "Shop page content"

    def __str__(self):
        return "Shop page content"


class ShopItem(models.Model):
    page = models.ForeignKey(ShopPageContent, on_delete=models.CASCADE, related_name="shops")
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    detail = models.TextField(blank=True)
    url = models.URLField(blank=True)
    image = models.ImageField(upload_to="shops/", blank=True, null=True)
    is_logo = models.BooleanField(default=False)
    cta = models.CharField(max_length=80, default="Visit Shop")
    is_placeholder = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class LottoPageContent(models.Model):
    hero_eyebrow = models.CharField(max_length=80, default="Weekly Club Lotto")
    hero_title = models.CharField(max_length=120, default="Club")
    hero_highlight = models.CharField(max_length=80, default="Lotto")
    hero_description = models.TextField(
        default="Play the Naomh Mairtin CPG weekly lotto and support your club. Every ticket helps fund our teams, facilities, and community."
    )
    jackpot_label = models.CharField(max_length=80, default="Current Jackpot")
    jackpot_amount = models.CharField(max_length=40, default="EUR8,500")
    next_draw_label = models.CharField(max_length=80, default="Draw")
    next_draw_date = models.CharField(max_length=120, default="Every Monday Night")
    buy_tickets_url = models.URLField(default="https://member.clubspot.app/club/naomh-mairtin-gaa/fundraisers")
    buy_tickets_text = models.CharField(max_length=120, default="Buy Lotto Tickets Online")
    app_download_url = models.URLField(default="https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc")
    app_download_text = models.CharField(max_length=120, default="Download ClubSpot App")
    helper_text = models.TextField(
        default="Online purchase is the quickest option. App download remains available below as a secondary action."
    )
    latest_results_title = models.CharField(max_length=120, default="Latest Draw Results")
    latest_draw_date = models.CharField(max_length=120, default="Monday 24th March 2025")
    winning_number_1 = models.PositiveSmallIntegerField(default=7)
    winning_number_2 = models.PositiveSmallIntegerField(default=14)
    winning_number_3 = models.PositiveSmallIntegerField(default=21)
    winning_number_4 = models.PositiveSmallIntegerField(default=28)
    jackpot_won = models.BooleanField(default=False)
    latest_jackpot_amount = models.CharField(max_length=40, default="EUR8,500")
    winners_section_title = models.CharField(max_length=120, default="Prize Winners")
    how_it_works_title = models.CharField(max_length=120, default="How the Lotto Works")
    bottom_cta_title = models.CharField(max_length=200, default="Support Your Club - Play the Lotto")
    bottom_cta_description = models.TextField(
        default="Every ticket purchased goes directly back into Naomh Mairtin CPG. Your support keeps our club, pitches, and community programmes running."
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Lotto page content"
        verbose_name_plural = "Lotto page content"

    def __str__(self):
        return "Lotto page content"


class LottoWinner(models.Model):
    page = models.ForeignKey(LottoPageContent, on_delete=models.CASCADE, related_name="winners")
    prize = models.CharField(max_length=120)
    winner = models.CharField(max_length=200)
    amount = models.CharField(max_length=40)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.prize} - {self.winner}"


class JuvenileTeamsPageContent(models.Model):
    hero_title = models.CharField(max_length=200, default="Juvenile Teams")
    hero_subtitle = models.TextField(default="Browse every juvenile team at Naomh Mairtin CPG")
    intro_eyebrow = models.CharField(max_length=80, default="Juvenile Pathway")
    intro_title = models.CharField(max_length=200, default="Juvenile Teams")
    intro_description = models.TextField(
        default="Browse the full juvenile setup below and open any card to view the team details."
    )
    card_cta_text = models.CharField(max_length=80, default="View Details")
    modal_eyebrow = models.CharField(max_length=80, default="Juvenile Team")
    coaches_title = models.CharField(max_length=80, default="Coaches")
    no_coaches_text = models.CharField(max_length=120, default="No coaches listed")
    contact_email_title = models.CharField(max_length=80, default="Contact Email")
    training_times_title = models.CharField(max_length=80, default="Training Times")
    no_training_times_text = models.CharField(max_length=120, default="Training times TBC")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Juvenile teams page content"
        verbose_name_plural = "Juvenile teams page content"

    def __str__(self):
        return "Juvenile teams page content"


class Team(models.Model):
    CATEGORY_CHOICES = [
        ("adult", "Adult"),
        ("juvenile", "Juvenile"),
        ("ladies", "Ladies"),
    ]

    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to="teams/", blank=True, null=True)
    managers = models.JSONField(default=list, blank=True)
    training_times = models.JSONField(default=list, blank=True)
    contact_email = models.EmailField(blank=True, null=True)
    is_internal = models.BooleanField(default=False, help_text="Set to True for club teams that should appear on the Teams page.")

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return self.name


class ClubTeam(Team):
    class Meta:
        proxy = True
        verbose_name = "Club team"
        verbose_name_plural = "Club teams"


class OpponentClub(Team):
    class Meta:
        proxy = True
        verbose_name = "Opponent club"
        verbose_name_plural = "Opponent clubs"


class Fixture(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name="home_fixtures")
    away_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name="away_fixtures")
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    competition = models.CharField(max_length=255)

    class Meta:
        ordering = ["date", "id"]

    def __str__(self):
        return f"{self.home_team} vs {self.away_team}"


class Result(models.Model):
    STATUS_CHOICES = [
        ("final", "Final"),
        ("postponed", "Postponed"),
        ("abandoned", "Abandoned"),
    ]

    fixture = models.OneToOneField(Fixture, on_delete=models.CASCADE, related_name="result")
    home_score = models.CharField(max_length=20)
    away_score = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="final")

    class Meta:
        ordering = ["-fixture__date", "-id"]

    def __str__(self):
        return f"{self.fixture}: {self.home_score} - {self.away_score}"


class EventsPageContent(models.Model):
    hero_title = models.CharField(max_length=200, default="Club Events")
    hero_subtitle = models.TextField(default="Fixtures, meetings, and social gatherings.")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Events page content"
        verbose_name_plural = "Events page content"

    def __str__(self):
        return "Events page content"


class Event(models.Model):
    CATEGORY_CHOICES = [
        ("Matches", "Matches"),
        ("Club Events", "Club Events"),
        ("Training", "Training"),
    ]
    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Club Events")
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="events/", blank=True, null=True)

    class Meta:
        ordering = ["date", "time"]

    def __str__(self):
        return self.title
