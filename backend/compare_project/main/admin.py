
from django.contrib import admin
from .models import Country, Criteria, CountryCriteria


class CountryCriteriaInline(admin.TabularInline):
    model = CountryCriteria
    extra = 20  # Varsayılan olarak 20 boş alan göster
    
    
@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'match_percentage', 'image_url')


admin.site.register(Criteria)
admin.site.register(CountryCriteria)