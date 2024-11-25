import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  markerContainer: {
    alignItems: 'center', // Centraliza o rótulo e o pin
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  labelContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5, // Distância entre o rótulo e o marcador
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  pinImage: {
    width: 30, // Largura da imagem do pin
    height: 40, // Altura da imagem do pin
  },
});
