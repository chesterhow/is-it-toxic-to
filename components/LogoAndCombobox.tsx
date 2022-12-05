import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

import { CommandBar } from "./CommandBar";

type LogoAndComboboxProps = {
  plantsMap: Record<string, Plant>;
} & Pick<React.ComponentProps<typeof CommandBar>, "deemphasise">;

export function LogoAndCombobox(props: LogoAndComboboxProps) {
  const plants = useMemo(
    () => Object.values(props.plantsMap),
    [props.plantsMap]
  );

  return (
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
      <CommandBar plants={plants} deemphasise={props.deemphasise} />
    </div>
  );
}
