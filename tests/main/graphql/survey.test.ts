import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { Express } from 'express'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection
let surveyCollection: Collection
let app: Express

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Raphael',
    email: 'raphael.gibson@email.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('Survey GraphQL', () => {
  beforeAll(async (): Promise<void> => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async (): Promise<void> => {
    await MongoHelper.disconnect()
  })

  beforeEach(async (): Promise<void> => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})

    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('Surveys Query', () => {
    const query = `
      query {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `

    test('Should return Surveys', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: now
      })
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.surveys.length).toBe(1)
      expect(res.body.data.surveys[0].id).toBeTruthy()
      expect(res.body.data.surveys[0].question).toBe('Question')
      expect(res.body.data.surveys[0].date).toBe(now.toISOString())
      expect(res.body.data.surveys[0].didAnswer).toBe(false)
      expect(res.body.data.surveys[0].answers).toEqual([{
        answer: 'Answer 1',
        image: 'http://image-name.com'
      }, {
        answer: 'Answer 2',
        image: null
      }])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })
})
