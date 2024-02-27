import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserPostData = (props) => {
  return (
    <Pressable
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 4,
        flex: 1,
        minHeight: 80,
        minWidth: 50,
      }}
      android_ripple={{ color: '#d3d3d3' }}
    >
      <Text style={{ fontWeight: 900, fontSize: 16 }}>{props.value}</Text>
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default UserPostData;

const styles = StyleSheet.create({});

// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { TouchableRipple, Text } from 'react-native-paper';

// const UserPostData = (props) => {
//   return (
//     <TouchableRipple
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         flex: 1,
//         minHeight: 80,
//         minWidth: 50,
//       }}
//       rippleColor="#d3d3d3"
//       onPress={() => {}}
//     >
//       <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.value}</Text>
//       <Text>{props.title}</Text>
//     </TouchableRipple>
//   );
// };

// export default UserPostData;

// const styles = StyleSheet.create({});
