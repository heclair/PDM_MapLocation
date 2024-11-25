// src/services/contactService.ts

import { Contact, CreateContactResponse, GetContactsResponse } from "../types";

// Definindo a URL base do backend
const BASE_URL = "http://192.168.1.4:3011";

// Função para obter todos os contatos
export const getContacts = async (): Promise<GetContactsResponse[]> => {
  try {
    const response = await fetch(`${BASE_URL}/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar contatos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Função para criar um novo contato
export const createContact = async (contact: Contact): Promise<CreateContactResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar contato");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Função para atualizar um contato existente
export const updateContact = async (contact: Contact): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar contato");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Função para remover um contato
export const removeContact = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao remover contato");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
