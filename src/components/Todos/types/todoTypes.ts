import React from 'react';

export type TodoEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<SVGElement>;
