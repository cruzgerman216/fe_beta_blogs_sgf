import { User } from './user';

export class Blog {
  id!: number;
  title: string = '';
  content: string = '';
  cover_image_url?: string = '';
  user_id?: number;
  user?: User;
}
