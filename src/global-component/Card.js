import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({
  title,
  source,
  onPress,
  overview,
  vote_count,
  existsState,
  vote_average,
}) => {
  return (
    <View style={styles.movieItemContainer}>
      <View>
        <Image source={source} style={styles.moviewBanner} />
      </View>
      <View style={styles.movieDetailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={3}>
          {overview}
        </Text>

        <View style={styles.actionsContainer}>
          <View style={styles.likeContainer}>
            <Image
              source={require('../assets/star.png')}
              style={styles.ratingLikesIcon}
            />
            <Text style={styles.voteText}> {vote_average}</Text>
          </View>
          <View style={styles.likeContainer}>
            <Image
              source={require('../assets/like.png')}
              style={styles.ratingLikesIcon}
            />
            <Text style={styles.voteText}> {vote_count}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.likeContainer}>
            {existsState ? (
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

export default Card;
