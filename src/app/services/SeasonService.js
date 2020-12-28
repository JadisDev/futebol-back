import Season from '../models/Season';

class SeasonService {
  async store(data) {
    try {
      return await Season.create(data);
    } catch (err) {
      throw err;
    }
  }

}

export default new SeasonService();
