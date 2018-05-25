# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from models import Beam, Column
from django.http import HttpResponse, JsonResponse
# from django.shortcuts import render

# Create your views here.


def check_force(request):
    beam_width = request.GET.get('Beam_Width')
    beam_height = request.GET.get('Beam_Height')
    beam_shear = request.GET.get('Beam_Shear')
    beam_moment = request.GET.get('Beam_Moment')
    column_width = request.GET.get('Column_Width')
    column_thick = request.GET.get('Column_Thickness')
    column_axial = request.GET.get('Column_Axial')

    bw = float(beam_width)
    bh = float(beam_height)
    bs = float(beam_shear)
    bm = float(beam_moment)
    cw = float(column_width)
    ct = float(column_thick)
    ca = float(column_axial)

    print (bw, bh, bs, bm, cw, ct, ca)

    beams = Beam.objects.all()
    columns = Column.objects.all()

    s1 = ''
    s2 = ''
    s3 = ''

    for beam in beams:
        if bw == beam.Beam_Width and bh == beam.Beam_Height:
            if bm <= beam.Beam_Moment and bs <= beam.Beam_Shear:
                s1 = 'OK'
                s2 = 'OK'
                break
            elif bm <= beam.Beam_Moment and bs > beam.Beam_Shear:
                s1 = 'OK'
                s2 = 'Failed'
                break
            elif bm > beam.Beam_Moment and bs <= beam.Beam_Shear:
                s1 = 'Failed'
                s2 = 'OK'
                break
            else:
                s1 = 'Failed'
                s2 = 'Failed'
                break
        else:
            continue

    for column in columns:
        if cw == column.Column_Width and ct == column.Column_Thickness:
            if ca <= column.Column_Axial:
                s3 = 'OK'
                break
            else:
                s3 = 'Failed'
                break

    result = {
        'Moment': s1,
        'Shear': s2,
        'Axial': s3
    }

    return JsonResponse(result)
