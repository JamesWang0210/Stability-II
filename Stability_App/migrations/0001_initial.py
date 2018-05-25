# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-09 23:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Beam_Width', models.FloatField()),
                ('Beam_Height', models.FloatField()),
                ('Beam_Shear', models.FloatField()),
                ('Beam_Moment', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Column',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Column_Width', models.FloatField()),
                ('Column_Thickness', models.FloatField()),
                ('Column_Axial', models.FloatField()),
            ],
        ),
    ]
