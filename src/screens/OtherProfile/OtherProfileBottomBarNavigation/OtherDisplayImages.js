import React, { useState, useEffect } from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

const OtherDisplayImages = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://plus.unsplash.com/premium_photo-1705091982024-186ae1b7679f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      url: 'https://plus.unsplash.com/premium_photo-1705091982024-186ae1b7679f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      url: 'https://plus.unsplash.com/premium_photo-1705091982024-186ae1b7679f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      url: 'https://plus.unsplash.com/premium_photo-1705091982024-186ae1b7679f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]);

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
        data={images}
        numColumns={3}
        contentContainerStyle={{ rowGap: 2, marginTop: 3 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{ width: imageWidth, height: imageWidth + 10 }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ columnGap: 2 }}
      />
    </View>
  );
};

export default OtherDisplayImages;
