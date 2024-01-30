// import React from 'react';
// import { TextInput } from 'react-native-paper';
// const CustomTextInput = ({
//   label,
//   value,
//   onChangeText,
//   onBlur,
//   secureTextEntry,
//   rightIcon,
//   onRightIconPress,
// }) => {
//   return (
//     <TextInput
//       label={label}
//       value={value}
//       onChangeText={onChangeText}
//       onBlur={onBlur}
//       secureTextEntry={secureTextEntry}
//       mode='outlined'
//       right={<TextInput.Icon icon={rightIcon} onPress={onRightIconPress} />}
//       style={{ width: '100%' }}
//       activeOutlineColor='#3797EF'
//       outlineColor='#0000001a'
//     />
//   );
// };

// export default CustomTextInput;
import React from 'react';
import { TextInput } from 'react-native-paper';

const CustomTextInput = (props) => (
  <TextInput
    {...props}
    mode='outlined'
    style={{ width: '100%' }}
    activeOutlineColor='#3797EF'
    outlineColor='#0000001a'
    right={
      <TextInput.Icon icon={props.rightIcon} onPress={props.onRightIconPress} />
    }
  />
);

export default CustomTextInput;
