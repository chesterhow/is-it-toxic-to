import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { DetailSection } from "../../components/Detail";
import { Head } from "../../components/Head";
import { ContentLayout } from "../../components/layouts/ContentLayout";
import { LogoAndCombobox } from "../../components/LogoAndCombobox";
import { decodePlantKey } from "../../utils/plant-key-utils";
import { fetchPlantsMap } from "../fetchPlantsMap";

type PlantsPageProps = {
  plant: Plant;
  plantsMap: Record<string, Plant>;
};

export default function PlantsPage({ plant, plantsMap }: PlantsPageProps) {
  const router = useRouter();
  const detailRef = useRef<HTMLElement | null>(null);

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

      <ContentLayout>
        <LogoAndCombobox plantsMap={plantsMap} deemphasise={true} />

        <DetailSection
          ref={detailRef}
          activePlant={plant}
          clearActivePlant={() => router.push("/")}
        />
      </ContentLayout>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const plantsMap = await fetchPlantsMap();
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
