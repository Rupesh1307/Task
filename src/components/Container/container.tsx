import React,{FC} from 'react';
import {View,ViewProps,StyleProp,ColorValue} from 'react-native';
import { colors } from '../../utils/colors';

interface OwnProps  {
  children?: React.ReactNode,
  backgroundColor?: ColorValue,
}
type ContainerProps=  OwnProps & ViewProps; 

const Container :FC<ContainerProps> = ({children, backgroundColor, style, ...rest}) => {
  let background = backgroundColor || colors.backgroundColor;
  return (
    <View style={[style, {backgroundColor: background}]} {...rest}>
      {children}
    </View>
  );
};

export default Container;