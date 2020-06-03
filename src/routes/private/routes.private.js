const { Router } = require('express');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const UserControler = require('../../controlers/userControler/user.controler');

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
    res.status(401).json({ message: 'jwt expired' });
  }
};

router.use(protectedRouteMiddleware);

router.get('/user', UserControler.listOne);

router.put('/user', UserControler.editOne);

router.get('/refresh-token', (req, res) => {
  const { name, email, id } = req.user;

  const token = jwt.sign(
    { name, email, id },
    'nossa-hash-que-protege-o-token',
    { expiresIn: '30m' },
  );

  const refresh_token = jwt.sign(
    { name, email, id, token },
    'nossa-hash-que-protege-o-token',
    { expiresIn: '1h' },
  );

  res.status(200).json({
    type: 'Bearer',
    token,
    refresh_token,
  });
});

router.get('/verify-token', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

module.exports = router;
