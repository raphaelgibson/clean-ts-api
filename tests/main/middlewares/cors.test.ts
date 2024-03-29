import { setupApp } from '@/main/config/app'

import { Express } from 'express'
import request from 'supertest'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(async (): Promise<void> => {
    app = await setupApp()
  })

  test('Should enable CORS', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
