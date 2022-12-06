import { ANIMAL_EMOJI_MAP } from "../constants";

export function getMetaDescription(plant: Plant): string {
  const animals = plant.toxicTo
    .map((animal) => ANIMAL_EMOJI_MAP[animal])
    .join("");
  return `${plant.name} (${plant.scientificName}) is toxic to ${animals}.${
    plant.clinicalSigns !== null
      ? ` Clinical Signs: ${plant.clinicalSigns}`
      : ""
  }`;
}
