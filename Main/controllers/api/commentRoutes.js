const router = require('express').Router();
const {Member, Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res)=>{
    try{
        const newComment = await Comment.create({
            ...req.body,
            member_id: req.session.member_id,
        });
        res.status(200).json(newComment);
    } catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req,res)=>{
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                member_id: req.params.member_id
            }
        })
        if(!commentData){
            res.status(404).json({message: `No comment found with that ID.`});
        }
        res.status(200).json(commentData);
    }  catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;