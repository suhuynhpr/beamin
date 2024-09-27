import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Categories
  await prisma.category.createMany({
    data: [
      {
        name: 'Pizza',
        description: 'Delicious pizza varieties',
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
      },
      {
        name: 'Burgers',
        description: 'Juicy burgers',
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
      },
      {
        name: 'Pasta',
        description: 'Italian pasta dishes',
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
      },
    ],
  });
  //Foods
  await prisma.food.createMany({
    data: [
      {
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni pizza',
        price: 1200,
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        categoryId: 1,
        kind: 'pizza',
        address: '123 Main Street',
      },
      {
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella and tomato sauce',
        price: 1000,
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        categoryId: 1,
        address: '123 Main Street',
      },
      {
        name: 'Cheeseburger',
        description: 'Classic cheeseburger',
        price: 900,
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        categoryId: 2,
        address: '123 Main Street',
      },
      {
        name: 'Chicken Burger',
        description: 'Juicy chicken burger',
        price: 1000,
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        categoryId: 2,
        address: '123 Main Street',
      },
      {
        name: 'Spaghetti Carbonara',
        description: 'Creamy carbonara sauce with bacon',
        price: 1100,
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        categoryId: 3,
        address: '123 Main Street',
      },
      {
        name: 'Lasagna',
        description: 'Layered pasta with meat sauce',
        price: 1200,
        image:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        categoryId: 3,
        address: '123 Main Street',
      },
    ],
  });

  // Users
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password:
          '$2b$10$Q9Grd6epfIrsspNfIaGPIeFsqT0D8dO77lwQxDosUsUgtrDUR8Aa6',
        phoneNumber: '1234567890',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        profileImage:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        address: '123 Main Street',
        bio: 'Software developer',
        isEmailVerified: true,
        lastLoginAt: new Date(),
        permision: 'user',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password:
          '$2b$10$Q9Grd6epfIrsspNfIaGPIeFsqT0D8dO77lwQxDosUsUgtrDUR8Aa6',
        phoneNumber: '9876543210',
        dateOfBirth: new Date('1992-02-02'),
        gender: 'Female',
        profileImage:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        address: '456 Elm Street',
        bio: 'Web designer',
        isEmailVerified: true,
        lastLoginAt: new Date(),
        permision: 'user',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password:
          '$2b$10$Q9Grd6epfIrsspNfIaGPIeFsqT0D8dO77lwQxDosUsUgtrDUR8Aa6',
        phoneNumber: '9876543210',
        dateOfBirth: new Date('1992-02-02'),
        gender: 'Female',
        profileImage:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        address: '456 Elm Street',
        bio: 'Web designer',
        isEmailVerified: true,
        lastLoginAt: new Date(),
        permision: 'user',
      },
      {
        name: 'Jane Doe',
        email: 'admin@gmail.com',
        password:
          '$2b$10$Q9Grd6epfIrsspNfIaGPIeFsqT0D8dO77lwQxDosUsUgtrDUR8Aa6',
        phoneNumber: '9876543210',
        dateOfBirth: new Date('1992-02-02'),
        gender: 'Female',
        profileImage:
          'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
        address: '456 Elm Street',
        bio: 'Web designer',
        isEmailVerified: true,
        lastLoginAt: new Date(),
        permision: 'admin',
      },
    ],
  });

  //Articles
  await prisma.article.createMany({
    data: [
      {
        title: 'Article 1',
        description: 'This is the first article',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authorId: 1,
      },
      {
        title: 'Article 2',
        description: 'This is the second article',
        body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        authorId: 2,
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
