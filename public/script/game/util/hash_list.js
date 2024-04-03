export default class HashList {
  constructor(base_length = 100) {
    this.base_length = base_length;
    this.hash_list = new Array(base_length);

    // initialize the hash list with appending list to each index
    for (let i = 0; i < base_length; i++) {
      this.hash_list[i] = [];
    }
  }

  hash(i, j) {
    return (i + j) % this.base_length;
  }

  // function to add an element to the hash list
  add(i, j, element) {
    const hash = this.hash(i, j);
    this.hash_list[hash].push(element);
  }

  // function to remove an element from the hash list
  remove(i, j) {
    const hash = this.hash(i, j);
    this.hash_list[hash] = this.hash_list[hash].filter(
      (el) => el.row !== i && el.col !== j
    );
  }

  // function to get the elements in the hash list
  get(i, j) {
    if (i < 0 || j < 0) return undefined;

    const hash = this.hash(i, j);
    return this.hash_list[hash].find((el) => el.row === i && el.col === j);
  }

  // function to get all the elements in the hash list
  getAll() {
    return this.hash_list.flat();
  }

  // clear the hahs list
  clear() {
    for (let i = 0; i < this.base_length; i++) {
      this.hash_list[i] = [];
    }
  }
}
