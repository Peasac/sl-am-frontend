export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  lastLogin: string;
  status: "active" | "inactive";
  avatar?: string;
  assetCount:number;
}

export interface Asset {
  id: string;
  name: string;
  type: "LAPTOP" | "SERVER" | "NETWORK" | "WORKSTATION" | "MONITOR" | "OTHER";
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: "COMPLIANT" | "CRITICAL" | "PENDING" | "NON_COMPLIANT";
  assignedTo?: string;
  department?: string;
  location?: string;
  category: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
}

export interface AssetDetail extends Asset {
  cpu?: string;
  ram?: string;
  storage?: string;
  os?: string;
  macAddress?: string;
  ipAddress?: string;
  deviceConfig?: string;
  encryptionStatus?: string;
  antivirus?: string;
  compliance?: string;
  lastAudit?: string;
  owner?: string;
  costCenter?: string;
  roomNumber?: string;
}

export interface Activity {
  id: string;
  type: "add" | "warning" | "alert" | "info";
  title: string;
  description: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
