import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

import {removeFavorite} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

import Card from '../global-component/Card';

const Favorites = () => {
  const dispatch = useDispatch();

  const {favorites} = useSelector(state => state.moviesReducer);

  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };
  const exists = movie => {
    if (favorites.filter(item => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  const FavoriteItem = ({item}) => {
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return (
      <Card
        title={item.title}
        source={{uri: IMAGE_URL}}
        onPress={() => handleRemoveFavorite(item)}
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
        {favorites?.length === 0 ? (
          <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>
              Add a movies in your favorite list
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id.toString()}
            renderItem={FavoriteItem}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  moviewBanner: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  movieDetailsContainer: {
    borderColor: 'red',
    width: '65%',
    marginRight: 8,
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
    fontWeight: 600,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 10,
    marginTop: 4,
  },
  voteText: {
    fontSize: 8,
  },
  actionsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#6d6d6d',
  },
});

export default Favorites;
