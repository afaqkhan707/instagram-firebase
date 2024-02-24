import React from 'react';
import { View } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';

const CustomInputField = ({ label, value, placeholder, onChangeText }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleIconPress = () => {
    onChangeText(value);
  };

  return (
    <View style={{ width: '100%', paddingHorizontal: 18, marginBottom: 4 }}>
      <TextInput
        label={label}
        underlineColor='rgba(255, 255, 255, 0.12)'
        activeUnderlineColor='#262626'
        onFocus={() => setIsFocused(!isFocused)}
        onBlur={() => setIsFocused(!isFocused)}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#262626'
        right={
          <TextInput.Icon
            icon={isFocused ? 'check-circle-outline' : 'pencil'}
            iconColor={isFocused ? '#3797EF' : '#262626'}
            style={{ margin: 0 }}
            size={20}
            onPress={handleIconPress}
          />
        }
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 0,
        }}
      />
      <Divider />
    </View>
  );
};

export default CustomInputField;
