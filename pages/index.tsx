import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import keyBy from "lodash/keyBy";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import { CommandBar } from "../components/CommandBar";
import { DetailSection } from "../components/Detail";
import { Footer } from "../components/Footer";
import { Head } from "../components/Head";
import { getPlantKey } from "../utils/getPlantKey";

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
    <>
      <Head title={activePlant?.name} />

      <div className="flex h-auto w-full flex-col items-center gap-20 p-4 sm:p-10 xl:h-screen">
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={classNames(
            "flex max-w-screen-2xl grow items-center justify-center gap-10",
            // Layout
            "flex-col",
            // Layout: desktop
            "xl:flex-row"
          )}
        >
          <div className="m-auto flex min-w-fit flex-col gap-y-4">
            {/* HACK: having a empty element here prevents the emoji from being cut-off on Chrome. */}
            <span />
            <Link href="/">
              <motion.h1
                transition={{ duration: 0.5 }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="z-10 cursor-pointer select-none overflow-visible text-center text-[4rem] sm:text-[5rem] md:text-[6rem]"
              >
                🪴 <br className="md:hidden" />
                Is It Toxic To?
              </motion.h1>
            </Link>
            <CommandBar plants={plants} deemphasise={activePlant !== null} />
          </div>

          <AnimatePresence>
            {activePlant !== null && (
              <DetailSection
                ref={detailRef}
                activePlant={activePlant}
                clearActivePlant={() => setActivePlant(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://fourthclasshonours.github.io/toxic-plant-list-scraper/toxicPlants.json"
  );
  const plants = await res.json();
  const plantsMap = keyBy(plants, (plant: Plant) => getPlantKey(plant));

  return {
    props: { plantsMap },
    revalidate: 86400, // Revalidate once a day
  };
}
