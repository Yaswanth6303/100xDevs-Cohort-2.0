import prisma from './config/database';

interface UpdateUser {
  email: string;
  firstName: string;
  lastName: string;
}

async function updateUser({ email, firstName, lastName }: UpdateUser) {
  const user = await prisma.user.update({
    where: { email },
    data: {
      firstName,
      lastName,
    },
  });
  return user;
}

updateUser({
  email: 'qwerty@gmail.com',
  firstName: 'Kumar',
  lastName: 'Desai',
}).then((user) => {
  console.log(user);
});
