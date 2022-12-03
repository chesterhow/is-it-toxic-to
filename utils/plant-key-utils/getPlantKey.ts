export function getPlantKey(plant: Plant): string {
  return `${plant.name} ${plant.scientificName}`.replace(".", "").toLowerCase();
}
