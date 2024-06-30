// src/app/models/user.model.ts
export interface RoleModel {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    roles: RoleModel[];
  }
  