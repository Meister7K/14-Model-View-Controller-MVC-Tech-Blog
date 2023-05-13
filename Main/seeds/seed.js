const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const blogData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(Data, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Project.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();