import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';
import { CustomMarker } from '../../component/CustomMarker/CustomMarker';

export default function TelaContato({ route, navigation }: any) {
  const { contato } = route.params;

  const latitude = contato.latitude || 0;
  const longitude = contato.longitude || 0;

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleMarkerPress = () => {
    // Navegar para a tela de atualização de contato
    navigation.navigate("Atualizar Cadastro", { contato });  // Passa os dados do contato
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {/* Utilizando o marcador personalizado */}
        <CustomMarker 
          latitude={latitude} 
          longitude={longitude} 
          name={contato.name} 
          onPress={handleMarkerPress}  // Passa o onPress para navegar
        />
      </MapView>
    </View>
  );
}
