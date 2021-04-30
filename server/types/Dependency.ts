export type Type = 'dev' | 'extraneous' | 'global' | 'prod';
export type Manager = 'npm' | 'pnpm' | 'yarn';

export interface Basic {
  name: string;
  version?: string;
  type?: Type;
}

export interface Npm {
  name: string;
  type: Type;
  version?: string;
  required?: string;
}

export interface Version {
  wanted: string;
  latest: string;
}

export interface Entire {
  name: string;
  type: Type;
  required?: string | null;
  installed?: string | null;
  wanted?: string | null;
  latest?: string | null;
  manager: Manager;
  // unused?: boolean;
}

export interface SearchResult {
  description: string;
  name: string;
  score: number;
  url: string;
  version: string;
}
