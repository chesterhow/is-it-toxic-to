type DetailTitleProps = {
  title: string;
};

export function DetailTitle(props: DetailTitleProps) {
  return (
    <span className="whitespace-nowrap overflow-hidden text-ellipsis text-neutral-500">
      {props.title}
    </span>
  );
}
