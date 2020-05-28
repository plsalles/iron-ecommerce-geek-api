const { Router } = require('express');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');

const router = Router();

const protectedRouteMiddleware = (req, res, next) => {
  const token = req.get('Authorization') || req.get('authorization');

  if (!token) {
    res.status(401).json({ message: 'Token not found' });

    return;
  }

  try {
    const user = jwt.verify(token.split(' ')[1], 'nossa-hash-que-protege-o-token');
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

router.use(protectedRouteMiddleware);

router.put('/user', async (req, res) => {
  const userFromDb = await User.findById(req.user.id);

  res.status(200).json({ user: userFromDb });
});

module.exports = router;
