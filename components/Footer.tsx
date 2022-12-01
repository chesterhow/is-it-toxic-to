import { motion } from "framer-motion";

import { ExternalLink } from "./ExternalLink";

export function Footer() {
  return (
    <motion.footer
      transition={{ delay: 0.5, duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-10 sm:pb-0 text-md text-neutral-400 select-none items-center"
    >
      <span>
        Planted 🌱 by{" "}
        <ExternalLink href="https://chester.how">Chester</ExternalLink>
      </span>
      <span className="hidden sm:block">·</span>
      <span>
        Try it on{" "}
        <ExternalLink href="https://www.raycast.com/chesterhow/is-it-toxic-to">
          Raycast
        </ExternalLink>
      </span>
    </motion.footer>
  );
}
