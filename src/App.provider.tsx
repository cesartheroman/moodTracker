import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOptionType, MoodOptionWithTimestamp } from './types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

const storageKey = 'my-app-data';

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setAppData = async (newData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch (err) {
    console.error(err);
  }
};

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback(
    (mood: MoodOptionType) => {
      const newMoodList = [...moodList, { mood, timestamp: Date.now() }];
      setAppData({ moods: newMoodList });

      setMoodList(newMoodList);
    },
    [moodList],
  );

  const handleDeleteMood = useCallback(
    (moodToDelete: MoodOptionWithTimestamp) => {
      const filteredMoodList = moodList.filter(pastMood => {
        if (moodToDelete.timestamp !== pastMood.timestamp) {
          return pastMood;
        }
      });

      setAppData({ moods: filteredMoodList });
      setMoodList(filteredMoodList);
    },
    [moodList],
  );

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
