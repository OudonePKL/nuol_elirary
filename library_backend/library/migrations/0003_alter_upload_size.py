# Generated by Django 5.0.4 on 2024-05-01 04:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("library", "0002_alter_download_size"),
    ]

    operations = [
        migrations.AlterField(
            model_name="upload",
            name="size",
            field=models.CharField(max_length=10, verbose_name="Book size"),
        ),
    ]