import {img} from '@/assets/image';
import {color} from '@/themes';
import React, {FC, memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface AvatarProps {
  uri?: string;
  mode?: 'square' | 'circle' | 'squircle';
  size?: number;
  hasBadge?: boolean;
}

export const Avatar: FC<AvatarProps> = memo(props => {
  const {uri = '', mode = 'circle', size = 32, hasBadge} = props;
  let borderRadius = size / 2;
  if (mode === 'squircle') {
    borderRadius = size / 2.5;
  }
  if (mode === 'square') {
    borderRadius = 6;
  }
  const [image, setImage] = useState<string | null>(uri);
  return (
    <View style={[style.container, {width: size, borderRadius}]}>
      <FastImage
        style={[style.image, {borderRadius}]}
        source={
          image
            ? {uri: image, cache: FastImage.cacheControl.cacheOnly}
            : img.user
        }
        defaultSource={img.user}
        resizeMode={FastImage.resizeMode.cover}
        onError={() => setImage(null)}
      />
      {hasBadge && <View style={[style.badgeCnt, {width: size / 4}]} />}
    </View>
  );
});
const style = StyleSheet.create({
  container: {
    aspectRatio: 1 / 1,
    position: 'relative',
    backgroundColor: color.grey[100],
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  badgeCnt: {
    aspectRatio: 1 / 1,
    backgroundColor: color.green[500],
    borderRadius: 10000,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 3,
    borderColor: color.white,
    borderWidth: 2,
  },
});
