import * as React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import AppBarBackIcon from './BackBtnIcon';
import { View } from 'react-native';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchClicked, setSearchClicked] = React.useState(false);

  const handleSearchClicked = () => {
    setSearchClicked(false);
  };
  const handleSearch = () => {
    setSearchClicked(true);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        minHeight: 70,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      {searchClicked && <Appbar.BackAction onPress={handleSearchClicked} />}
      <Searchbar
        // placeholder='Search'
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon='magnify'
        iconColor={searchClicked ? '#000000' : '#000000'}
        onIconPress={handleSearch}
        mode='bar'
        style={{
          flex: 1,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor: 'green',
          borderColor: '#0000001a',
          lineHeight: 10,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleSearch}
      />
    </View>
  );
};

export default SearchBar;
