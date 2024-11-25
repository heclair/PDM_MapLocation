import React from 'react';
import { View, Text, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import styles from './styles';

interface CustomMarkerProps {
  latitude: number;
  longitude: number;
  name: string;
  onPress: () => void;  // Adiciona a propriedade onPress
}

export function CustomMarker({ latitude, longitude, name, onPress }: CustomMarkerProps) {
  return (
    <Marker coordinate={{ latitude, longitude }} onPress={onPress}> {/* Passa o onPress para o Marker */}
      <View style={styles.markerContainer}>
        {/* Rótulo acima do pin */}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{name}</Text>
        </View>

        {/* Imagem do pin */}
        <Image
          source={require('./pin.png')} // Certifique-se de que o arquivo 'pin.png' está na pasta correta
          style={styles.pinImage}
        />
      </View>
    </Marker>
  );
}
