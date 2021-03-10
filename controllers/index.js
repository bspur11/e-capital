const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('C:/Users/user/desktop/e-capital/controllers/home.routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong ROute!</h1>")
});

module.exports = router;