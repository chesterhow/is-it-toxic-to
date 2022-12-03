export function getPlantKey(plant: Plant): string {
  return `${plant.name} ${plant.scientificName}`.toLowerCase();
}
