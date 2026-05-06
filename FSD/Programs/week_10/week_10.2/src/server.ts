import prisma from './config/database';

// prisma gets to know i have user and todo table here because when i do bunx prisma generate
// it generates the prisma client which has the schema of the database and i have user and todo
// table here because when i do bunx prisma generate

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

async function createUser({ email, password, firstName, lastName }: User) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
  return user;
}

createUser({
  email: 'qwerty@gmail.com',
  password: 'qwerty@123',
  firstName: 'Qwerty',
  lastName: 'Rockerz',
}).then((user) => {
  console.log(user);
});
