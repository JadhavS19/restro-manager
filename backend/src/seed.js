const { User, MenuItem } = require('./models');
const { sequelize } = require('./config/db');

const menuItemsData = [
  { name: 'Spring Rolls', price: 180, category: 'Starters', available: true },
  { name: 'Tomato Soup', price: 150, category: 'Starters', available: true },
  { name: 'Garlic Bread', price: 120, category: 'Starters', available: true },
  { name: 'Paneer Tikka', price: 220, category: 'Starters', available: true },
  { name: 'Chicken Tikka', price: 380, category: 'Starters', available: true },
  { name: 'Hara Bhara Kabab', price: 280, category: 'Starters', available: true },

  { name: 'Butter Chicken', price: 350, category: 'Main Course', available: true },
  { name: 'Paneer Butter Masala', price: 280, category: 'Main Course', available: true },
  { name: 'Grilled Fish', price: 420, category: 'Main Course', available: true },
  { name: 'Veg Biryani', price: 250, category: 'Main Course', available: true },
  { name: 'Dal Makhani', price: 220, category: 'Main Course', available: true },
  { name: 'Chicken Biryani', price: 320, category: 'Main Course', available: true },
  { name: 'Shahi Paneer', price: 300, category: 'Main Course', available: true },
  { name: 'Kadai Paneer', price: 290, category: 'Main Course', available: true },
  { name: 'Chole Masala', price: 230, category: 'Main Course', available: true },
  { name: 'Chicken Curry', price: 340, category: 'Main Course', available: true },

  { name: 'Butter Roti', price: 40, category: 'Breads', available: true },
  { name: 'Plain Roti', price: 25, category: 'Breads', available: true },
  { name: 'Butter Naan', price: 60, category: 'Breads', available: true },
  { name: 'Garlic Naan', price: 80, category: 'Breads', available: true },
  { name: 'Lachha Paratha', price: 70, category: 'Breads', available: true },

  { name: 'Jeera Rice', price: 180, category: 'Rice', available: true },
  { name: 'Steam Rice', price: 140, category: 'Rice', available: true },
  { name: 'Veg Pulao', price: 220, category: 'Rice', available: true },

  { name: 'Fresh Lime Soda', price: 80, category: 'Beverages', available: true },
  { name: 'Mango Lassi', price: 120, category: 'Beverages', available: true },
  { name: 'Masala Chai', price: 60, category: 'Beverages', available: true },
  { name: 'Cold Coffee', price: 140, category: 'Beverages', available: true },

  { name: 'Gulab Jamun', price: 150, category: 'Desserts', available: true },
  { name: 'Ice Cream', price: 130, category: 'Desserts', available: true },
  { name: 'Rasmalai', price: 160, category: 'Desserts', available: true },
];

const seed = async () => {
  try {
    await sequelize.sync();

    // Seed Admin
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
      await User.create({
        name: 'Main Admin',
        email: 'admin@restaurant.com',
        password: 'admin123',
        role: 'admin',
        active: true
      });
      console.log('✅ Initial Admin created: admin@restaurant.com / admin123');
    } else {
      console.log('ℹ️ Admin already exists.');
    }

    // Seed Menu Items
    const menuCount = await MenuItem.count();
    if (menuCount === 0) {
      await MenuItem.bulkCreate(menuItemsData);
      console.log(`✅ ${menuItemsData.length} menu items seeded.`);
    } else {
      console.log(`ℹ️ Menu already has ${menuCount} items. Skipping seed.`);
    }

    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();