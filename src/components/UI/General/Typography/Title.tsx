import React, { CSSProperties } from 'react';

import { Typography } from 'antd';

type Level = 1 | 2 | 3 | 4 | 5;

type HProps = {
  children: React.ReactNode;
  level: Level;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
};

const H = ({ children, level, style, onClick, className }: HProps) => {

  return (
    <Typography.Title style={style} className={`${className} text-heading`} level={level} onClick={onClick}>
      {children}
    </Typography.Title>
  );
};

export default H;