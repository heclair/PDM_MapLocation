import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TelaCadastro from './src/screen/cadastro/tela';

import TelaInicio from './src/screen/inicio/tela';
import TelaLista from './src/screen/lista/tela';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactProvider } from './src/context/ContactContext';
import TelaContato from './src/screen/contato/tela';
import TelaUpdate from './src/screen/updateCadastro/updateCadastro';


const Stack = createStackNavigator();

export default function App() {
  return (
    <ContactProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={TelaInicio} />
        <Stack.Screen name="Contatos" component={TelaLista} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Localização" component={TelaContato} />
        <Stack.Screen name="Atualizar Cadastro" component={TelaUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
    </ContactProvider>
  );
}
