/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconExploreOutlined from './IconExploreOutlined';
import IconDelete from './IconDelete';
import IconAiRewRight from './IconAiRewRight';
import IconAiRewLeft from './IconAiRewLeft';
import IconStop from './IconStop';
import IconMoreunfold from './IconMoreunfold';
import IconClock from './IconClock';
import IconShengyin from './IconShengyin';
import IconYinle from './IconYinle';
import IconFenxiang from './IconFenxiang';
import IconPlay1 from './IconPlay1';
import IconArrowRight from './IconArrowRight';
import IconMenu from './IconMenu';
import IconRefresh from './IconRefresh';
import IconPlay from './IconPlay';
import IconFavoritesFill from './IconFavoritesFill';
import IconListingContent from './IconListingContent';
import IconHome from './IconHome';
import IconAccount from './IconAccount';

export type IconNames = 'explore-outlined' | 'delete' | 'ai-rew-right' | 'ai-rew-left' | 'stop' | 'moreunfold' | 'clock' | 'shengyin' | 'yinle' | 'fenxiang' | 'play1' | 'arrow-right' | 'menu' | 'refresh' | 'play' | 'favorites-fill' | 'listing-content' | 'home' | 'account';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'explore-outlined':
      return <IconExploreOutlined key="1" {...rest} />;
    case 'delete':
      return <IconDelete key="2" {...rest} />;
    case 'ai-rew-right':
      return <IconAiRewRight key="3" {...rest} />;
    case 'ai-rew-left':
      return <IconAiRewLeft key="4" {...rest} />;
    case 'stop':
      return <IconStop key="5" {...rest} />;
    case 'moreunfold':
      return <IconMoreunfold key="6" {...rest} />;
    case 'clock':
      return <IconClock key="7" {...rest} />;
    case 'shengyin':
      return <IconShengyin key="8" {...rest} />;
    case 'yinle':
      return <IconYinle key="9" {...rest} />;
    case 'fenxiang':
      return <IconFenxiang key="10" {...rest} />;
    case 'play1':
      return <IconPlay1 key="11" {...rest} />;
    case 'arrow-right':
      return <IconArrowRight key="12" {...rest} />;
    case 'menu':
      return <IconMenu key="13" {...rest} />;
    case 'refresh':
      return <IconRefresh key="14" {...rest} />;
    case 'play':
      return <IconPlay key="15" {...rest} />;
    case 'favorites-fill':
      return <IconFavoritesFill key="16" {...rest} />;
    case 'listing-content':
      return <IconListingContent key="17" {...rest} />;
    case 'home':
      return <IconHome key="18" {...rest} />;
    case 'account':
      return <IconAccount key="19" {...rest} />;
  }

  return null;
};

export default React.memo ? React.memo(IconFont) : IconFont;
