const router = require('express').Router();
// necessary modules and models 14.1.6
const sequelize = require('../config/connection');
const {
  Post,
  User,
  Comment
} = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      console.log(dbPostData[0]);
      res.render('homepage', dbPostData[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

// Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use 14.1.4