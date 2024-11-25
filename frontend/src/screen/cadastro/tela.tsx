import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { MapRegion, MarkerPosition } from "../../types";
import { useContacts } from "../../context/ContactContext";  // Importando o contexto
import styles from "./styles";

export default function TelaCadastro({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [longNames, setLongNames] = useState(""); // Usado para exibir o endereço completo

  const [region, setRegion] = useState<MapRegion>({
    latitude: -23.29511, // Coordenadas padrão (Fatec Jacareí)
    longitude: -45.96653,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    latitude: -23.29511,
    longitude: -45.96653,
  });

  // Insira sua chave de API diretamente para teste (não use em produção)
  const GOOGLE_API_KEY = "COLOCAR SUA CHAVE AQUI";

  // Função para buscar coordenadas e endereço formatado
  const buscarCoordenadas = async () => {
    try {
      console.log(`Buscando coordenadas para: ${endereco}`);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      console.log("Resposta da API:", data);

      if (data.results.length > 0) {
        const resultado = data.results[0]; // Pegando o primeiro resultado

        // Pegando o endereço formatado diretamente
        const formattedAddress = resultado.formatted_address;
        setLongNames(formattedAddress); // Atualizando o estado com o endereço formatado

        // Pegando as coordenadas
        const location = resultado.geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        console.log("Coordenadas:", { latitude, longitude });

        const novaRegiao = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(novaRegiao);
        setMarkerPosition({ latitude, longitude });

        // Centraliza o mapa na nova região
        mapViewRef?.current?.animateToRegion(novaRegiao, 1000);
      } else {
        Alert.alert("Erro", "Endereço não encontrado!");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Erro ao buscar endereço!");
    }
  };

  // Utilizando o hook do contexto para obter a função de adicionar contato
  const { addContact } = useContacts();

  const salvarContato = async () => {
    if (!nome || !longNames || markerPosition.latitude === undefined || markerPosition.longitude === undefined) {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    const contato = {
      name: nome,
      address: longNames,
      latitude: markerPosition.latitude,
      longitude: markerPosition.longitude,
    };

    try {
      await addContact(contato);  // Usando a função do contexto para adicionar o novo contato
      navigation.navigate("Contatos");  // Navega para a lista de contatos após salvar
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar o contato");
      console.error("Erro ao salvar contato:", error);
    }
  };

  // Referência para o MapView
  const mapViewRef = React.useRef<MapView | null>(null);

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
        onChangeText={setEndereco}
        onBlur={buscarCoordenadas} // Busca as coordenadas ao sair do campo
      />

      {/* Exibe o endereço completo abaixo do campo de endereço */}
      {longNames ? (
        <Text style={styles.enderecoText}>Endereço: {longNames}</Text>
      ) : null}

      <Button title="Salvar" onPress={salvarContato} />
      <MapView
        ref={mapViewRef} // Adiciona a referência ao MapView
        style={styles.map}
        region={region}
      >
        <Marker coordinate={markerPosition} />
      </MapView>
    </View>
  );
}
