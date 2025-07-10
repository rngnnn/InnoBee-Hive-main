import { useState, useEffect } from 'react';
import countries from 'countries-and-timezones';

interface TimezoneOption {
  value: string;
  label: string;
}

const useTimezones = (selectedCountry: string): TimezoneOption[] => {
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const countryData = countries.getCountry(selectedCountry);
      const tzList = countryData?.timezones || [];
      setTimezones(tzList);
    } else {
      setTimezones([]); // Clear timezones if no country is selected
    }
  }, [selectedCountry]);

  const timezoneOptions: TimezoneOption[] = timezones.map((tz) => ({ value: tz, label: tz }));
  return timezoneOptions;
};

export default useTimezones;