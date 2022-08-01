import { setupApp } from '@/main/config/app'
import { noCache } from '@/main/middlewares'

import { Express } from 'express'
import request from 'supertest'

let app: Express

describe('NoCache Middleware', () => {
  beforeAll(async (): Promise<void> => {
    app = await setupApp()
  })

  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (request, response) => {
      response.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
