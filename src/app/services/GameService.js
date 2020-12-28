import GameValidator from '../validations/GameValidator';
import Game from '../models/Game';
import { ValidationException } from '../exception/ValidationException';

class GameService {

  async store(req, res) {
    try {
      req.body['groupUser'] = req.groupUser;
      console.log(req.body);
      await GameValidator.validator(req.body);
      await Game.create(req.body);
      return res.json(req.body);
    } catch (err) {
      if (err instanceof ValidationException) {
        return res.status(400).json({ validation: JSON.parse(err.message) });
      }
      return res.status(400).json({ error: err.message });
    }
  }

}

export default new GameService();
