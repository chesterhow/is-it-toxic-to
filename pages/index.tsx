import { Command } from "cmdk";
import keyBy from "lodash/keyBy";
import { useEffect, useMemo, useRef, useState } from "react";

import { DetailLabel } from "../components/DetailLabel";
import { DetailTagList } from "../components/DetailTagList";
import { DetailTagListItem } from "../components/DetailTagListItem";

export const ANIMAL_EMOJI_MAP: Record<Animal, string> = {
  cat: "🐱",
  dog: "🐶",
  horse: "🐴",
};

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
    <div className="flex flex-col gap-y-4 p-4 w-full max-w-screen-xl m-auto">
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

      <section className="bg-neutral-50 rounded-2xl p-10 h-[calc(100vh-2rem)]">
        <h2>{activePlant.name}</h2>
        <h3 className="text-2xl italic pb-10 text-neutral-500 font-light">
          {activePlant.scientificName}
        </h3>

        <div className="grid grid-cols-[10rem,1fr] gap-3">
          {activePlant.family !== null && (
            <DetailLabel title="Family" text={activePlant.family} />
          )}
          {activePlant.commonNames.length > 0 && (
            <DetailTagList title="Common Names">
              {activePlant.commonNames.map((commonName, index) => (
                <DetailTagListItem key={index} text={commonName} />
              ))}
            </DetailTagList>
          )}
          <DetailTagList title="Toxic to">
            {activePlant.toxicTo.map((animal, index) => (
              <DetailTagListItem
                key={index}
                text={`${
                  ANIMAL_EMOJI_MAP[animal]
                } ${animal[0].toUpperCase()}${animal
                  .substring(1)
                  .toLowerCase()}s`}
              />
            ))}
          </DetailTagList>
          {activePlant.toxicPrinciples !== null && (
            <DetailLabel
              title="Toxic Principles"
              text={activePlant.toxicPrinciples}
            />
          )}
          {activePlant.clinicalSigns !== null && (
            <DetailLabel
              title="Clinical Signs"
              text={activePlant.clinicalSigns}
            />
          )}
        </div>
      </section>
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
