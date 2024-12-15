from django.db import models

# 1. Criteria Modeli
class Criteria(models.Model):
    name = models.CharField(max_length=255)  # Kriter adı (ör. Güvenlik & Suç Oranları)
    score = models.IntegerField(default=0)   # Kriter puanı (1-10 arasında bir değer)

    def __str__(self):
        return self.name

class Country(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Ülke adı
    criteria = models.ManyToManyField(Criteria, through='CountryCriteria')  # Kriterler ile ilişki
    description = models.TextField(null=True, blank=True)  # Ülke açıklaması (isteğe bağlı)
    match_percentage = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=0.0  # Varsayılan değeri burada belirtiyoruz
    )
    overall_score = models.FloatField(default=0.0)  # Genel puan (1-5 arasında)
    image_url = models.ImageField(
        upload_to="countries/",
        default="defaults/default_world_image.jpg",  # Varsayılan görsel yolu
    )

    def __str__(self):
        return self.name

class CountryCriteria(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    criteria = models.ForeignKey(Criteria, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)  # Bu kriterin ülkeye özgü puanı

    def __str__(self):
        return f"{self.country.name} - {self.criteria.name} ({self.score})"
    
    
    
class CountryFeature(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='features')
    feature = models.CharField(max_length=255)  # Özellik adı (ör. "Zengin Kültür", "Sahil Hayatı")

    def __str__(self):
        return f"{self.country.name} - {self.feature}"