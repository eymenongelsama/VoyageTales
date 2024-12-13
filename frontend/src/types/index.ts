export type TravelGroup = 'Solo' | 'Family' | 'Friends' | 'Couples' | 'Retired Couples' | 'Digital Nomads';

export type HolidayType = 
  | 'Short Term Holiday'
  | 'Medium Term Accommodation'
  | 'Long Term Settlement'
  | 'Seasonal Escape'
  | 'Business Focused';

export interface UserPreferences {
  travelGroup: TravelGroup | null;
  holidayType: HolidayType | null;
}