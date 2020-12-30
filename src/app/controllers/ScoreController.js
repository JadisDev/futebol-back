import ScoreService from '../services/ScoreService'

class ScoreController {

  async scoreGols(req, res) {
    return await ScoreService.scoreGols(req, res);
  }

  async scoreVictories(req, res) {
    return await ScoreService.scoreVictories(req, res);
  }

  async scoreFrequencies(req, res) {
    return await ScoreService.scoreFrequency(req, res);
  }

}

export default new ScoreController();
