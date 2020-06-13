import { IStation } from '../interface';
import { StationClass } from '../enum/StationClass';
import { Coordinates } from '../entity/Coordinates';

export const stations: IStation[] = [{
  name: 'Omskaiy Station',
  UNM: 666666,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 54.939616, lng: 73.385906 }),
},
{
  name: 'Kormilovka',
  UNM: 123456,
  // eslint-disable-next-line max-len
  description: '30 августа 1896 открыта станция (Кормиловка) на Транссибирской железнодорожной магистрали. Эта дата и является датой основания посёлка. Постройка Сибирской железной дороги должна была вызвать внимание и интерес к переселенческому делу. Объединённые крестьяне с Малороссии и центрально-чернозёмных губерний — Курской, Тамбовской, Орловской, Черниговской, Тульской, Рязанской бежали от непосильных налогов и селились на свободных сибирских землях. Так появились первые посёлки Аксаковский (1894), Новороссийка (1895), Никитино (1895), Ивановка (1888), ст. Кормиловка (1896) и прочие. Несмотря на близость Омска, станция Кормиловка служила местом отправлений грузов в Ревель (нынешний Таллин), Либаву, Европейскую территорию до 12 тонн пшеницы. Гражданская война требовала внутри Сибири особенного административного аппарата, который бы смог справиться с экономическими задачами, возникшими в Сибири. Поэтому в конце 1922 года в Омской губернии начались подготовительные работы по низовому районированию, направленные на укрепление волостей и длилось оно до 1 апреля 1924. С 25 мая 1925 года в составе Корниловского района.',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 54.997959, lng: 74.095973 }),
},
{
  name: 'Novosibirskaya Station',
  UNM: 777777,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 55.035588, lng: 82.895181 }),
}, {
  name: 'Tomskaiy Station',
  UNM: 555555,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 56.460470, lng: 84.991118 }),
}];
