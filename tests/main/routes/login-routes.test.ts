import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { hash } from 'bcrypt'
import { Express } from 'express'
import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
  beforeAll(async (): Promise<void> => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async (): Promise<void> => {
    await MongoHelper.disconnect()
  })

  beforeEach(async (): Promise<void> => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Raphael',
          email: 'raphael.gibson@email.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Raphael',
        email: 'raphael.gibson@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'raphael.gibson@email.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'raphael.gibson@email.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
