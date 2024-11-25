import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,  // Isso faz com que a tela ocupe 100% da altura da tela
    backgroundColor: '#fff',  // Cor de fundo
  },
  map: {
    flex: 1,  // Faz com que o mapa ocupe todo o espaço disponível na tela
  },
  calloutBox: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,  // Garantindo uma largura mínima para a caixa
    alignItems: 'center',
  },
  calloutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  labelContainer: {
    position: 'relative',
    bottom: 35, // Reposiciona o rótulo acima do pin
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  markerContainer: {
    alignItems: 'center', // Centraliza o rótulo e o pin
  },
  pinIcon: {
    width: 30, // Largura do pin
    height: 40, // Altura do pin
  },
});
