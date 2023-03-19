import keyBy from "lodash/keyBy";

import { getPlantKey } from "./plant-key-utils";

export async function fetchPlantsMap(): Promise<Record<string, Plant>> {
  const res = await fetch(
    "https://foldaway.github.io/toxic-plant-list-scraper/toxicPlants.json"
  );
  const plants = await res.json();
  const plantsMap = keyBy(plants, (plant: Plant) => getPlantKey(plant));

  return plantsMap;
}
