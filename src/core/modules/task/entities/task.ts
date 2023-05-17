import { randomUUID } from 'node:crypto';

export type TaskType = {
  id?: string;
  title: string;
  userId: string;
};

export class Task {
  private _id: string;
  private _title: string;
  private _userId: string;

  constructor({ id, title, userId }: TaskType) {
    this._id = id || randomUUID();
    this._title = title;
    this._userId = userId;
  }

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public set title(title) {
    this._title = title;
  }
  public get title() {
    return this._title;
  }

  public set userId(userId: string) {
    this._userId = userId;
  }

  public get userId(): string {
    return this._userId;
  }
}
