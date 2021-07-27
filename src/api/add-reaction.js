import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

export default async function handler(req, res) {
  res.send('hello world')
}
