class ArrayDisplay extends Array{
  constructor(container, elements){
    if (!(container instanceof HTMLElement)) {
      throw new Error('Container must be a valid DOM element.');
    }
    this.container = container;
  }
}

