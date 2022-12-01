import { DetailSeparator } from "./DetailSeparator";
import { DetailTitle } from "./DetailTitle";

type DetailLabelProps = React.ComponentProps<typeof DetailTitle> & {
  title: string;
  text: string;
};

export function DetailLabel(props: DetailLabelProps) {
  return (
    <>
      <DetailTitle title={props.title} />
      <span className="">{props.text}</span>
      <DetailSeparator />
    </>
  );
}
