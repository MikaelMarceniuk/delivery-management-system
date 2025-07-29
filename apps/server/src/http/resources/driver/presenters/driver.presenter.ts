import { Driver } from '@prisma/client';

export class DriverPresenter {
  id: string;
  name: string;
  phone: string;
  cnhCategory: string[];

  constructor({ id, name, phone, cnhCategory }: Driver) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.cnhCategory = cnhCategory;
  }
}
