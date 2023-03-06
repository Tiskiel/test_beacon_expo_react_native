import { StatusBar } from 'expo-status-bar';
import { Button, LogBox, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

async function requestAccessFineLocationPermission() {
  const grantedScan = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later"',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK'
    }
  )

  const grantedConnection = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later"',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK'
    }
  )
  
  return grantedScan === PermissionsAndroid.RESULTS.GRANTED && grantedConnection === PermissionsAndroid.RESULTS.GRANTED;
}

export default function App() {

  const startDiscovery = async () => {
    try {
      const granted = await requestAccessFineLocationPermission();
  
      if (!granted) {
      throw new Error(`Access fine location was not granted`);
      }
  
      try {
      const unpaired = await RNBluetoothClassic.startDiscovery();
      
      //Récupère une liste d'objet qui correspond au nom "WGX_iBeacon"
      console.log(await unpaired.find(e => e.name === "WGX_iBeacon"))
                                                              

      // const device = await RNBluetoothClassic.connectToDevice(unpaired.find(e => e.name === "WGX_iBeacon").address)

      // console.log(device)

      // const connected = await device.isConnected()

      // console.log(connected)

      // device.read().then((data) => console.log(data))
      } finally {
      }      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <StatusBar style="auto" />
      <Button title='click moi' onPress={async () => {
        const device = await startDiscovery()
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

