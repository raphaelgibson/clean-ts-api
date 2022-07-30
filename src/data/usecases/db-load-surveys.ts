import { LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { LoadSurveys } from '@/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly addSurveyRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.addSurveyRepository.loadAll(accountId)

    return surveys
  }
}
