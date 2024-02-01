import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatusUser from '../../components/StatusUser';

const StatusBar = () => {
  const images = [
    {
      id: 1,
      imageURl:
        'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'aamir',
    },
  ];
  for (let i = 1; i < 20; i++) {
    images.push({
      id: i + 1,
      imageURl: images[0].imageURl,
      name: 'dummy string',
    });
  }
  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {images.map((image) => (
        <StatusUser key={image.id} imageURl={image.imageURl} />
      ))}
    </ScrollView>
  );
};

export default StatusBar;

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
    maxHeight: 110,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
