import classNames from "classnames";
import { motion } from "framer-motion";
import React from "react";

import { ANIMAL_EMOJI_MAP } from "../../constants";
import { useKeyboardShortcuts } from "../../utils/useKeyboardShortcuts";
import { Button } from "../Button";
import { ExternalLink } from "../ExternalLink";
import { DetailLabel } from "./DetailLabel";
import { DetailTagList } from "./DetailTagList";
import { DetailTagListItem } from "./DetailTagListItem";

type DetailSectionProps = {
  activePlant: Plant;
  clearActivePlant: () => void;
};

export const DetailSection = React.forwardRef(_DetailSection);

function _DetailSection(
  props: DetailSectionProps,
  ref: React.Ref<HTMLElement>
) {
  const { activePlant, clearActivePlant } = props;

  useKeyboardShortcuts("Escape", () => {
    clearActivePlant();
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={ref}
      key="detail"
      className={classNames(
        "rounded-2xl bg-white shadow-2xl",
        // Layout
        "w-full max-w-screen-md p-6 sm:p-8",
        // Layout: desktop
        "md:p-10 xl:max-h-full xl:w-1/2 xl:overflow-y-auto"
      )}
    >
      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={clearActivePlant}>←</Button>
        <ExternalLink href={activePlant.link}>ASPCA Website</ExternalLink>
      </div>

      {/* Header */}
      <h2 className="mt-4 mb-2 text-[3rem] sm:text-[3.75rem] md:text-[4.5rem]">
        {activePlant.name}
      </h2>
      <h3 className="pb-6 text-xl font-light italic tracking-tight text-neutral-500 md:pb-10 md:text-2xl">
        {activePlant.scientificName}
      </h3>

      {/* Details */}
      <div className="flex flex-col md:grid md:grid-cols-[10rem,1fr] md:gap-3">
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
              intent="danger"
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
    </motion.section>
  );
}
