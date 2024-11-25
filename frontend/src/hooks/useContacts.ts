// src/hooks/useContacts.ts

import { useContext } from 'react';
import { ContactContext } from '../context/ContactContext'; // Importando o contexto

// Este hook customizado facilita o uso do contexto dentro das páginas
export const useContacts = () => {
  const context = useContext(ContactContext);  // Pegando o contexto

  if (!context) {
    throw new Error("useContacts deve ser usado dentro de um ContactProvider");
  }

  return context;
};
