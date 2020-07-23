import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DataBaseConfiguration } from 'config/database.configuration';
import { Admin } from 'entities/Admin';
import { AdminService } from './services/admin/admin.service';
import { KategorijaService } from './services/kategorija/kategorija.service';
import { AdminController } from './controllers/api/admin.controller';
import { Kategorija } from 'entities/Kategorija';
import { kategorijaKontroler } from './controllers/api/kategorija.controller';
import { Artikl } from 'entities/Artikl';
import { Automobil } from 'entities/Automobil';
import { Korpa } from 'entities/Korpa';
import { Korisnik } from 'entities/Korisnik';
import { KorpaStavka } from 'entities/KorpaStavka';
import { Narudzbenica } from 'entities/Narudzbenica';
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
  controllers: [AdminController,kategorijaKontroler,ArtiklController,KorisnikController,AutomobilController,KorpaController,NarudzbenicaController,KorpaStavkaController],
  providers: [AdminService,KategorijaService,ArtiklService,KorisnikService,AutomobilService,KorpaService,NarudzbenicaService,KorpaStavkaService],
})
export class AppModule {}
