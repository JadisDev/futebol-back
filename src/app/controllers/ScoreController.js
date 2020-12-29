import ScoreService from '../services/ScoreService'

class ScoreController {

  async scoreGol(req, res) {
    return await ScoreService.scoreGol(req, res);
  }

}

export default new ScoreController();
