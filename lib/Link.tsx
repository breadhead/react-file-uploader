import * as React from "react";

export interface Props {
  path: string;
  className?: string
}

export const Link = ({ path, className }: Props) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href={path || ""}
    className={className}
  >
    {path}
  </a>
);
