import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import corsMiddleware from './app/middlewares/cors';
import GameController from './app/controllers/GameController';
import ScoreController from './app/controllers/ScoreController';
// import cors from 'cors';

const routes = new Router();

routes.use(corsMiddleware);

routes.get('/api', SessionController.api);

routes.post('/api/users', UserController.store);
routes.post('/api/users-normal', UserController.storeNormal);
routes.post('/api/sessions', SessionController.store);
routes.post('/api/validate-token', SessionController.validateToken);

// Todas as rotas após essa linha terá validações
routes.use(authMiddleware);
routes.post('/api/games', GameController.store);

//scores
routes.get('/api/score/gols', ScoreController.scoreGols);
routes.get('/api/score/victories', ScoreController.scoreVictories);
routes.get('/api/score/frequencies', ScoreController.scoreFrequencies);

export default routes;
