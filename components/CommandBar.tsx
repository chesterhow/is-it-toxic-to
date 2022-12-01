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
        "flex flex-col items-stretch",
        "bg-white rounded-xl border-[1px] border-neutral-100",
        "overflow-hidden z-20",
        "transition-[box-shadow,border] duration-500",
        deemphasise ? "shadow-md" : "shadow-2xl",
        // State: focus
        "focus-within:border-neutral-300"
      )}
    >
      <Command.Input
        ref={inputRef}
        className="p-4 text-xl font-light focus:outline-none border-b-[1px] border-neutral-100 tracking-tight placeholder:text-neutral-400"
        placeholder="Search for toxic plants..."
        autoFocus
      />
      <Command.List className="p-2 overflow-y-auto h-[50vh] max-h-96">
        {plants.map((plant) => (
          <Command.Item
            key={plant.name}
            value={[plant.name, plant.scientificName].join(" ")}
            className="group px-4 py-2 aria-selected:bg-neutral-100 rounded-md flex cursor-pointer"
            onSelect={handleSelect}
          >
            <span>{plant.name}</span>&nbsp;
            <span className="pl-2 text-neutral-400 grow">
              {plant.scientificName}
            </span>
            <span className="bg-red-200 rounded-full px-1">
              {plant.toxicTo.map((animal) => ANIMAL_EMOJI_MAP[animal])}
            </span>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}
