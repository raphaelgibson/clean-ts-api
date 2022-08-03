import { LogMongoRepository, MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let errorCollection: Collection

  beforeAll(async (): Promise<void> => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async (): Promise<void> => {
    await MongoHelper.disconnect()
  })

  beforeEach(async (): Promise<void> => {
    errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
