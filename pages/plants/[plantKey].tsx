import classNames from "classnames";
import { motion } from "framer-motion";
import keyBy from "lodash/keyBy";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

import { CommandBar } from "../../components/CommandBar";
import { DetailSection } from "../../components/Detail";
import { Footer } from "../../components/Footer";
import { Head } from "../../components/Head";
import { decodePlantKey, getPlantKey } from "../../utils/plant-key-utils";

type PlantsPageProps = {
  plant: Plant;
  plantsMap: Record<string, Plant>;
};

export default function PlantsPage({ plant, plantsMap }: PlantsPageProps) {
  const router = useRouter();
  const detailRef = useRef<HTMLElement | null>(null);

  const plants = useMemo(() => Object.values(plantsMap), [plantsMap]);

  // Scroll detail into view.
  useEffect(() => {
    detailRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      <Head title={plant.name} />

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
            <CommandBar plants={plants} deemphasise={true} />
          </div>

          <DetailSection
            ref={detailRef}
            activePlant={plant}
            clearActivePlant={() => router.push("/")}
          />
        </motion.div>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    "https://fourthclasshonours.github.io/toxic-plant-list-scraper/toxicPlants.json"
  );
  const plants = await res.json();
  const plantsMap = keyBy(plants, (plant: Plant) => getPlantKey(plant));

  const plantKey = context.params?.plantKey;

  // Guard: Invalid plant key.
  if (typeof plantKey !== "string") {
    return {
      notFound: true,
    };
  }

  const plant = plantsMap[decodePlantKey(plantKey)];

  // Guard: No matching plant found.
  if (plant === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: { plant, plantsMap },
    revalidate: 86400, // Revalidate once a day
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
