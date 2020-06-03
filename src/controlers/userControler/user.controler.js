const User = require('../../models/Users');
const { passwordManager } = require('../../utils');

class UserControler {
  listAll = async (req, res) => {
    
  };

  listOne = async (req, res) => {
    const userFromDb = await User.findById(req.user.id);

    res.status(200).json({ user: userFromDb });
  };

  store = async (req, res) => {

  };

  editOne = async (req, res) => {
    const { name, email, telephone, currentPassword, newPassword, confirmationNewPassword } = req.body;

    const isUserEmailExists = await User.findOne({ email });

    if (isUserEmailExists && isUserEmailExists._id.toString() !== req.user.id) {
      res.status(403).json({ message: 'Email de usuário já cadastrado' });

      return;
    }

    const user = await User.findById(req.user.id);

    if (currentPassword && newPassword && confirmationNewPassword) {
      const { password } = user;
      if (!passwordManager.verify(currentPassword, password)){
        res.status(400).json({ message: 'Senha informada está incorreta' });

        return;
      }
      if (newPassword !== confirmationNewPassword) {
        res.status(400).json({ message: 'Nova senha e a confirmação da nova senha precisam ser iguais' });

        return;
      }

      try {
        await User.findByIdAndUpdate(req.user.id, { password: passwordManager.encrypt(newPassword) }, { useFindAndModify: true });
      } catch (error) {
        res.status(500).json({ message: 'Ocorreu algum problema no servidor de banco de dados' });

        return;
      }
    }

    const newObj = { name, email, telephone };

    for (const prop in newObj) {
      if (!newObj[prop]) delete newObj[prop];
    }

    try {
      await User.findByIdAndUpdate(req.user.id, newObj, { useFindAndModify: true });
      
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu algum problema no servidor de banco de dados' });
    }
  };

  deleteOne = async (req, res) => {

  };
}

module.exports = new UserControler();
