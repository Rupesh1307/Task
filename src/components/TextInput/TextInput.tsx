import React,{FC} from 'react';
import {TextInput, View, StyleSheet,TextInputProps,TextStyle,StyleProp,DimensionValue,AnimatableNumericValue,ColorValue} from 'react-native';
import {Text,Container} from '../index';
import { colors } from '../../utils/colors';

interface TextFieldProps extends TextInputProps{
    lable?:string;
    lableTextStyle ?: StyleProp<TextStyle>,
    onChangeText ? : (text:string)=>void,
    value?: string,
    placeholder?:string,
    secureTextEntry ?: boolean,
    borderRadius?: AnimatableNumericValue,
    borderWidth?:number,
    marginTop?:DimensionValue,
    marginBottom?:DimensionValue,
    marginHorizontal?:DimensionValue,
    marginVertical?:DimensionValue,
    borderColor?:ColorValue,
}

// type InputProps = TextFieldProps & TextInputProps;

const TextField : FC<TextFieldProps> = ({
    lable,
    lableTextStyle,
    style,
    onChangeText,
    value,
    placeholder,
    secureTextEntry = false,
    borderRadius = 8,
    borderWidth = 1,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    borderColor,
    ...rest
}) => {
  let inputborderColor = borderColor || colors.secondary;
  return (
    <Container
      style={[
        styles.container,
        {marginTop, marginBottom, marginHorizontal, marginVertical},
      ]}>
      {lable && lable !== ' ' && <Text style={lableTextStyle}>{lable}</Text>}
      <Container style={[styles.innerContainer]}>
        <TextInput
          style={[
            styles.textField,
            {borderColor: inputborderColor, borderRadius: borderRadius, borderWidth},
            style,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoComplete="off"
          allowFontScaling={false}
          {...rest}
        />
      </Container>
    </Container>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  textField: {
    padding: 12,
    height: 45,
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 14,
    color: colors.text,
  },
});