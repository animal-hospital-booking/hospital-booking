declare namespace google.accounts.oauth2 {
  interface TokenClient {
    requestAccessToken(): void;
  }
  interface TokenResponse {
    access_token: string;
    error?: string;
  }
  function initTokenClient(config: {
    client_id: string;
    scope: string;
    callback: (response: TokenResponse) => void;
  }): TokenClient;
  function revoke(token: string, callback: () => void): void;
}

declare namespace gapi {
  function load(name: string, callback: () => void): void;
  namespace client {
    function init(config: object): Promise<void>;
    function load(api: string, version: string): Promise<void>;
    function setToken(token: { access_token: string } | null): void;
    namespace calendar.events {
      function insert(params: {
        calendarId: string;
        resource: object;
      }): Promise<{ result: { id?: string } }>;
      function update(params: {
        calendarId: string;
        eventId: string;
        resource: object;
      }): Promise<{ result: { id?: string } }>;
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      function remove(params: {
        calendarId: string;
        eventId: string;
      }): Promise<void>;
    }
  }
}
