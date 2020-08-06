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

const IconDelete: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M815.3 362.1c-16.6 0-30 13.4-30 30V799c0 37.9-23.1 70-50.4 70h-87.6V392c0-16.4-13.5-29.9-30-29.9s-30 13.5-30 30V869H438.2V392.1c0-16.5-13.5-30-30-30s-30 13.5-30 30.1V869h-87.5c-27.3 0-50.4-32.1-50.4-70V392.1c0-16.6-13.4-30-30-30s-30 13.4-30 30V799c0 71.7 49.5 130 110.4 130h444.1c60.9 0 110.5-58.3 110.5-130V392.1c0-16.6-13.4-30-30-30zM897.8 227.1h-770c-16.5 0-30 13.5-30 30s13.5 30 30 30h770c16.5 0 30-13.5 30-30s-13.5-30-30-30zM356.8 166.1h312c16.5 0 30-13.6 30-30.2s-13.5-30.2-30-30.2h-312c-16.5 0-30 13.6-30 30.2s13.5 30.2 30 30.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDelete.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconDelete) : IconDelete;
