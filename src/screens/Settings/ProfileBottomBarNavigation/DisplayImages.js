import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';

const DisplayImages = ({ Images }) => {
  const [imageWidth, setImageWidth] = useState(null);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const numColumns = 3;
    const spacing = 0;
    const width = (screenWidth - (numColumns - 1) * spacing) / numColumns;
    setImageWidth(width);
  }, []);

  return (
    <View>
      <FlatList
        data={Images}
        numColumns={3}
        contentContainerStyle={{
          rowGap: 2,
          marginTop: 3,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{ uri: item.postImage[0] }}
              style={{ width: imageWidth, height: imageWidth + 10 }}
            />
            {item.postImage.length > 1 ? (
              <IconButton
                icon='card-multiple'
                style={{ position: 'absolute', top: -10, left: 74 }}
                iconColor='#fff'
              />
            ) : null}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.postId}
        columnWrapperStyle={{ columnGap: 2 }}
      />
      <IconButton />
    </View>
  );
};

export default DisplayImages;
