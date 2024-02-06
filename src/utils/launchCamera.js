import * as ImagePicker from 'expo-image-picker';
export const launchCamera = async () => {
  //   const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
  //   if (cameraPermission.granted) {
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
// };
//export default launchCamera;
