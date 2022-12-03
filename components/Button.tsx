import classNames from "classnames";

type ButtonProps = {
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  children: string;
};

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        "h-6 w-6 rounded-lg bg-neutral-200 transition-[background-color,box-shadow]",
        // State: hover
        "hover:bg-neutral-300",
        // State: focus
        "focus-visible:ring-4 focus-visible:ring-blue-400/50"
      )}
    >
      {props.children}
    </button>
  );
}
