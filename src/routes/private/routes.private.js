const { Router } = require('express');

const router = Router();

router.put('/user', (req, res) => {
  res.status(200).json({ message: 'Rota de user funcionando' });
});

module.exports = router;
