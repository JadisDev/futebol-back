export default async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    // res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.send(200);
  } else {
    next();
  }
};
