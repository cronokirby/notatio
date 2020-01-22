import { ObjectID } from 'mongodb';

export interface Document {
  readonly _id: ObjectID;
  readonly title?: string;
  readonly tags: string[];
  readonly body?: string;
}
