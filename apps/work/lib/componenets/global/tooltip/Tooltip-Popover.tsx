import { FC, forwardRef, PropsWithChildren } from "react";

type Popover = PropsWithChildren

const Popover: FC<Popover> = forwardRef<
  HTMLDivElement,
  Popover
>((props, ref) => {
  return (
    <>
      <div className="popover" ref={ref}>
        {props.children}
      </div>

      <style jsx>
        {`
          .popover {
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            font-size: var(--font-size-20);
            background-color: var(--color-blackish-hover);
            color: var(--text-color-on-primary);
            padding: var(--space-small) var(--space-medium);
            border-radius: var(--border-radius-small);
            font-weight: var(--font-weight-bold);
            box-shadow: var(--box-shadow-small);
          }
        `}
      </style>
    </>
  );
});

Popover.displayName = Popover.name;

export default Popover
