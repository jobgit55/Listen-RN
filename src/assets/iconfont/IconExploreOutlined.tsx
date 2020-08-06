/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const IconExploreOutlined: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 768a341.333333 341.333333 0 1 1 341.333333-341.333333 341.333333 341.333333 0 0 1-341.333333 341.333333z m175.786667-527.36a20.906667 20.906667 0 0 0-23.04-4.693333l-210.346667 85.333333a85.333333 85.333333 0 0 0-46.506667 46.506667l-85.333333 210.346667a20.906667 20.906667 0 0 0 4.693333 23.04l10.24 10.24a20.906667 20.906667 0 0 0 23.04 4.693333l210.346667-85.333333a85.333333 85.333333 0 0 0 46.506667-46.506667l85.333333-210.346667a20.906667 20.906667 0 0 0-4.693333-23.04z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconExploreOutlined.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconExploreOutlined) : IconExploreOutlined;
