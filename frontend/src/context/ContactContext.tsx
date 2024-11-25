// src/context/ContactContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Contact, ContactContextType, ContactProviderProps } from "../types";  // Importando a interface Contact
import { getContacts, createContact, updateContact, removeContact } from "../service/contactService";

// Criando o contexto e exportando
export const ContactContext = createContext<ContactContextType | undefined>(undefined);

// Criando o provider do contexto
export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]); // Usando o tipo Contact[]

  // Função para buscar contatos
  const fetchContacts = async () => {
    try {
      const contactsData = await getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  // Função para adicionar um novo contato
  const addContact = async (contact: Contact) => {
    try {
      const newContact = await createContact(contact);
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
    }
  };

  // Função para atualizar um contato
  const updateContactHandler = async (contact: Contact) => {
    try {
      await updateContact(contact);
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c.id === contact.id ? { ...c, ...contact } : c))
      );
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
    }
  };

  // Função para excluir um contato
  const deleteContact = async (id: number) => {
    try {
      await removeContact(id);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir contato:", error);
    }
  };

  // Efeito para buscar os contatos quando o componente for montado
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact: updateContactHandler, deleteContact, fetchContacts }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Hook para consumir o contexto
export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts deve ser usado dentro de um ContactProvider");
  }
  return context;
};
