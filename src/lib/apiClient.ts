class APIClient {
  public baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Basic request method-- pass it a URL and the fetch options (e.g. method, headers, etc.)
  private async request(url: string, options: RequestInit) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
    });
    return response;
  }

  public get(url: string, options: RequestInit) {
    return this.request(url, {
      ...options,
      method: "GET",
    });
  }

  public post<T = unknown>(url: string, data: T, options: RequestInit) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public delete(url: string, options: RequestInit) {
    return this.request(url, {
      ...options,
      method: "DELETE",
    });
  }

  public patch<T = unknown>(url: string, data: T, options: RequestInit) {
    return this.request(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public put<T = unknown>(url: string, data: T, options: RequestInit) {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}

export default APIClient;

// EXAMPLE 1: INITIALIZATION -----:
// For every different API you'll be using, you can create a new client with a different base url ("myapi.com")
// preferrably from an ENV file
/*

  const api = new APIClient(env.HOST_NAME);
  export default api;

*/

// EXAMPLE 2: USAGE  -----:
// We can use this in a feature branch's API folder (e.g. features/[feature]/api/getSomething.ts) alongside
// tanstack/react-query
// https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/features/users/components/users-list.tsx
/*
  import { queryOptions, useQuery } from '@tanstack/react-query';
  import { api } from '@/lib/api-client';
  import { QueryConfig } from '@/lib/react-query';
  import { User } from '@/types/api';

  // *** THIS IS HOW THE API CLIENT GETS USED
  export const getUsers = (): Promise<{ data: User[] }> => {
    const response = await api.get("/users");
    const data = await response.json();
    return { response, data };
  };

  // This is setting up react-query stuff
  export const getUsersQueryOptions = () => {
    return queryOptions({
      queryKey: ['users'],
      queryFn: getUsers,
    });
  };

  type UseUsersOptions = {
    queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
  };

  // This is a react-query hook
  export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
    return useQuery({
      ...getUsersQueryOptions(),
      ...queryConfig,
    });
  };
*/
