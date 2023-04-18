import React, { useCallback } from 'react';
import format from 'date-fns/format';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import Reanimated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import Theme from '../theme';
import { MoodOptionWithTimestamp } from '../types';
import { useAppContext } from '../App.provider';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

const maxSwipe = 180;

const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const appContext = useAppContext();
  const translateX = useSharedValue(0);

  const handleDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [item, appContext]);

  const deleteWithDelay = useCallback(() => {
    setTimeout(() => {
      handleDelete();
    }, 500);
  }, [handleDelete]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: e => {
      translateX.value = e.translationX;
    },
    onEnd: e => {
      if (Math.abs(e.translationX) > maxSwipe) {
        translateX.value = withTiming(1000 * Math.sign(e.translationX));
        runOnJS(deleteWithDelay)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }),
    [],
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Reanimated.View style={[styles.moodItem, cardStyle]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDescription: {
    fontSize: 18,
    color: Theme.colorPurple,
    fontFamily: Theme.fontFamilyRegular,
  },
  moodDate: {
    textAlign: 'center',
    color: Theme.colorLavender,
    fontFamily: Theme.fontFamilyRegular,
  },
  deleteText: {
    fontFamily: Theme.fontFamilyBold,
    color: Theme.colorBlue,
  },
});

export default MoodItemRow;
