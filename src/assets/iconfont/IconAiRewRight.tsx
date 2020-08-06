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

const IconAiRewRight: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1025 1024" width={size} height={size} {...rest}>
      <Path
        d="M490.11712 474.54208 53.23776 218.3936C21.36576 217.5744 0 229.60128 0 261.12512l0 501.79072c0.58368 37.00736 21.01248 41.09824 53.23776 42.73152L489.99936 549.376C508.91264 538.17344 528.05632 499.9936 490.11712 474.54208L490.11712 474.54208zM1002.17856 474.54208 565.2992 218.3936c-31.98976-0.8192-53.23776 11.20768-53.23776 42.7264l0 501.79072c0.58368 37.00736 21.01248 41.09824 53.23776 42.73152l436.7616-256.26624C1020.97408 538.17344 1040.12288 499.9936 1002.17856 474.54208L1002.17856 474.54208zM1002.17856 474.54208"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAiRewRight.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconAiRewRight) : IconAiRewRight;
