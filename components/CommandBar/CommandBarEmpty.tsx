import { Command } from "cmdk";

export function CommandBarEmpty() {
  return (
    <Command.Empty className="flex flex-col items-center gap-y-2 py-10 px-6 text-center">
      <span className="text-3xl">🥀</span>
      <h3 className="text-sm text-neutral-500">Can&apos;t find your plant?</h3>
      <p className="text-sm text-neutral-400">
        Try searching for its scientific name instead.
      </p>
    </Command.Empty>
  );
}
