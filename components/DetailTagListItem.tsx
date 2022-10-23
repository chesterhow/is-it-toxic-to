import React from "react";

type DetailTagListItemProps = {
  text: string;
};

export function DetailTagListItem(props: DetailTagListItemProps) {
  return <span className="bg-neutral-200 px-2 rounded">{props.text}</span>;
}
