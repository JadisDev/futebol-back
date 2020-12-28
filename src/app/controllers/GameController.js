import GameService from "../services/GameService";

class GameController {

  async store(req, res) {
    return GameService.store(req, res);
  }

}

export default new GameController();
