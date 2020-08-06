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

const IconAiRewLeft: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M970.73664 218.4704l-436.84864 256.13312c-37.94432 25.45152-18.79552 63.50848 0 74.71616l436.84864 256.25088c32.22016-1.63328 52.65408-5.71904 53.23776-42.7264L1023.9744 261.1968C1023.9744 229.67808 1002.60864 217.6512 970.73664 218.4704L970.73664 218.4704zM458.70592 218.4704 21.85216 474.60352c-37.9392 25.45152-18.79552 63.50848 0 74.71616l436.85376 256.25088c32.22016-1.63328 52.64896-5.71904 53.23264-42.7264L511.93856 261.1968C511.93856 229.67808 490.5728 217.6512 458.70592 218.4704L458.70592 218.4704zM458.70592 218.4704"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAiRewLeft.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconAiRewLeft) : IconAiRewLeft;
