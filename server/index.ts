import { app } from './app';
import logger from './lib/logger';

app()
  .then((a) =>
    a.listen(process.env.PORT || 8080, () => {
      logger.info(`Server is running on http://localhost:${process.env.PORT}`);
    })
  )
  .catch((err) => logger.error(err));