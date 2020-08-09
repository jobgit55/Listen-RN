# TS-ListenBook
Listen book app in typescript

# how to use it
1. Confirm that your environment has been set up. [Setting up the development environment](https://reactnative.dev/docs/environment-setup)
2. Provide api through localhost port 3001 eg: http://127.0.0.1:3001/
3. Run ```yarn android``` or ```yarn ios```

# packages used in this demo
- Flex Style
- View/Image/Text/FlatList
- TouchableOpacity
- StyleSheet
- Timers
- Animated
- react-native-storage
- realm
- dva-core
- react-navigation
- react-native-linear-gradient
- react-native-snap-carousel
- react-native-sound
- react-native-video
- formik
- yup
- axios
- react-native-config

# if issue happends while running yarn ios
add this code snippet before ```return fetch()``` node_modules/realm/scripts/download-realm.js
```
console.log('destination: ', destination)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 60 * 1000)
    })
```
