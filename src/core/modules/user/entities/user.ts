import { randomUUID } from 'node:crypto';

export type UserType = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor({ id, name, email, password }: UserType) {
    this._id = id || randomUUID();
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name() {
    return this._name;
  }
  public set name(name) {
    this._name = name;
  }

  public get email() {
    return this._email;
  }
  public set email(email) {
    this._email = email;
  }

  public get password() {
    return this._password;
  }
  public set password(password) {
    this._password = password;
  }
}
