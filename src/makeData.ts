import faker from "faker";

export const range = (len: number) => {
  const xs = []
  for (let i = 0; i < len; i++) {
    xs.push(i)
  }
  return xs;
};

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth: number = 0): any[] => {
    const len = lens[depth]
    return range(len)
      .map(d => ({ ...newPerson(), subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined}));
  };

  return makeDataLevel()
}
