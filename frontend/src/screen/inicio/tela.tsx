import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import styles from './styles';

export default function TelaInicio({ navigation }: any) {
  useEffect(() => {
    // Verificar e solicitar autenticação biométrica no início
    verificarFaceID();
  }, []);

  // Função para verificar o Face ID e autenticar o usuário
  const verificarFaceID = async () => {
    // Verifica se o dispositivo tem hardware biométrico compatível (Face ID ou Touch ID)
    const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasBiometricHardware) {
      Alert.alert('Erro', 'Seu dispositivo não possui suporte a Face ID ou Touch ID.');
      return;
    }

    // Tenta autenticar com biometria
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Use o Face ID para continuar',
      fallbackLabel: '', // Remova o fallback para senha
    });

    if (result.success) {
      console.log('Autenticado com sucesso!');
      // Se a autenticação for bem-sucedida, navegue para a tela de contatos
      navigation.navigate('Contatos');
    } else {
      Alert.alert('Falha na autenticação', 'Falha ao autenticar com o Face ID.');
      console.log('Erro ao tentar autenticar', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App!</Text>
      <Button title="Iniciar" onPress={() => navigation.navigate('Contatos')} />
    </View>
  );
}
