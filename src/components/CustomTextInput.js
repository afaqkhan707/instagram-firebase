import React from 'react';
import { TextInput } from 'react-native-paper';
const CustomTextInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      mode='outlined'
      right={<TextInput.Icon icon={rightIcon} onPress={onRightIconPress} />}
      style={{ width: '100%' }}
      activeOutlineColor='#3797EF'
      outlineColor='#0000001a'
    />
  );
};

export default CustomTextInput;
