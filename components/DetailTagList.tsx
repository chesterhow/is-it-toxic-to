import React from "react";

import { DetailSeparator } from "./DetailSeparator";
import { DetailTitle } from "./DetailTitle";

type DetailTagListProps = React.ComponentProps<typeof DetailTitle> & {
  children: React.ReactNode;
};

export function DetailTagList(props: DetailTagListProps) {
  return (
    <>
      <DetailTitle title={props.title} />
      <div className="flex flex-wrap gap-1">{props.children}</div>
      <DetailSeparator />
    </>
  );
}
