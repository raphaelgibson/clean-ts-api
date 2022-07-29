import { LoadSurveys, LoadSurveysRepository, SurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly addSurveyRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.addSurveyRepository.loadAll(accountId)

    return surveys
  }
}
