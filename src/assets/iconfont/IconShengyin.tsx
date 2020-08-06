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

const IconShengyin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M784.51565 752.904699c-6.126534 0-12.089339-3.160993-15.404852-8.832156-4.968152-8.498558-2.106987-19.416212 6.391571-24.384363 40.793078-23.847128 74.988902-57.997925 98.890264-98.759281 24.611537-41.970904 37.619806-90.028433 37.619806-138.978285 0-48.53132-12.800537-96.232738-37.018102-137.945769-23.51353-40.500413-57.205886-74.588789-97.438193-98.579179-8.455579-5.04183-11.222599-15.98302-6.180769-24.438599 5.04183-8.454556 15.984043-11.224646 24.438599-6.179746 45.422516 27.085892 83.4629 65.572438 110.010533 111.298875 27.370371 47.143717 41.837874 101.034091 41.837874 155.844417 0 55.283094-14.70184 109.576651-42.516326 157.010987-26.986631 46.02115-65.594951 84.577281-111.650893 111.502513C790.667767 752.118799 787.571243 752.904699 784.51565 752.904699z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M690.433902 637.409245c-6.126534 0-12.089339-3.160993-15.404852-8.832156-4.968152-8.498558-2.108011-19.415189 6.391571-24.38334 20.927635-12.235672 38.47222-29.756721 50.733475-50.669006 12.619412-21.521153 19.290345-46.168506 19.290345-71.276347 0-24.894993-6.563486-49.359174-18.981307-70.749344-12.06171-20.777209-29.348422-38.265512-49.987484-50.573839-8.455579-5.04183-11.222599-15.98302-6.180769-24.438599s15.984043-11.222599 24.438599-6.179746c25.830295 15.402805 47.464011 37.289278 62.559824 63.293535 15.570627 26.819832 23.801079 57.473993 23.801079 88.647993 0 31.442106-8.364505 62.323441-24.186865 89.308025-15.346523 26.172079-37.302581 48.099485-63.495126 63.412239C696.586019 636.622322 693.488471 637.409245 690.433902 637.409245z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M458.668351 816.535925"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M551.660278 880.221386c-32.259728 0-64.338331-21.915126-68.867484-25.12933l-34.319643-23.937179c-8.074909-5.631254-10.055007-16.742313-4.423753-24.817222 5.631254-8.073886 16.742313-10.053983 24.817222-4.422729l34.521235 24.078395c9.045003 6.386454 38.869263 23.337521 56.298214 17.406438 6.282077-2.137687 12.216229-4.155646 12.941753-37.055964L572.627822 159.178349c-1.846044-30.90794-8.446369-33.898041-16.08228-37.358863-16.282848-7.378038-43.946908 10.077519-52.353368 16.775059l-0.458441 0.355087L291.206338 298.058396c-47.806819 38.911218-112.949468 37.278022-120.293737 36.95875-45.25674 0.203638-83.561138 34.316573-89.264023 79.541591l-1.235131 12.259208 0 111.556749 1.236154 12.260232c5.716188 45.329395 44.176129 79.495542 89.566922 79.544661 0.62524-0.007163 1.249457-0.010233 1.871627-0.010233 61.545728 0 113.049752 33.766035 115.234511 35.218106 3.311419 2.218528 80.300884 54.499242 120.594589 141.727908 4.128017 8.936533 0.230244 19.528775-8.706289 23.656793-8.936533 4.124947-19.528775 0.230244-23.656793-8.707312-35.558867-76.979232-105.655342-125.411291-107.984387-127.000486-1.680269-1.090844-46.628994-29.827329-97.03808-29.236881l-0.210801 0.002047c-63.457264 0-117.226888-47.720861-125.072577-111.002117l-0.046049-0.406253-1.436722-14.255679L44.765553 425.026136l1.482771-14.662955c7.845689-63.278185 61.615313-110.997 125.072577-110.997l0.99363 0.027629c0.533143 0.026606 57.848523 2.576685 96.617501-29.17139l0.610914-0.477884L482.179834 110.553908c1.980097-1.556449 12.95301-9.954723 27.479865-16.706497 23.096021-10.736529 44.397163-12.294001 61.599963-4.498454 8.730848 3.956102 17.791202 9.174963 24.907273 20.47738 7.006578 11.127432 10.846022 26.318412 12.081153 47.808866l0.029676 1.023306 0 648.070049-0.004093 0.191358c-0.601704 28.076452-4.01443 58.972113-37.106106 70.229504C564.81181 879.311667 558.231951 880.221386 551.660278 880.221386z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconShengyin.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconShengyin) : IconShengyin;