import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { MapRegion, MarkerPosition } from "../../types";
import styles from "./styles";
import { updateContact } from "../../service/contactService";

export default function TelaCadastro({ navigation, route }: any) {
  const GOOGLE_API_KEY = "COLOCAR SUA CHAVE AQUI";
  const { contato } = route.params;

  const [nome, setNome] = useState(contato.name);
  const [endereco, setEndereco] = useState(contato.address);
  const [longNames, setLongNames] = useState(contato.address);  // Isso pode ser mantido se você for usar para exibir o endereço formatado
  const [region, setRegion] = useState<MapRegion>({
    latitude: contato.latitude,
    longitude: contato.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    latitude: contato.latitude,
    longitude: contato.longitude,
  });
  const [loading, setLoading] = useState(false);

  const salvarContato = async () => {
    if (!nome || !longNames || markerPosition.latitude === undefined || markerPosition.longitude === undefined) {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    const contatoAtualizado = {
      id: contato.id,
      name: nome,
      address: longNames,
      latitude: markerPosition.latitude,
      longitude: markerPosition.longitude,
    };

    try {
      await updateContact(contatoAtualizado);
      navigation.navigate("Contatos");
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar o contato");
      console.error("Erro ao salvar contato:", error);
    }
  };

  const buscarCoordenadas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setLoading(false);

      if (data.results.length > 0) {
        const resultado = data.results[0];
        const formattedAddress = resultado.formatted_address;
        setLongNames(formattedAddress);
        setEndereco(formattedAddress);  // Atualizando o campo de texto com o novo endereço

        const location = resultado.geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        // Atualizando a região e a posição do marcador
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setMarkerPosition({ latitude, longitude });
      } else {
        Alert.alert("Erro", "Endereço não encontrado!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Erro ao buscar endereço!");
    }
  };

  const handleMarkerDragEnd = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    await buscarEnderecoPorCoordenadas(latitude, longitude);

    // Atualizando o campo de endereço com o novo valor
    setEndereco(longNames);  // Atualiza o campo de texto com o novo endereço
  };

  const buscarEnderecoPorCoordenadas = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setLoading(false);

      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const street = addressComponents.find((component: any) => component.types.includes("route"))?.long_name || "Desconhecido";
        const city = addressComponents.find((component: any) => component.types.includes("locality"))?.long_name || "Desconhecido";
        const state = addressComponents.find((component: any) => component.types.includes("administrative_area_level_1"))?.long_name || "Desconhecido";
        const country = addressComponents.find((component: any) => component.types.includes("country"))?.long_name || "Desconhecido";

        const enderecoCompleto = `${street}, ${city} - ${state}, ${country}`;
        setLongNames(enderecoCompleto);
        setEndereco(enderecoCompleto);  // Atualizando o campo de texto com o novo endereço

        // Adicionando console.log para verificar o endereço completo
        console.log("Endereço encontrado pelas coordenadas:", enderecoCompleto);
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Erro ao buscar o endereço!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}  // Atualiza o campo de endereço
        onBlur={buscarCoordenadas}  // Atualiza as coordenadas ao perder o foco
      />
      {longNames ? <Text style={styles.enderecoText}>Endereço: {longNames}</Text> : null}

      <Button title="Salvar" onPress={salvarContato} disabled={loading} />

      {loading && <Text>Carregando...</Text>} {/* Feedback de carregamento */}

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={handleMarkerDragEnd}  // Atualiza o marcador e o endereço ao arrastar
        />
      </MapView>
    </View>
  );
}
