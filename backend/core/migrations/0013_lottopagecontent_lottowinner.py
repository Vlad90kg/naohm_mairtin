from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0012_shoppagecontent_shopitem"),
    ]

    operations = [
        migrations.CreateModel(
            name="LottoPageContent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("hero_eyebrow", models.CharField(default="Weekly Club Lotto", max_length=80)),
                ("hero_title", models.CharField(default="Club", max_length=120)),
                ("hero_highlight", models.CharField(default="Lotto", max_length=80)),
                ("hero_description", models.TextField(default="Play the Naomh Mairtin CPG weekly lotto and support your club. Every ticket helps fund our teams, facilities, and community.")),
                ("jackpot_label", models.CharField(default="Current Jackpot", max_length=80)),
                ("jackpot_amount", models.CharField(default="EUR8,500", max_length=40)),
                ("next_draw_label", models.CharField(default="Draw", max_length=80)),
                ("next_draw_date", models.CharField(default="Every Monday Night", max_length=120)),
                ("buy_tickets_url", models.URLField(default="https://member.clubspot.app/club/naomh-mairtin-gaa/fundraisers")),
                ("buy_tickets_text", models.CharField(default="Buy Lotto Tickets Online", max_length=120)),
                ("app_download_url", models.URLField(default="https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc")),
                ("app_download_text", models.CharField(default="Download ClubSpot App", max_length=120)),
                ("helper_text", models.TextField(default="Online purchase is the quickest option. App download remains available below as a secondary action.")),
                ("latest_results_title", models.CharField(default="Latest Draw Results", max_length=120)),
                ("latest_draw_date", models.CharField(default="Monday 24th March 2025", max_length=120)),
                ("winning_number_1", models.PositiveSmallIntegerField(default=7)),
                ("winning_number_2", models.PositiveSmallIntegerField(default=14)),
                ("winning_number_3", models.PositiveSmallIntegerField(default=21)),
                ("winning_number_4", models.PositiveSmallIntegerField(default=28)),
                ("jackpot_won", models.BooleanField(default=False)),
                ("latest_jackpot_amount", models.CharField(default="EUR8,500", max_length=40)),
                ("winners_section_title", models.CharField(default="Prize Winners", max_length=120)),
                ("how_it_works_title", models.CharField(default="How the Lotto Works", max_length=120)),
                ("bottom_cta_title", models.CharField(default="Support Your Club - Play the Lotto", max_length=200)),
                ("bottom_cta_description", models.TextField(default="Every ticket purchased goes directly back into Naomh Mairtin CPG. Your support keeps our club, pitches, and community programmes running.")),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Lotto page content",
                "verbose_name_plural": "Lotto page content",
            },
        ),
        migrations.CreateModel(
            name="LottoWinner",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("prize", models.CharField(max_length=120)),
                ("winner", models.CharField(max_length=200)),
                ("amount", models.CharField(max_length=40)),
                ("order", models.PositiveIntegerField(default=0)),
                ("page", models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="winners", to="core.lottopagecontent")),
            ],
            options={"ordering": ["order", "id"]},
        ),
    ]
