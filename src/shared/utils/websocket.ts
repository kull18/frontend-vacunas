export const getWebSocketURL = (path: string): string => {
  if (typeof window === 'undefined') return '';
  
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  
  // Para dectar el tipo de protocolo por los headers
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  const wsHost = isLocalhost ? 'localhost:8080' : host;
  
  return `${protocol}//${wsHost}${path}`;
};