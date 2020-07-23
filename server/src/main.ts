import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path'
import * as fs from 'fs-sync'
import * as cors from 'cors'
import { Logger } from '@nestjs/common';
import { NLProcessor } from './nlprocessor';
import * as express from 'express'

const logger = new Logger('main.ts')
let forwarded = false

async function bootstrap() {

  const logger: Logger = new Logger('bootstrap')

  NLProcessor.loadNLProcessors()
  const config = fs.readJSON(path.join(__dirname, '/../../.env.json'))

  if (config.httpPort > 0) {
    const app: any = await NestFactory.create(AppModule);
    useSwagger(app)
    app.useStaticAssets(path.join(path.resolve(''), './../static-assets'))
    app.useStaticAssets(path.join(path.resolve(''), './../static-assets-demo'))
    logger.log(`listening on port: ${config.httpPort}`)
    await app.listen(config.httpPort);
  }

  if (config.httpsPort > 0) {
    const appHTTPs: any = await NestFactory.create(AppModule, { httpsOptions: getHTTPSCredentials(config) })
    useSwagger(appHTTPs)
    appHTTPs.useStaticAssets(path.join(path.resolve(''), './static-assets'))
    appHTTPs.useStaticAssets(path.join(path.resolve(''), './static-assets-demo'))
    configureCORS(appHTTPs)
    await appHTTPs.listen(config.httpsPort);
  }

  ensureRedirectingFromUnsafeHostToSaveHost()
}

function getHTTPSCredentials(config){
  const certificate = fs.read(config.pathToCert)
  const privateKey = fs.read(config.pathToKey)
  return { key: privateKey, cert: certificate }
}

function configureCORS(appHTTPs) {
  const whitelist = [
    '*', // I protect my APIs via Keys
    'http://localhost:3000',
    'http://localhost:4200',
    'https://ai-chat.com',
  ]
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true)
      } else if (whitelist.indexOf('*') !== -1) {
        callback(null, true)
      } else {
        // callback(null, true)
        callback(new Error('Not allowed by CORS'))
      }
    },
  }
  appHTTPs.use(cors(corsOptions))
}

function useSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('AI Chat')
    .setDescription('The AI Chat backend description')
    .setVersion('1.0')
    .addTag('ai chat')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

function ensureRedirectingFromUnsafeHostToSaveHost() {
  const httpForwarderAPPListeningOnUnsafePort = express()

  httpForwarderAPPListeningOnUnsafePort.get('*', (req, res) => {
    if (!forwarded) {
      forwarded = true
      setTimeout(() => {
        forwarded = false
      }, 400)
      res.redirect('https://fancy-chats.com:3443')
    } else {
      logger.log('relaxing')
    }
  })
}

export function getRedirectHTML(target: string): string {
  return `<!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url='${target}'" />
        </head>
        <body>
          <p>Redirecting to https: <a href="${target}">${target}/</a></p>
        </body>
      </html>`
}

bootstrap();
