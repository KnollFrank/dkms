"""dkmsproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend import views
from django.conf.urls import url
from backend.views import DonorViewSet
from rest_framework import renderers
from rest_framework.urlpatterns import format_suffix_patterns

donor_list = DonorViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

donor_detail = DonorViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('admin/', admin.site.urls),
    path(r'api/backend/', donor_list, name='donor-list'),
    path(r'api/backend/<int:pk>', donor_detail, name='donor-detail'),
    url(r'^api/backend/ancestry_choices$', views.get_ancestry_choices),
])
