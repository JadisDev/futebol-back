import ApiService from '../services/ApiService'
import SessionService from '../services/SessionService';

class SessionController {

  async api (req, res) {
    return await ApiService.api(res);
  }

  // responsável por fazer o login do usuário
  async store(req, res) {
      return await SessionService.store(req.body, res);
  }

  async validateToken(req, res) {
    const token = req.body.token || '';
    jwt.verify(token, authConfig.secret, err => {
      return res.status(200).send({ valid: !err });
    });
  }
}

export default new SessionController();
