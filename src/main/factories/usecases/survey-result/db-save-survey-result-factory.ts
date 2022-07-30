import { DbSaveSurveyResult } from '@/data/usecases'
import { SaveSurveyResult } from '@/domain/usecases'
import { SurveyResultMongoRepository } from '@/infra/db'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()

  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
