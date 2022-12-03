import classNames from "classnames";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { getPlantKey } from "../../utils/getPlantKey";
import { CommandBarEmpty } from "./CommandBarEmpty";
import { CommandBarItem } from "./CommandBarItem";

type CommandBarProps = {
  plants: Plant[];
  deemphasise?: boolean;
};

export function CommandBar({ plants, deemphasise = false }: CommandBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

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
        <CommandBarEmpty />
        {plants.map((plant) => (
          <CommandBarItem key={getPlantKey(plant)} plant={plant} />
        ))}
      </Command.List>
    </Command>
  );
}
