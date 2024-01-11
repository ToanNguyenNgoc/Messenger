import {img} from '@/assets/image';
import {color, dimension} from '@/themes';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const CustomMessageImage: FC<{media: any}> = ({media}) => {
  if (media.length === 0) {
    return <></>;
  }
  return (
    <View style={style.mediaCnt}>
      {media.map((i: any) => (
        <View key={i} style={style.mediaImgCnt}>
          <FastImage
            source={{uri: i}}
            defaultSource={img.imgPlaceholder}
            style={style.mediaImg}
          />
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  mediaCnt: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 0,
  },
  mediaImgCnt: {
    width: ((dimension.screenWidth - 16) * 0.85 - 10) / 3,
    height: ((dimension.screenWidth - 16) * 0.85 - 10) / 3,
    backgroundColor: color.grey[400],
    borderRadius: 8,
    position: 'relative',
  },
  mediaImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: 8,
    resizeMode: FastImage.resizeMode.cover,
  },
});
