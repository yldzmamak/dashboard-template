import React, { CSSProperties } from 'react';

import { Typography } from 'antd';

type TextProps = {
  children: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
} & React.ComponentProps<typeof Typography.Text>;

const Text = ({ children, type, style, onClick, className, ...props }: TextProps) => {

  return (
    <Typography.Text style={style} className={`${className}`} type={type} onClick={onClick} {...props}>
      {children}
    </Typography.Text>
  );
};

export default Text;