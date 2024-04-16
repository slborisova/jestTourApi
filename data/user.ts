import { faker } from "@faker-js/faker";
import {User} from "./interface";
let password = createRandomUser().password;
export const user = {
  name: createRandomUser().username,
  email: createRandomUser().email.toLowerCase(),
  password: password,
  passwordConfirm: password,
};

// export const user2 = {
//   name: createRandomUser().username,
//   email: createRandomUser().email.toLowerCase(),
//   password: password,
//   passwordConfirm: password,
// };

// export const user3 = {
//   name: createRandomUser().username,
//   email: createRandomUser().email.toLowerCase(),
//   password: password,
//   passwordConfirm: password,
// };

export function createRandomUser():User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
