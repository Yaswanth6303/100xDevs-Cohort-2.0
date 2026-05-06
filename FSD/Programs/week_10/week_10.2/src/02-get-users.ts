import prisma from './config/database';

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
}

getUsers().then((users) => {
  console.log(users);
});
