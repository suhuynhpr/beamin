import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: 'Pizza',
        description: 'Delicious pizza varieties',
        image: 'https://www.pizzahut.com/static/images/pizzas.png',
      },
      {
        id: 2,
        name: 'Burgers',
        description: 'Juicy burgers',
        image: 'https://www.mcdonalds.com/us/en-us/product/burgers.html',
      },
      {
        id: 3,
        name: 'Pasta',
        description: 'Italian pasta dishes',
        image: 'https://www.olivegarden.com/menu/pasta',
      },
    ],
  });
  // Foods
  await prisma.food.createMany({
    data: [
      {
        id: 1,
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni pizza',
        price: 1200,
        image: 'https://www.pizzahut.com/static/images/pizzas.png',
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella and tomato sauce',
        price: 1000,
        image: 'https://www.pizzahut.com/static/images/pizzas.png',
        categoryId: 1,
      },
      {
        id: 3,
        name: 'Cheeseburger',
        description: 'Classic cheeseburger',
        price: 900,
        image: 'https://www.mcdonalds.com/us/en-us/product/burgers.html',
        categoryId: 2,
      },
      {
        id: 4,
        name: 'Chicken Burger',
        description: 'Juicy chicken burger',
        price: 1000,
        image: 'https://www.mcdonalds.com/us/en-us/product/burgers.html',
        categoryId: 2,
      },
      {
        id: 5,
        name: 'Spaghetti Carbonara',
        description: 'Creamy carbonara sauce with bacon',
        price: 1100,
        image: 'https://www.olivegarden.com/menu/pasta',
        categoryId: 3,
      },
      {
        id: 6,
        name: 'Lasagna',
        description: 'Layered pasta with meat sauce',
        price: 1200,
        image: 'https://www.olivegarden.com/menu/pasta',
        categoryId: 3,
      },
    ],
  });

  // Users
  const users = await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password:
          '$2b$10$Q9Grd6epfIrsspNfIaGPIeFsqT0D8dO77lwQxDosUsUgtrDUR8Aa6',
        phoneNumber: '1234567890',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        profileImage: 'https://www.example.com/profile-image.png',
        address: '123 Main Street',
        bio: 'Software developer',
        isEmailVerified: true,
        lastLoginAt: new Date(),
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password:
          '$2b$10$Q9Grd6epfIrsspNfIaGPIeFsqT0D8dO77lwQxDosUsUgtrDUR8Aa6',
        phoneNumber: '9876543210',
        dateOfBirth: new Date('1992-02-02'),
        gender: 'Female',
        profileImage: 'https://www.example.com/profile-image.png',
        address: '456 Elm Street',
        bio: 'Web designer',
        isEmailVerified: true,
        lastLoginAt: new Date(),
      },
    ],
  });

  // Articles
  await prisma.article.createMany({
    data: [
      {
        id: 1,
        title: 'Article 1',
        description: 'This is the first article',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authorId: 1,
      },
      {
        id: 2,
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
