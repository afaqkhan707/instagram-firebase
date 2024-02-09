import * as ImagePicker from 'expo-image-picker';
export const launchLibrary = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 0.8,
  });
  if (result.canceled) {
    return;
  }
  return result.assets[0];
};
