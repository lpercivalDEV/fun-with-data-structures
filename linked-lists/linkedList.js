// ** SINGLY LINKED LIST ** //  --> only one pointer and one direction

const head = Symbol("head");
const tail = Symbol("tail");

class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
    constructor() {
      this[head] = null;
      this[tail] = null;
    }

    add(data) {
      //create a new node
      const newNode = new LinkedListNode(data);

      //special case: no items in the list yet
      if(this[head] == null) {
        //set head to the new node
        this[head] = newNode;
      }else{

        //start out by looking at first node
        let current = this[head];

        //follow 'next' links until you reach the end of the list
        while (current.next !== null) {
          current = current.next;
        }

        //assign the node into the 'next' pointer
        current.next = newNode;
        this[tail] = newNode;
      }
    }

    get(index) {

      //ensure 'index' is a positive value
      if (index > -1) {

        //the pointer to use for traversal
        let current = this[head];

        //used to keep track of where in the list you are
        let i = 0;

        //traverse the list until you reach either the end or the index
        while ((current !== null) && (i < index)) {
          current = current.next;
          i++;
        }

        //return the data if 'current' isn't null
        return current !== null ? current.data : undefined;
      }else{

        //return undefined
        return `Your index ${index} is ${undefined}`
      }
    }

    remove(index) {

      //special cases: empty list or invalid 'index'
      if ((this[head] === null) || (index < 0)) {
        throw new RangeError(`Index ${index} does not exist in the list`);
      }

      //special case: removing the first newNode
      if (index === 0) {

        //temporarily store the data from the node
        const data = this[head].data;

        //replace the head with the next node in the list
        this[head] = this[head].next;

        //return the data at the previous head of the list
        return data;
      }

      //pointer used to traverse the list
      let current = this[head];

      //keeps track of the node before current in the loop
      let previous = null;

      //used to track how deep into the list we've traversed
      let i = 0;

      //same loops as in 'get()'
      while ((current !== null) && (i < index)) {

        //save the value of current
        previous = current;

        //traverse to the next node
        current = current.next;

        //increment the count
        i++;
      }

      //if node was found, remove it
      if (current !== null) {

        //check if we are deleting tail
        if (current.data === this[tail].data) {

          //if there's previous data make that the new tail, if not make the tail null
          this[tail] = previous ? previous.data : null
        }

        //skip over the node to remove
        previous.next = current.next;

        //return the value that was just removed from the list
        return current.data;
      }

      //if node wasn't found, throw an error
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    //Make this class iterable so that we may use 'for...of' loops
    *values() {
      let current = this[head];

      while (current !== null) {
        yield current.data;
        current = current.next;
      }
    }
    [Symbol.iterator]() {
      return this.values();
    }
}

let ryry = {name: "Ryry", job: 'SE'}
let lilly = {name: "Lilly", job: 'SE'}
let allison = {name: "Allison", job: 'Music'}

let list = new LinkedList

list.add(ryry);
// console.log(list);
// console.log(list[head], list[tail]);
list.add(lilly);
list.add(allison);
list.add("testing");
list.add(1);
list.add(null);
list.add([1,2,3]);
list.add(undefined);
// console.log(list);
// console.log(list[head], list[tail]);
// console.log(list.get(0));
// list.remove(6);
// console.log(list);
for (const thing of list) {
  console.log(thing);
}
