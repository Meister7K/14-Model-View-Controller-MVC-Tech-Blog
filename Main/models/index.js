//relationships
const Member = require('./Member');
const Blog = require('./Blog');
const Comment = require('./Comment');

Member.hasMany(Blog, {
    foreignKey: 'member_id',
});

Member.HasMany(Comment, {
    foreignKey: 'member_id',
});

Blog.belongsTo(Member, {
    foreignKey: 'member_id',
});

Comment.belongsTo(Member, {
    foreignKey: 'member_id',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    ondDelete: 'CASCADE'
})



module.exports = {
    Member, 
    Blog, 
    Comment
};