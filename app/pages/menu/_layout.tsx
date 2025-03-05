import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigator from './navigation/DrawerNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
