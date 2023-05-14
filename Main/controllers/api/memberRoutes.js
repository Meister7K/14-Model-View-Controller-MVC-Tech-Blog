const router = require('express').Router();
const {Member} = require('../../models');

//! check this later
// router.get('/', async (req, res) =>{
//     try{
//         const memberData = await Member.findAll({
//             attributes: {exclude: ['password']},
//         });
//         const member = memberData.map((member) => member.get({plain: true}));
//     res.render('homepage', {
//         blogs,
//         logged_in: req.session.logged_in
//     });
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

router.post('/', async (req,res) =>{
    try{
        const newMember = await Member.create(req.body);

        req.session.save(()=>{
            req.session.member_id = newMember.id;
            req.session.logged_in = true;

            res.status(200).json(newMember);
        })
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/login', async (req,res) =>{
    try{
        const memberData = await Member.findOne({ where: {email: req.body.email}});

        if(!memberData){
            res.status(400).json({message: `you don't type gud huh?`});
            return;
        }
        const validPass = await memberData.checkPassword(req.body.password);

        if(!validPass){
            res.status(400).json({message: `you don't type gud huh?`});
            return;
        }

        req.session.save(()=> {
            req.session.member_id = memberData.id;
            req.session.logged_in = true;

            res.status(200).json({member: memberData, message: `login successful!`});
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/logout', (req,res)=>{
    if(req.session.logged_in){
        req.session.destroy(()=>{
            res.status(204).end();
        });
    } else{
        res.status(404).end();
    }
});

module.exports = router;