import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

export async function getLocationPermissions() {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted) {
        resolve(true);
      }
      else {
        reject(false);
      }
    }
    else {
      resolve(true);
    }
  });
}
