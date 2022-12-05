import classNames from "classnames";
import { motion } from "framer-motion";

type ContentLayoutProps = {
  children: React.ReactNode;
};

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={classNames(
        "flex max-w-screen-2xl grow items-center justify-center gap-10",
        // Layout
        "flex-col",
        // Layout: desktop
        "xl:flex-row"
      )}
    >
      {children}
    </motion.div>
  );
}
