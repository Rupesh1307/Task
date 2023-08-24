import React,{FC} from 'react';
import { colors } from '../../utils/colors';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  DimensionValue,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps{
  children : React.ReactNode,
  isLoading? : boolean, 
  buttonBackgroundColor?: string
  buttonBorderColor?: string,
  buttonBorderWidth?: number,
  buttonWidth ?: DimensionValue,
  isTransparent?: boolean,
  childrenContainerStyle?: StyleProp<ViewStyle>
}

const Button:FC<ButtonProps> = ({
  children,
  isLoading,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonBorderWidth,
  buttonWidth,
  childrenContainerStyle,
  isTransparent,
  style,
  ...rest
}) => {
    let baseBackgroundColor = buttonBackgroundColor || colors.primary ;
    let baseBorderColor = buttonBorderColor || colors.primary;
    let borderWidth = buttonBorderWidth || 1;

    let baseButtonWidth = buttonWidth  || '100%';

    if(isTransparent){
      baseBackgroundColor='transparent'
    }

  return (
    <TouchableOpacity
      style={[styles.button,{backgroundColor:baseBackgroundColor,borderColor:baseBorderColor,borderWidth:borderWidth},style]}
      {...rest}>
      <View
        style={[
          styles.buttonChildrenContainer,{width:baseButtonWidth},
          childrenContainerStyle,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
  },
  buttonChildrenContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 5,
  },
});