const router = require('express').Router();
const {Member, Comment, Blog} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) =>{
    try{
        const blogData = await Blog.findAll({
            include: [
                {
                    model: Member,
                    attributes: ['username'],
                },
            ],
        });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in
    });
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try{
        blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Member,
                    attributes: ['username'],
                },{
                    model: Comment,
                    include: [{ model: Member, attributes: ['username']}],
                },
            ],
        });
        const blog = blogData.get({plain: true});
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try{
        const memberData = await Member.findByPk(req.session.member_id,{
            attributes: {
                exclude:['password']
            },
            include: [{model:Blog},
            {model: Comment, 
            include:[{model:Blog, attributes: ['title']}],
        }],
        });

        const member = memberData.get({plain:true});

        res.render('profile', {
            ...member,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req,res) =>{
    if(req.session.logged_in){
        res.redirect('/profile');
        return;
    }
    
    res.render('login');
});

router.get('/newBlog', (req, res) =>{
    if(req.session.logged_in){
        res.render('newBlog');
        return;
    }
    res.redirect('login');
});



module.exports = router;