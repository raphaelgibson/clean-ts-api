import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyResultParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveyResultAnswerSchema,
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
  surveyResultAnswer: surveyResultAnswerSchema,
  surveyResult: surveyResultSchema,
  survey: surveySchema,
  surveys: surveysSchema
}
