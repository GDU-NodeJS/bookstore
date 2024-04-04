class Book {
  constructor(id, price, image, name, author, description) {
    this.id = id;
    this.price = price;
    this.image = image;
    this.name = name;
    this.author = author;
    this.description = description;
  }

  toString() {
    return `Book {
      id: ${this.id},
      price: ${this.price},
      image: '${this.image}',
      name: '${this.name}',
      author: '${this.author}',
      description: '${this.description}'
    }`;
  }
}

export default Book;
