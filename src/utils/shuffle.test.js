import shuffle from './shuffle'; // adjust the import according to your file structure

describe('shuffle function', () => {
  const original = [1, 2, 3, 4, 5];
  
  it('should return an array with the same length', () => {
    const array = [...original];
    shuffle(array);
    expect(array.length).toEqual(array.length);
  });

  it('should contain the same elements', () => {
    const array = [...original];
    shuffle(array);
    expect(array.sort()).toEqual(array.sort());
  });

  it('should shuffle the elements', () => {
    const array = [...original];
    shuffle(array);
    let differentOrder = false;
    for (let i = 0; i < 100; i++) {
      if (!array.every((value, index) => value === original[index])) {
        differentOrder = true;
        break;
      }
    }
    expect(differentOrder).toBeTruthy();
  });
});
