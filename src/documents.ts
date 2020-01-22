import { ObjectID } from 'mongodb';

export interface Document {
  readonly id: string;
  readonly title?: string;
  readonly tags: string[];
  readonly body?: string;
}
