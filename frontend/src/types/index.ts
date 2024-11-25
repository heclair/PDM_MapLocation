import { ReactNode } from "react";

export interface MapRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
  
  export interface MarkerPosition {
    latitude: number;
    longitude: number;
  }
  
  export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  // src/types/index.ts

export interface Contact {
  id?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateContactResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface GetContactsResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface ContactContextType {
  contacts: Contact[]; // Lista de contatos
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
  fetchContacts: () => void;
}

// Tipando a propriedade 'children' como ReactNode
export interface ContactProviderProps {
  children: ReactNode;  // O tipo ReactNode permite qualquer tipo de filho no React
}