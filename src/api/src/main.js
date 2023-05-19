import Koa from 'koa'
import mount from 'koa-mount'
import { createHandler } from 'graphql-http/lib/use/koa'
import { schema } from './graphql/schema.js'

export function main() {
  const app = new Koa()
  const port = process.env.APP_HTTP_PORT || '80'

  app.use(mount('/graphql', createHandler({ schema })))

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
