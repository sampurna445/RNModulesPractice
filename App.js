import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  SafeAreaView,
} from 'react-native';
import styles from './styles';

const App = () => {
  const [helloData, setHelloData] = useState(null);
  const [otherData, setOtherData] = useState(null);

  const handlePressHello = () => {
    NativeModules.RNHello.findEvents((error, result) => {
      if (error) {
        console.error(error);
      } else {
        setHelloData(result);
      }
    });
  };

  const handlePressOther = () => {
    NativeModules.RCOther.getData()
      .then(data => {
        setOtherData(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePressHello}>
        <Text style={styles.buttonText}>Call RNHello Module</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePressOther}>
        <Text style={styles.buttonText}>Call RCOther Module</Text>
      </TouchableOpacity>

      {helloData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Hello Data:</Text>
          <Text style={styles.dataText}>{helloData}</Text>
        </View>
      )}

      {otherData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Other Data:</Text>
          {otherData.map((item, index) => (
            <Text key={index} style={styles.dataText}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default App;
