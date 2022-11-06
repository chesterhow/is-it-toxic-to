import keyBy from "lodash/keyBy";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { CommandBar } from "../components/CommandBar";
import { DetailSection } from "../components/DetailSection";

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
    <div className="flex flex-col xl:flex-row gap-10 p-10 w-full justify-center h-auto xl:h-screen items-center max-w-screen-2xl m-auto">
      <div className="min-w-fit flex flex-col gap-y-4 m-auto">
        <Link href="/">
          <h1 className="text-center cursor-pointer">🪴 Is It Toxic To?</h1>
        </Link>
        <CommandBar plants={plants} deemphasise={activePlant !== null} />
      </div>

      <CSSTransition
        in={activePlant !== null}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        {activePlant !== null ? (
          <DetailSection activePlant={activePlant} ref={detailRef} />
        ) : (
          <></>
        )}
      </CSSTransition>
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
