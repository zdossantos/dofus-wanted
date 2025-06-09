export interface Server {
  id: string;
  name: string;
  language: string;
}

export const allServers: Server[] = [
  { id: 'atcham', name: 'Atcham', language: 'fr' },
  { id: 'boune', name: 'Boune', language: 'fr' },
  { id: 'drake', name: 'Drakonia', language: 'fr' },
  { id: 'echo', name: 'Echo', language: 'fr' },
  { id: 'ilyzaelle', name: 'Ilyzaelle', language: 'fr' },
  { id: 'julith', name: 'Julith', language: 'fr' },
  { id: 'meriana', name: 'Meriana', language: 'fr' },
  { id: 'omegalt', name: 'Omegalt', language: 'fr' },
  { id: 'pandore', name: 'Pandore', language: 'fr' },
  { id: 'temporis', name: 'Temporis', language: 'fr' },
  { id: 'ush', name: 'Ush', language: 'fr' },
];

export const getServerById = (id: string): Server | undefined => {
  return allServers.find(server => server.id === id);
};
