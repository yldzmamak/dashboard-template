import React from 'react';

import { Empty, EmptyProps } from 'antd';

type EmptyGlobalProps = EmptyProps & {
  width?: number;
  height?: number;
};

const EmptyGlobal = ({ description, className }: EmptyGlobalProps) => {
  return (
    <Empty
      className={className}
      description={description}
    />
  );
};

export default React.memo(EmptyGlobal);