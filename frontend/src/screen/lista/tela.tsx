import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useContacts } from "../../context/ContactContext";  // Importando o hook do contexto
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';  // Importando o ícone "X" da biblioteca

export default function TelaLista({ navigation }: any) {
  // Acessando os contatos do contexto
  const { contacts, fetchContacts, deleteContact } = useContacts();  // Importando o método deleteContact

  // Efeito para garantir que os contatos sejam buscados ao carregar a tela
  useEffect(() => {
    // A função fetchContacts pode ser uma chamada para atualizar os dados de contatos
    fetchContacts();  // Atualizando os contatos sempre que a tela for acessada
  }, [fetchContacts]); // O hook será chamado sempre que a tela for exibida novamente

  // Função para chamar o delete
  const handleDelete = (id: number) => {
    // Confirmação de exclusão
    deleteContact(id);
  };

  // Renderização dos itens da lista
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Localização', { contato: item })} // Navegar para a tela de detalhes
      >
        {/* Exibindo o nome e o endereço dentro de <Text> */}
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.endereco}>{item.address}</Text>
      </TouchableOpacity>
      
      {/* Botão de excluir */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)} // Chama a função para deletar
      >
        <Icon name="close" size={20} color="#fff" />  {/* Ícone "X" */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Verificar se a lista de contatos está carregada e não está vazia */}
      {contacts && contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id ? item.id.toString() : item.name} // Garantir que 'id' seja uma string
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.text}>Nenhum contato encontrado.</Text>  // Certifique-se de que o texto esteja dentro de <Text>
      )}
      
      {/* Botão para adicionar novo contato */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.addButtonText}>+</Text>  {/* Certifique-se de que o texto esteja dentro de <Text> */}
      </TouchableOpacity>
    </View>
  );
}
