const { Order, MenuItem, OrderItem, sequelize } = require('../models');

class OrderService {
  async createOrder(orderData, user) {
    const { tableNumber, items, paymentMethod } = orderData;

    // Start a Transaction (if one part fails, nothing is saved to DB)
    const t = await sequelize.transaction();

    try {
      let subtotal = 0;
      const processedItems = [];

      // 1. Calculate totals using DB prices
      for (const item of items) {
        const menuItem = await MenuItem.findByPk(item.menuItemId);
        if (!menuItem) throw new Error(`Item ${item.menuItemId} not found`);

        subtotal += Number(menuItem.price) * item.quantity;
        processedItems.push({
          MenuItemId: menuItem.id,
          quantity: item.quantity
        });
      }

      // 2. Tax Logic
      const cgst = subtotal * 0.025; // 2.5%
      const sgst = subtotal * 0.025; // 2.5%
      const total = subtotal + cgst + sgst;

      // 3. Create the Order record
      const order = await Order.create({
        id: `ORD-${Date.now().toString().slice(-6)}`, // Simple unique ID logic
        tableNumber,
        subtotal,
        cgst,
        sgst,
        total,
        paymentMethod,
        staffName: user.name,
        userId: user.id
      }, { transaction: t });

      // 4. Link items to the order in the Join Table (OrderItem)
      for (const pItem of processedItems) {
        await order.addMenuItem(pItem.MenuItemId, {
          through: { quantity: pItem.quantity },
          transaction: t
        });
      }

      await t.commit();
      return await Order.findByPk(order.id, {
        include: [{ model: MenuItem }]
      });
    } catch (error) {
      await t.transaction.rollback();
      throw error;
    }
  }

  async getAllOrders() {
    return await Order.findAll({ include: [MenuItem], order: [['createdAt', 'DESC']] });
  }

  async getOrdersByUser(userId) {
    return await Order.findAll({
      where: { userId },
      include: [MenuItem],
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = new OrderService();