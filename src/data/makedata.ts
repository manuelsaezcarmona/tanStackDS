/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
import { faker } from '@faker-js/faker';
import { Person } from '../interfaces/Person';

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(40),
  visits: faker.datatype.number(1000),
  progress: faker.datatype.number(100),
  status: faker.helpers.shuffle<Person['status']>(['relationship', 'complicated', 'single'])[0]!,
});

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map(
      (): Person => ({
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }),
    );
  };

  return makeDataLevel();
}
