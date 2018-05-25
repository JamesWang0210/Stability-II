# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Beam(models.Model):
    Beam_Width = models.FloatField(max_length=10)
    Beam_Height = models.FloatField(max_length=10)
    Beam_Shear = models.FloatField(max_length=10)
    Beam_Moment = models.FloatField(max_length=10)


class Column(models.Model):
    Column_Width = models.FloatField(max_length=10)
    Column_Thickness = models.FloatField(max_length=10)
    Column_Axial = models.FloatField(max_length=10)
