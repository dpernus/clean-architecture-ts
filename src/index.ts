import dotenv from 'dotenv'
import { runServer } from './infraestructure/server'
import { connect } from './infraestructure/repositories/mongo'
import { makeError } from './utils/errors'

interface AppConfig {
  port: number
  mongodbUri: string
}

function loadAppConfig(): AppConfig {
  dotenv.config()
  const port = parseInt(process.env.PORT ?? 'no port provided')
  if (port === NaN) throw makeError('CONFIG_PORT', 'Invalid port provided on environment')

  const mongodbUri = process.env.MONGO_URI
  if (mongodbUri === undefined) throw makeError('CONFIG_DBURI', 'No db connection string provided on environment')

  return {
    port,
    mongodbUri,
  }
}

async function runApp(config: AppConfig) {
  await connect(config.mongodbUri)
  runServer(config.port)
}

runApp(loadAppConfig())
  .then(() => console.log('App started.'))
  .catch(console.error)
