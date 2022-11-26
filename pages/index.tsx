import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import keyBy from "lodash/keyBy";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

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
    <motion.div
      className={classNames(
        "flex gap-10 p-10 w-full justify-center items-center max-w-screen-2xl m-auto",
        // Layout
        "flex-col h-auto",
        // Layout: desktop
        "xl:flex-row xl:h-screen"
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-w-fit flex flex-col gap-y-4 m-auto">
        <Link href="/">
          <motion.h1
            transition={{ duration: 0.5 }}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="text-center cursor-pointer z-10"
          >
            🪴 Is It Toxic To?
          </motion.h1>
        </Link>
        <CommandBar plants={plants} deemphasise={activePlant !== null} />
      </div>

      <AnimatePresence>
        {activePlant !== null && (
          <DetailSection activePlant={activePlant} ref={detailRef} />
        )}
      </AnimatePresence>
    </motion.div>
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
