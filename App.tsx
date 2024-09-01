import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigation from './src/navigation/rootnavigation';
import FlashMessage from 'react-native-flash-message';
import {AppProvider} from './src/hooks/apphook';

const App: FC = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <RootNavigation />
        <FlashMessage position="top" />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
