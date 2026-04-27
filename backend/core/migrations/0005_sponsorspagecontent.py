from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_alter_sponsor_options"),
    ]

    operations = [
        migrations.CreateModel(
            name="SponsorsPageContent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("hero_eyebrow", models.CharField(default="Sponsors", max_length=80)),
                ("hero_title", models.CharField(default="Sponsor Directory", max_length=200)),
                (
                    "hero_description",
                    models.TextField(
                        default="A full directory of club sponsors, with featured supporters highlighted across the wider site."
                    ),
                ),
                ("section_eyebrow", models.CharField(default="Our Sponsors", max_length=80)),
                ("section_title", models.CharField(default="Every Sponsor In One Place", max_length=200)),
                (
                    "section_description",
                    models.TextField(
                        default="Please support the businesses and individuals who support Naomh Mairtin CPG."
                    ),
                ),
                ("cta_title", models.CharField(default="Become A Club Sponsor", max_length=200)),
                (
                    "cta_description",
                    models.TextField(
                        default="We offer sponsorship options for businesses at different levels while keeping visibility clear and structured."
                    ),
                ),
                ("cta_button_text", models.CharField(default="Get In Touch", max_length=80)),
                ("cta_button_link", models.CharField(default="/contact", max_length=255)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Sponsors page content",
                "verbose_name_plural": "Sponsors page content",
            },
        ),
    ]
