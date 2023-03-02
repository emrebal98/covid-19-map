import geoJSON from "../../geo.json";

/**
 * Get country name from country ID
 * @param countryID Country ID
 * @returns Country name
 */
function getCountryName(countryID: string) {
  const geos = geoJSON.objects.world.geometries;
  const geo = geos.find((c) => c.id === countryID.toUpperCase());
  if (!geo) return null;
  return geo.properties.name;
}

export { getCountryName };
