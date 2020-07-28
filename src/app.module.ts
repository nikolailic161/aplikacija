import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DataBaseConfiguration } from 'config/database.configuration';
import { Admin } from 'src/entities/Admin';
import { AdminService } from './services/admin/admin.service';
import { KategorijaService } from './services/kategorija/kategorija.service';
import { AdminController } from './controllers/api/admin.controller';
import { Kategorija } from 'src/entities/Kategorija';
import { kategorijaKontroler } from './controllers/api/kategorija.controller';
import { Artikl } from 'src/entities/Artikl';
import { Automobil } from 'src/entities/Automobil';
import { Korpa } from 'src/entities/Korpa';
import { Korisnik } from 'src/entities/Korisnik';
import { KorpaStavka } from 'src/entities/KorpaStavka';
import { Narudzbenica } from 'src/entities/Narudzbenica';
import { ArtiklService } from './services/artikl/artikl.service';
import { ArtiklController } from './controllers/api/artikl.controller';
import { KorisnikService } from './services/korisnik/korisnik.service';
import { KorisnikController } from './controllers/api/korisnik.controller';
import { AutomobilController } from './controllers/api/automobil.controller';
import { AutomobilService } from './services/automobil/automobil.service';
import { KorpaController } from './controllers/api/korpa.controller';
import { KorpaService } from './services/korpa/korpa.service';
import { NarudzbenicaController } from './controllers/api/narudzbenica.controller';
import { NarudzbenicaService } from './services/narudzbenica/narudzbenica.service';
import { KorpaStavkaController } from './controllers/api/korpaStavka.controller';
import { KorpaStavkaService } from './services/korpaStavka/korpaStavka.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middlewares';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DataBaseConfiguration.hostname,
      port: 3306,
      username: DataBaseConfiguration.username,
      password: DataBaseConfiguration.password,
      database: DataBaseConfiguration.database,
      entities: [Admin,Kategorija,Artikl,Automobil,Korpa,Korisnik,KorpaStavka,Narudzbenica]
    }),
    TypeOrmModule.forFeature([Admin,Kategorija,Artikl,Korisnik,Automobil,Korpa,Narudzbenica,KorpaStavka])
    
  ],
  controllers: [AdminController,kategorijaKontroler,ArtiklController,KorisnikController,AutomobilController,KorpaController,NarudzbenicaController,KorpaStavkaController,AuthController],
  providers: [AdminService,KategorijaService,ArtiklService,KorisnikService,AutomobilService,KorpaService,NarudzbenicaService,KorpaStavkaService],
  exports: [AdminService,KorisnikService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude('auth/*')
      .forRoutes('api/*');
  }
}
