import UserService from '../services/UserService'
class UserController {
  async store(req, res) {
    return await UserService.store(req, res);
  }

  async storeNormal(req, res) {
    return await UserService.storeNormal(req, res);
  }
}

export default new UserController();
