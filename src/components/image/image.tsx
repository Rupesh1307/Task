import React,{FC} from 'react';
import {StyleSheet,ImageProps,StyleProp} from 'react-native';
import PropTypes from 'prop-types';
import FastImage,{FastImageProps,ImageStyle} from 'react-native-fast-image';

interface Imageprops extends FastImageProps{
    imagestyle?: StyleProp<ImageStyle>;
    resizeMode?: 'contain'|'stretch'|'center'|'cover';
}

 const Image:FC<Imageprops> = ({imagestyle,resizeMode,...rest})=> {
  let resize;
  switch (resizeMode) {
    case 'contain':
      resize = FastImage.resizeMode.contain;
      break;
    case 'stretch':
      resize = FastImage.resizeMode.stretch;
      break;
    case 'center':
      resize = FastImage.resizeMode.center;
      break;
    default:
      resize = FastImage.resizeMode.cover;
      break;
  }
  return (
    <FastImage
      style={[imagestyle]}
      {...rest}
      resizeMode={resize}
    />
  );
}


export default Image;
