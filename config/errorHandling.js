export default function initErrorHandling(app) {
  app.all('*', (req, res) => {
    res.status(404)
      .json({
        status: 'fail',
        message: `Can't find ${req.url} on this server`,
      });
  });

  // eslint disabled-next-line
  app.use((err, req, res, next) => {
    const errorData = {
      status: 'error',
      messages: err?.messages || err?.inner || [],
      fields: err?.errors || {},
    };
    res.status(err.statusCode || 401).json(errorData);
  });
}
