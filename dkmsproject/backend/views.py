from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Donor, AdditionalInformation
from .serializers import DonorSerializer

class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


@api_view(['GET'])
def get_ancestry_choices(request):
    return Response(AdditionalInformation.ANCESTRY_CHOICES)
