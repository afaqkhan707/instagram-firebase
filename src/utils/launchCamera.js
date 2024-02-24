import * as ImagePicker from 'expo-image-picker';
export const launchCamera = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 0.8,
  });
  if (result.canceled) {
    result = [];
  }
  return result.assets[0];
};
