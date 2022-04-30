import { v4 as uuid } from 'uuid';

export class BooksAdminService {
  private readonly ids = new Array(10).fill(0).map(() => uuid());

  public bookExists(id: string): boolean {
    return this.ids.includes(id);
  }
}
