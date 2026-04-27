from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0011_historypagecontent_items"),
    ]

    operations = [
        migrations.CreateModel(
            name="ShopPageContent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("hero_eyebrow", models.CharField(default="Official Club Stores", max_length=80)),
                ("hero_title", models.CharField(default="Club Shop", max_length=200)),
                ("hero_highlight", models.CharField(default="Shop", max_length=80)),
                (
                    "hero_description",
                    models.TextField(
                        default="Support Naomh Mairtin CPG by purchasing official gear and merchandise through our approved retail partners."
                    ),
                ),
                ("info_title", models.CharField(default="Need Help with an Order?", max_length=200)),
                (
                    "info_description",
                    models.TextField(
                        default="For queries about club orders, sizes, or custom printing, contact the club directly or reach out to our retail partners using the links above."
                    ),
                ),
                ("info_button_text", models.CharField(default="Contact the Club", max_length=80)),
                ("info_button_link", models.CharField(default="/contact", max_length=255)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Shop page content",
                "verbose_name_plural": "Shop page content",
            },
        ),
        migrations.CreateModel(
            name="ShopItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("description", models.CharField(max_length=200)),
                ("detail", models.TextField(blank=True)),
                ("url", models.URLField(blank=True)),
                ("image", models.ImageField(blank=True, null=True, upload_to="shops/")),
                ("is_logo", models.BooleanField(default=False)),
                ("cta", models.CharField(default="Visit Shop", max_length=80)),
                ("is_placeholder", models.BooleanField(default=False)),
                ("order", models.PositiveIntegerField(default=0)),
                (
                    "page",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="shops", to="core.shoppagecontent"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
    ]
