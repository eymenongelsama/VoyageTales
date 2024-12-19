
from django.contrib import admin
from .models import Country, Criteria, CountryCriteria
from django.utils.html import format_html

class CountryCriteriaInline(admin.TabularInline):
    model = CountryCriteria
    extra = 20  # Varsayılan olarak 20 boş alan göster
    

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name','match_percentage', 'image_thumbnail']

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"

    image_thumbnail.short_description = "Image"

admin.site.register(Criteria)
admin.site.register(CountryCriteria)