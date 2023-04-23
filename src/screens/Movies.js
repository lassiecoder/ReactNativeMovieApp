import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {getMovies, addFavorite, removeFavorite} from '../redux/actions';

const Movies = () => {
  const dispatch = useDispatch();

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

  const MovieItem = ({item}) => {
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return (
      <View style={styles.movieItemContainer}>
        <View>
          <Image
            source={{
              uri: IMAGE_URL,
            }}
            style={styles.moviewBanner}
          />
        </View>
        <View style={styles.movieDetailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={3}>
            {item.overview}
          </Text>

          <View style={styles.actionsContainer}>
            <View style={styles.likeContainer}>
              <Image
                source={require('../assets/star.png')}
                style={styles.ratingLikesIcon}
              />
              <Text style={styles.voteText}> {item.vote_average}</Text>
            </View>
            <View style={styles.likeContainer}>
              <Image
                source={require('../assets/like.png')}
                style={styles.ratingLikesIcon}
              />
              <Text style={styles.voteText}> {item.vote_count}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                exists(item)
                  ? handleRemoveFavorite(item)
                  : handleAddFavorite(item)
              }
              style={styles.likeContainer}>
              {exists(item) ? (
                <Image
                  source={require('../assets/favorite-active.png')}
                  style={styles.ratingLikesIcon}
                />
              ) : (
                <Image
                  source={require('../assets/favorite-unfilled.png')}
                  style={styles.ratingLikesIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.childContainer}>
        <FlatList
          data={movies.results}
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
});
export default Movies;
