import rateLimit from 'express-rate-limit';
import { logger } from '@/Utils/logger';

const limiterMiddleware = rateLimit({
  handler: (req, res, next, options) => {
    logger.error(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    res.status(options.statusCode).send(options.message);
  },

  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,

  // 1 minute
  max: 5,

  // Limit each IP to 5 login requests per `window` per minute
  message: { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },

  standardHeaders: true,
  windowMs: 60 * 1000, // Disable the `X-RateLimit-*` headers
});

export default limiterMiddleware;
