// User and Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

// API Endpoint Types
export interface Endpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description?: string;
  status?: 'active' | 'inactive' | 'error' | 'paused';
  pollInterval?: number;
  lastPolledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastChecked?: Date;
}

// Schema Types
export interface SchemaNode {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  required?: string[];
  enum?: any[];
  default?: any;
  description?: string;
}

// Diff Types
export type DiffType = 'added' | 'removed' | 'changed' | 'unchanged';

export interface DiffNode {
  type: DiffType;
  key: string;
  oldValue?: SchemaNode | any;
  newValue?: SchemaNode | any;
  children?: DiffNode[];
}

export interface Diff {
  id: string;
  endpointId: string;
  oldSchema: SchemaNode;
  newSchema: SchemaNode;
  changes: DiffNode[];
  timestamp: Date;
  detectedAt?: Date;
  changelogText?: string;
  severity: Severity;
}

// Severity Types
export type Severity = 'low' | 'medium' | 'high' | 'critical' | 'BREAKING' | 'ADDITIVE' | 'NON-BREAKING';

// Changelog Types
export interface ChangeLogEntry {
  id: string;
  endpointId: string;
  changes: Diff[];
  createdAt: Date;
  description?: string;
}
