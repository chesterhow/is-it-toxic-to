import { Command } from "cmdk";
import { useEffect, useRef } from "react";

type HomePageProps = {
  plants: Plant[];
};

export default function Home({ plants }: HomePageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-stretch pt-20 pb-4 max-w-3xl m-auto">
      <h1 className="text-center">🪴 Is It Toxic To?</h1>

      <Command label="Hello" className="px-8 flex flex-col items-stretch">
        <Command.Input
          ref={inputRef}
          className="p-4 shadow-2xl text-2xl bg-white rounded-lg border-[1px] border-gray-200/60 font-light focus:outline-none"
          placeholder="Search for toxic plants..."
          autoFocus
        />
        <Command.List className="bg-white rounded-lg mt-4 p-2 shadow-2xl border-[1px] border-gray-200/60 overflow-y-auto h-[400px]">
          {plants.map((plant) => (
            <Command.Item
              key={plant.name}
              className="group px-4 py-2 aria-selected:bg-gray-100 rounded-md"
            >
              <span>{plant.name}</span>
              <span className="pl-3 text-gray-400">{plant.scientificName}</span>
              {/* {plant.imageUrl !== null && (
                <div className="fixed inset-0 hidden group-aria-selected:block pointer-events-none opacity-10">
                  <Image
                    src={plant.imageUrl}
                    alt=""
                    layout="responsive"
                    width="200"
                    height="200"
                    loading="lazy"
                  />
                </div>
              )} */}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://fourthclasshonours.github.io/toxic-plant-list-scraper/toxicPlants.json"
  );
  const plants = await res.json();

  return {
    props: { plants },
    revalidate: 86400, // Revalidate once a day
  };
}
