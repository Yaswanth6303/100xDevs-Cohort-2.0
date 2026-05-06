import prisma from './config/database';

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log(user);
  return user;
}

getUser('qwerty@gmail.com');
