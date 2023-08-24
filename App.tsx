import React, {FC, createContext,useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigation from './src/navigation/rootnavigation';
import data from './src/data/data.json';

export const dataContext = createContext<any>(null);
const App: FC = () => {
  const [eventData,setEventData] = useState(data)
  return (
    <dataContext.Provider value={{eventData , setEventData }}>
      <SafeAreaView style={styles.container}>
        <RootNavigation />
      </SafeAreaView>
    </dataContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
