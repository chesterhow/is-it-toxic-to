import { Command } from "cmdk";
import { useRouter } from "next/router";

import { ANIMAL_EMOJI_MAP } from "../../constants";
import { encodePlantKey, getPlantKey } from "../../utils/plant-key-utils";

type CommandBarItemProps = {
  plant: Plant;
};

export function CommandBarItem({ plant }: CommandBarItemProps) {
  const router = useRouter();

  function handleSelect(plantKey: string) {
    const encodedPlantKey = encodePlantKey(plantKey);

    // Leads back to home page using query param + masked pathname.
    router.push(
      {
        pathname: "/",
        query: { plant: encodedPlantKey },
      },
      `/plants/${encodedPlantKey}`,
      { shallow: true }
    );
  }

  return (
    <Command.Item
      value={getPlantKey(plant)}
      className="group flex cursor-pointer items-center justify-between gap-x-3 rounded-md px-4 py-2 aria-selected:bg-neutral-100"
      onSelect={handleSelect}
    >
      <div className="flex min-w-0 grow flex-col gap-x-3 sm:flex-row">
        <span className="truncate">{plant.name}</span>
        <span className="grow truncate text-neutral-400 sm:block">
          {plant.scientificName}
        </span>
      </div>
      <span className="whitespace-nowrap rounded-full bg-red-200 px-1">
        {plant.toxicTo.map((animal) => ANIMAL_EMOJI_MAP[animal])}
      </span>
    </Command.Item>
  );
}
