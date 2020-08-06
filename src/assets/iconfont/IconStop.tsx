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

const IconStop: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M352 768c-17.664 0-32-14.304-32-32L320 288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 448C384 753.696 369.664 768 352 768z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M672 768c-17.696 0-32-14.304-32-32L640 288c0-17.664 14.304-32 32-32s32 14.336 32 32l0 448C704 753.696 689.696 768 672 768z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconStop.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconStop) : IconStop;
