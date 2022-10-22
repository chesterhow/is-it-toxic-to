import { Command } from "cmdk";
import keyBy from "lodash/keyBy";
import { useEffect, useMemo, useRef, useState } from "react";

type HomePageProps = {
  plantsMap: Record<string, Plant>;
};

export default function Home({ plantsMap }: HomePageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const plants = useMemo(() => Object.values(plantsMap), [plantsMap]);
  const [value, setValue] = useState(Object.keys(plantsMap)[0]);
  const [activePlant, setActivePlant] = useState<Plant>(plantsMap[value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActivePlant(plantsMap[value]);
  }, [plantsMap, value]);

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <div className="bg-neutral-50 rounded-2xl p-10">
        <div className="flex flex-col gap-y-4 max-w-screen-md m-auto">
          <h1 className="text-center">🪴 Is It Toxic To?</h1>

          <Command
            label="Hello"
            className="flex flex-col items-stretch bg-white rounded-xl overflow-hidden shadow-2xl border-[1px] border-neutral-100"
            value={value}
            onValueChange={setValue}
          >
            <Command.Input
              ref={inputRef}
              className="p-4 text-2xl font-light focus:outline-none border-b-[1px] border-neutral-100"
              placeholder="Search for toxic plants..."
              autoFocus
            />
            <Command.List className="p-2 overflow-y-auto h-[50vh]">
              {plants.map((plant) => (
                <Command.Item
                  key={plant.name}
                  value={[plant.name, plant.scientificName].join(" ")}
                  className="group px-4 py-2 aria-selected:bg-gray-100 rounded-md"
                  onSelect={(value) => console.log(plant, value)}
                >
                  <span>{plant.name}</span>&nbsp;
                  <span className="pl-2 text-gray-400">
                    {plant.scientificName}
                  </span>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </div>
      </div>

      <div className="bg-neutral-50 rounded-2xl p-10">
        <h2>{activePlant.name}</h2>
        <h3>{activePlant.scientificName}</h3>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://fourthclasshonours.github.io/toxic-plant-list-scraper/toxicPlants.json"
  );
  const plants = await res.json();
  const plantsMap = keyBy(plants, (plant: Plant) =>
    [plant.name, plant.scientificName].join(" ").toLowerCase()
  );

  return {
    props: { plantsMap },
    revalidate: 86400, // Revalidate once a day
  };
}
