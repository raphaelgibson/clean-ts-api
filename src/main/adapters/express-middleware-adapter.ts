import { Middleware } from '@/presentation/protocols'

import { RequestHandler, NextFunction } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const adaptMiddleware: Adapter = middleware => async (req, res, next: NextFunction) => {
  const request = {
    accessToken: req.headers?.['x-access-token'],
    ...(req.headers || {})
  }

  const httpResponse = await middleware.handle(request)

  if (httpResponse.statusCode === 200) {
    Object.assign(req, httpResponse.body)
    next()
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
