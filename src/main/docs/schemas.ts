import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyResultParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveyResultSchema,
  surveySchema,
  surveysSchema
} from './schemas/'

export default {
  account: accountSchema,
  addSurveyParams: addSurveyParamsSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema,
  survey: surveySchema,
  surveys: surveysSchema
}
