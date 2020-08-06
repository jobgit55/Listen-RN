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

const IconClock: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1024 512C1024 229.230208 794.769792 0 512 0 229.230208 0 0 229.230208 0 512 0 794.769792 229.230208 1024 512 1024 625.316262 1024 733.09232 987.060258 821.44823 919.93747 832.170355 911.792017 834.259159 896.496821 826.113707 885.774697 817.968254 875.052572 802.67306 872.963767 791.950935 881.10922 712.006355 941.842033 614.569408 975.238095 512 975.238095 256.160663 975.238095 48.761905 767.839337 48.761905 512 48.761905 256.160663 256.160663 48.761905 512 48.761905 767.839337 48.761905 975.238095 256.160663 975.238095 512 975.238095 606.738266 946.765111 697.157764 894.355733 773.603714 886.741822 784.709602 889.572629 799.884996 900.678517 807.498908 911.784403 815.112819 926.959799 812.282012 934.573709 801.176124 992.505146 716.675526 1024 616.659703 1024 512Z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M487.619049 609.52381C487.619049 622.989037 498.534771 633.904762 512 633.904762 525.465229 633.904762 536.380951 622.989037 536.380951 609.52381L536.380951 243.809523C536.380951 230.344297 525.465229 219.428572 512 219.428572 498.534771 219.428572 487.619049 230.344297 487.619049 243.809523L487.619049 609.52381Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M481.586633 471.564079C472.719716 461.430462 457.316742 460.403597 447.183125 469.270511 437.049508 478.137425 436.022643 493.540401 444.889559 503.674018L615.556226 698.721636C624.42314 708.855253 639.826114 709.882118 649.959731 701.015204 660.093348 692.148288 661.120213 676.745314 652.253299 666.611697L481.586633 471.564079Z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconClock.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconClock) : IconClock;