from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0013_lottopagecontent_lottowinner"),
    ]

    operations = [
        migrations.CreateModel(
            name="JuvenileTeamsPageContent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("hero_title", models.CharField(default="Juvenile Teams", max_length=200)),
                ("hero_subtitle", models.TextField(default="Browse every juvenile team at Naomh Mairtin CPG")),
                ("intro_eyebrow", models.CharField(default="Juvenile Pathway", max_length=80)),
                ("intro_title", models.CharField(default="Juvenile Teams", max_length=200)),
                ("intro_description", models.TextField(default="Browse the full juvenile setup below and open any card to view the team details.")),
                ("card_cta_text", models.CharField(default="View Details", max_length=80)),
                ("modal_eyebrow", models.CharField(default="Juvenile Team", max_length=80)),
                ("coaches_title", models.CharField(default="Coaches", max_length=80)),
                ("no_coaches_text", models.CharField(default="No coaches listed", max_length=120)),
                ("contact_email_title", models.CharField(default="Contact Email", max_length=80)),
                ("training_times_title", models.CharField(default="Training Times", max_length=80)),
                ("no_training_times_text", models.CharField(default="Training times TBC", max_length=120)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Juvenile teams page content",
                "verbose_name_plural": "Juvenile teams page content",
            },
        ),
    ]
