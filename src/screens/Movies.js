import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TextInput} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {getMovies, addFavorite, removeFavorite} from '../redux/actions';
import Card from '../global-component/Card';

const Movies = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [listData, setListData] = useState([]);

  const {movies, favorites} = useSelector(state => state.moviesReducer);

  const fetchMovies = () => dispatch(getMovies());
  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };
  const exists = movie => {
    if (favorites.filter(item => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = text => {
    if (text) {
      const searchedData = movies.results.filter(item => {
        const itemTitle = item.title;
        return itemTitle.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setListData(searchedData);
      setSearch(text);
    } else {
      setSearch(text);
    }
  };

  const MovieItem = ({item}) => {
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return (
      <Card
        title={item.title}
        source={{uri: IMAGE_URL}}
        onPress={() =>
          exists(item) ? handleRemoveFavorite(item) : handleAddFavorite(item)
        }
        overview={item.overview}
        vote_count={item.vote_count}
        existsState={exists(item)}
        vote_average={item.vote_average}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.childContainer}>
        <TextInput
          value={search}
          clearButtonMode
          style={styles.searchbar}
          placeholder={'Search movies'}
          onChangeText={text => handleSearch(text)}
        />
        <FlatList
          data={search?.length ? listData : movies.results}
          renderItem={MovieItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  childContainer: {
    flex: 1,
  },
  movieItemContainer: {
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  moviewBanner: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  movieDetailsContainer: {
    width: '65%',
    marginRight: 8,
    borderColor: 'red',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLikesIcon: {
    width: 12,
    height: 12,
  },
  title: {
    fontSize: 12,
    marginTop: 12,
    fontWeight: 600,
    color: '#484848',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 4,
    color: '#6d6d6d',
  },
  voteText: {
    fontSize: 8,
  },
  actionsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchbar: {
    padding: 8,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#7676888f',
  },
});
export default Movies;
