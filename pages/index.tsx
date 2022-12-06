import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { DetailSection } from "../components/Detail";
import { Head } from "../components/Head";
import { ContentLayout } from "../components/layouts/ContentLayout";
import { LogoAndCombobox } from "../components/LogoAndCombobox";
import { fetchPlantsMap } from "../utils/fetchPlantsMap";
import { getMetaDescription } from "../utils/getMetaDescription";
import { decodePlantKey } from "../utils/plant-key-utils";

type HomePageProps = {
  plantsMap: Record<string, Plant>;
};

export default function Home({ plantsMap }: HomePageProps) {
  const router = useRouter();
  const detailRef = useRef<HTMLElement | null>(null);

  const [activePlant, setActivePlant] = useState<Plant | null>(null);

  // Update activePlant on query params change.
  useEffect(() => {
    // Guard: No query params.
    if (typeof router.query.plant !== "string") {
      setActivePlant(null);
      return;
    }

    const plantKey = decodePlantKey(router.query.plant);
    const newActivePlant = plantsMap[plantKey];

    // Guard: Invalid plant in query params.
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
      <Head
        title={activePlant?.name}
        description={
          activePlant !== null ? getMetaDescription(activePlant) : undefined
        }
      />

      <ContentLayout>
        <LogoAndCombobox
          plantsMap={plantsMap}
          deemphasise={activePlant !== null}
        />

        <AnimatePresence>
          {activePlant !== null && (
            <DetailSection
              ref={detailRef}
              activePlant={activePlant}
              clearActivePlant={() => setActivePlant(null)}
            />
          )}
        </AnimatePresence>
      </ContentLayout>
    </>
  );
}

export async function getStaticProps() {
  const plantsMap = await fetchPlantsMap();

  return {
    props: { plantsMap },
    revalidate: 86400, // Revalidate once a day
  };
}
