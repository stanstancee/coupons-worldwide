const countries = [
  { name: "United States", percentage: "48%", flag: "us" },
  { name: "United Kingdom", percentage: "48%", flag: "gb" },
  { name: "Switzerland", percentage: "48%", flag: "ch" },
  { name: "Switzerland", percentage: "48%", flag: "ch" },
  { name: "Nigeria", percentage: "48%", flag: "ng" },
];

export function TopCountries() {
  return (
    <div className="">
      <h3 className="mb-4 text-lg lg:text-xl font-bold lg:mb-6">Top Countries</h3>
      <div className="space-y-8">
        {countries.map((country) => (
          <div key={country.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={`https://flagcdn.com/w40/${country.flag}.png`}
                alt={country.name}
                className="mr-3 h-6 w-9 xl:h-8 xl:w-11 rounded"
              />
              <span>{country.name}</span>
            </div>
            <span className="font-bold md:text-xl text-primary">
              {country.percentage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
