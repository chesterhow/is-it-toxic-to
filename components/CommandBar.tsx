import classNames from "classnames";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { ANIMAL_EMOJI_MAP } from "../constants";

type CommandBarProps = {
  plants: Plant[];
  deemphasise?: boolean;
};

export function CommandBar({ plants, deemphasise = false }: CommandBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  function handleSelect(value: string) {
    router.push({
      query: {
        plant: encodeURI(value),
      },
    });
  }

  return (
    <Command
      className={classNames(
        "flex max-w-[90vw] flex-col items-stretch",
        "rounded-xl border-[1px] border-neutral-100 bg-white",
        "z-20 overflow-hidden",
        "transition-[box-shadow,border] duration-500",
        deemphasise ? "shadow-md" : "shadow-2xl",
        // State: focus
        "focus-within:border-neutral-300"
      )}
    >
      <Command.Input
        ref={inputRef}
        className="border-b-[1px] border-neutral-100 p-4 text-xl font-light tracking-tight placeholder:text-neutral-400"
        placeholder="Search for toxic plants..."
        autoFocus
      />
      <Command.List className="h-[50vh] max-h-96 overflow-y-auto p-2">
        {plants.map((plant) => (
          <Command.Item
            key={plant.name}
            value={[plant.name, plant.scientificName].join(" ")}
            className="group flex cursor-pointer items-center justify-between gap-x-3 rounded-md px-4 py-2 aria-selected:bg-neutral-100"
            onSelect={handleSelect}
          >
            <div className="flex min-w-0 grow flex-col gap-x-3 sm:flex-row">
              <span className="truncate">{plant.name}</span>
              <span className="grow truncate text-neutral-400 sm:block">
                {plant.scientificName}
              </span>
            </div>
            <span className="whitespace-nowrap rounded-full bg-red-200 px-1">
              {plant.toxicTo.map((animal) => ANIMAL_EMOJI_MAP[animal])}
            </span>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}
