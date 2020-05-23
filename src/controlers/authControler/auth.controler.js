const User = require('../../models/Users');
const paramsSchema = require('../../utils/validation');
const joi = require('joi');



class AuthControler {
  signup = async (req, res) => {
    const { name, password, email, telephone } = paramsSchema;
    
    const signupSchema = joi.object()
      .options({ abortEarly: false })
      .keys({
        name, password, email, telephone,
      },
    );

    const validation = joi.validate(req.body, signupSchema);

    if (validation.error) {
      const errors = validation.error.details.map(error => ({
        error: error.message.split('" ')[1],
        field: error.context.key,
      }));

      res.status(400).json(errors);
      return;
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(400).json({ message: 'Usuário já cadastrado' });
      return;
    }

    await User.create(req.body);

    res.status(200).json({ message: 'Usuário cadastrado com sucessso' });
  };

  login = (req, res) => {
    res.status(200).json(req.body);
  };
}

module.exports = new AuthControler();
