import classNames from "classnames";
import React from "react";

type DetailTagListItemProps = {
  text: string;
  intent?: "default" | "danger";
};

export function DetailTagListItem({
  text,
  intent = "default",
}: DetailTagListItemProps) {
  return (
    <span
      className={classNames(
        "px-2 rounded",
        intent === "danger"
          ? "bg-red-200 text-red-900"
          : "bg-neutral-200 text-neutral-900"
      )}
    >
      {text}
    </span>
  );
}
