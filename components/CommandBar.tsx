import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

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
      label="Hello"
      className={`flex flex-col items-stretch bg-white rounded-xl overflow-hidden border-[1px] border-neutral-100 ${
        deemphasise ? "shadow-md" : "shadow-2xl"
      } transition-shadow duration-500`}
    >
      <Command.Input
        ref={inputRef}
        className="p-4 text-2xl font-light focus:outline-none border-b-[1px] border-neutral-100"
        placeholder="Search for toxic plants..."
        autoFocus
      />
      <Command.List className="p-2 overflow-y-auto h-[50vh] max-h-96">
        {plants.map((plant) => (
          <Command.Item
            key={plant.name}
            value={[plant.name, plant.scientificName].join(" ")}
            className="group px-4 py-2 aria-selected:bg-gray-100 rounded-md"
            onSelect={handleSelect}
          >
            <span>{plant.name}</span>&nbsp;
            <span className="pl-2 text-gray-400">{plant.scientificName}</span>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}
