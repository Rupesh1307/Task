import * as React from 'react';
import {Text as BaseText, TextProps as BaseTextProps} from 'react-native';
import { colors } from '../../utils/colors';

interface TextProps extends BaseTextProps {
  children?: React.ReactNode;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isHeadingTitle?: boolean;
  isCenter?: boolean;
  isWhite?: boolean;
  isDanger?: boolean;
  isSuccess?: boolean;
  hasMargin?: boolean;
  fontSmall?: boolean;
  fontLarge?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isHeadingTitle,
  isCenter,
  hasMargin,
  isDanger,
  isSuccess,
  style,
  fontSmall,
  fontLarge,
  ...rest
}) => {
  const {primary, secondary, text, success, danger, white} = colors;
  let color = text;
  let fontSize = 14;
  let marginTop = 0;
  let textAlign: 'auto' | 'center' | 'left' | 'right' | 'justify' | undefined;

  if (isSecondary) {
    color = secondary;
    fontSize = 13;
  }

  if (isHeadingTitle) {
    fontSize = 20;
  }

  if (fontSmall) {
    fontSize = 12;
  }

  if (fontLarge) {
    fontSize = 16;
  }

  if (isPrimary) {
    color = primary;
  }

  if (isWhite && white) {
    color = white;
  }

  if (isDanger && danger) {
    color = danger;
  }

  if (isSuccess && success) {
    color = success;
  }

  if (isCenter) {
    textAlign = 'center';
  }

  if (hasMargin) {
    marginTop = 10;
  }


  return (
    <BaseText
      {...rest}
      style={[
        {
          color,
          fontSize,
          textAlign,
          marginTop,
        },
        style,
      ]}>
      {children}
    </BaseText>
  );
};

export default Text;