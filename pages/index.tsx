import keyBy from "lodash/keyBy";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import { CommandBar } from "../components/CommandBar";
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
  const router = useRouter();
  const detailRef = useRef<HTMLElement | null>(null);

  const plants = useMemo(() => Object.values(plantsMap), [plantsMap]);
  const [activePlant, setActivePlant] = useState<Plant | null>(null);

  // Update activePlant on query params change.
  useEffect(() => {
    // Guard: No query params.
    if (typeof router.query.plant !== "string") {
      setActivePlant(null);
      return;
    }

    const plantKey = decodeURI(router.query.plant);
    const newActivePlant = plantsMap[plantKey];

    // Guards: Invalid plant in query params.
    if (newActivePlant === undefined) {
      setActivePlant(null);
      return;
    }

    setActivePlant(newActivePlant);
  }, [plantsMap, router.query]);

  // Scroll detail into view on activePlant change.
  useEffect(() => {
    if (activePlant !== null) {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activePlant]);

  return (
    <div className="flex flex-col gap-y-4 p-4 w-full max-w-screen-xl m-auto">
      <div className="bg-neutral-50 rounded-2xl p-10">
        <div className="flex flex-col gap-y-4 max-w-screen-md m-auto">
          <Link href="/">
            <h1 className="text-center cursor-pointer">🪴 Is It Toxic To?</h1>
          </Link>
          <CommandBar plants={plants} />
        </div>
      </div>

      {activePlant !== null && (
        <section ref={detailRef} className="bg-neutral-50 rounded-2xl p-10">
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
      )}
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
