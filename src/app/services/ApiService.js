class ApiService {
  async api(res) {
    try {
      return res.json({api: 'run'});
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default new ApiService();
