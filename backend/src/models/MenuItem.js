const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // ✅ Destructure the instance

/**
 * MenuItem Model
 * Represents the food and drinks available in the restaurant.
 */
const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Generates a unique ID automatically
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Handles currency better than Float
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Starters', 'Main Course', 'Beverages', 'Desserts', 'Breads', 'Rice'),
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = MenuItem;