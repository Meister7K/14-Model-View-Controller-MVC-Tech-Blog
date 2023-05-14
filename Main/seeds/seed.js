const sequelize = require('../config/connection');
const { Member, Blog, Comment } = require('../models');

const memberData = require('./memberData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const members = await Member.bulkCreate(memberData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  for (const comment of commentData){
    await Comment.create({
      ...comment,
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
