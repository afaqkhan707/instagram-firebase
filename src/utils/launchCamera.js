import * as ImagePicker from 'expo-image-picker';
export const launchCamera = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 0.8,
  });
  if (result.canceled) {
    return;
  }
  return result.assets[0];
};

// import * as ImagePicker from 'expo-image-picker';

// export const launchCamera = async () => {
//   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   console.log(status, 'camera status');

//   if (status !== 'granted') {
//     const { status: newStatus } =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (newStatus !== 'granted') {
//       alert('Sorry, we need camera roll permissions to make this work!');
//       return;
//     }
//   }

//   let result = await ImagePicker.launchCameraAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: false,
//     quality: 0.8,
//   });

//   if (result.canceled) {
//     return;
//   }

//   return result.assets[0];
// };
