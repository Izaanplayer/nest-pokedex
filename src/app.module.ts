import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [

    //Importar variables de entorno del .env o del joi validation schema
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    //Crear una ruta estática para poder mostrar html con nest
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    /* Se realiza la conexión a nuestra base de datos */
    MongooseModule.forRoot(process.env.MONGODB),

    //Modules
    PokemonModule,
    CommonModule,
    SeedModule
  ]
})
export class AppModule { }
