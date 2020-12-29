import ScoreAggregate from '../helpers/ScoreAggregate';
import Game from '../models/Game';

class ScoreService {

  async scoreGols(req, res) {
    try {
      const aggregate = await ScoreAggregate.conf("$gol", req.group);
      const data = await Game.aggregate(
        aggregate
      ).sort({ total: -1 });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async scoreVictories(req, res) {
    try {
      const aggregate = await ScoreAggregate.conf("$victory", req.group);
      const data = await Game.aggregate(
        aggregate
      ).sort({ total: -1 });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export default new ScoreService();
