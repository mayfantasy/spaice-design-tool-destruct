export class Category {
  id: string
  name: string
  isAvailable: boolean = false
  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
  children: Category[] = []
}
