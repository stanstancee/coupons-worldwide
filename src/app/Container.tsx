/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function CountryList() {
  const [countries, setCountries] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("/api/countries");
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  if (!countries) return <p>Loading...</p>;
 

  return (
    <div>
      <h1>Country Flags</h1>
      <ul>
        {Object.entries(countries).map(([code, country]) => (
          <li key={code}>
            <img
              src={country.image}
              alt={`${country.name} flag`}
              width={32}
              height={24}
            />
            <span>
              {country.name} ({country.emoji})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
