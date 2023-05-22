const router = require('express').Router();
const {Member, Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', async (req,res)=>{
//     try{
//         const blogData = await Blog.findAll({
//             include: [{model:Member, attributes: ['username']}],
//         });
//         res.status(200).json(blogData);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

router.post('/', withAuth, async (req,res)=>{
   try{
    const newBlog = await Blog.create({
        ...req.body,
        member_id: req.session.member_id,
    });
    res.status(200).json(newBlog);
} catch(err){
    res.status(400).json(err);
}
});

router.put('/:id', withAuth, async (req,res)=>{
    try{
        const updateBlog = await Blog.update(req.body, {
            where: { id: req.params.id },
        });

        if(!updateBlog){
            res.status(404).json({message: `no blog found with that ID.`});
        }
        res.status(200).json(updateBlog);
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req,res)=>{
    try{
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                member_id: req.session.member_id
            }
        })
        if(!blogData){
            res.status(404).json({message: `No blog found with that ID.`});
        }
        res.status(200).json(blogData);
    }  catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;

