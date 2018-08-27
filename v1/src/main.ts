import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from 'modules/shared/filters/http-exception.filter';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (AppModule.swaggerEnabled) createSwagger(app);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.setGlobalPrefix(AppModule.prefix);
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(AppModule.port);
}

function createSwagger(app: INestApplication) {
    // Definições do Swagger
    const swaggerTitle = 'Template Server API';
    const swaggerDescription = 'API Documentation';
    const swaggerRote = '/docs';
    const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;
    const version = require('../package.json').version || '';

    const swaggerOption = new DocumentBuilder()
        .setTitle(swaggerTitle)
        .setDescription(swaggerDescription)
        .setVersion(version)
        .setHost(hostDomain.split('//')[1])
        .setSchemes(AppModule.isDev ? 'http' : 'https')
        .setBasePath(AppModule.prefix)
        .addBearerAuth('Authorization', 'header')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOption);

    app.use(AppModule.prefix + swaggerRote + '/swagger.json', (req: Request, res: Response) => {
        res.send(swaggerDoc);
    });

    SwaggerModule.setup(AppModule.prefix + swaggerRote, app, null, {
        swaggerUrl: `${hostDomain}${AppModule.prefix}${swaggerRote}/swagger.json`,
        explorer: true,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });
}

bootstrap().catch(err => console.error(err));