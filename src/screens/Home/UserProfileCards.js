import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import ProfileCard from '../../components/ProfileCard';
// import ProfileCard from '../../components/ProfileCard.js';

const UserProfileCards = () => {
  const [profileCardsData, setProfileCardsData] = React.useState([
    {
      profileName: 'JohnDoe',
      image: 'https://source.unsplash.com/random/200x200?person',
      isFollowing: false,
    },
    {
      profileName: 'JaneSmith',
      image: 'https://source.unsplash.com/random/200x200?woman',
      isFollowing: true,
    },
    {
      profileName: 'AlexJohnson',
      image: 'https://source.unsplash.com/random/200x200?man',
      isFollowing: false,
    },
    {
      profileName: 'JohnDoe',
      image: 'https://source.unsplash.com/random/200x200?person',
      isFollowing: false,
    },
    {
      profileName: 'JaneSmith',
      image: 'https://source.unsplash.com/random/200x200?woman',
      isFollowing: true,
    },
    {
      profileName: 'AlexJohnson',
      image: 'https://source.unsplash.com/random/200x200?man',
      isFollowing: false,
    },
    {
      profileName: 'JohnDoe',
      image: 'https://source.unsplash.com/random/200x200?person',
      isFollowing: false,
    },
    {
      profileName: 'JaneSmith',
      image: 'https://source.unsplash.com/random/200x200?woman',
      isFollowing: true,
    },
    {
      profileName: 'AlexJohnson',
      image: 'https://source.unsplash.com/random/200x200?man',
      isFollowing: false,
    },
  ]);
  const handleFollowStatus = (index) => {
    const updatedData = [...profileCardsData];
    updatedData[index].isFollowing = !updatedData[index].isFollowing;
    setProfileCardsData(updatedData);
  };
  return (
    <FlatList
      data={profileCardsData}
      horizontal
      contentContainerStyle={{
        columnGap: 16,
        maxHeight: 300,
        padding: 10,
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ProfileCard
          profileName={item.profileName}
          image={item.image}
          isFollowing={item.isFollowing}
          onPressFollow={() => handleFollowStatus(index)}
          index={index}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default UserProfileCards;

const styles = StyleSheet.create({});
