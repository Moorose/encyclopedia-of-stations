import { IStation } from '../interface';
import { StationClass } from '../enum/StationClass';
import { Coordinates } from '../entity/Coordinates';
import { WorkPlace } from '../entity/WorkPlace';

const workingPlace = new WorkPlace({
  AO: 'AO',
  ASOUPMessage: 'ASOUPMessage',
  ATDForms: 'ATDForms',
  IPAddress: 'IPAddress',
  description: 'description',
  name: 'name',
  password: 'password',
  position: 'position',
  telephone: '321654987',
});
const workingPlace2 = new WorkPlace({
  AO: 'AO2',
  ASOUPMessage: 'ASOUPMessage2',
  ATDForms: 'ATDForms2',
  IPAddress: 'IPAddress2',
  description: 'description2',
  name: 'name2',
  password: 'password2',
  position: 'position2',
  telephone: '3216549872',
});
const workingPlace3 = new WorkPlace({
  AO: 'AO3',
  ASOUPMessage: 'ASOUPMessage3',
  ATDForms: 'ATDForms3',
  IPAddress: 'IPAddress3',
  description: 'description3',
  name: 'name3',
  password: 'password3',
  position: 'position3',
  telephone: '3216549873',
});

export const stations: IStation[] = [{
  name: 'Omskaiy Station',
  UNM: 666666,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [workingPlace, workingPlace2, workingPlace3],
  coordinates: new Coordinates({ lat: 54.939616, lng: 73.385906 }),
},
{
  name: 'Kormilovka',
  UNM: 123456,
  // eslint-disable-next-line max-len
  description: '30 августа 1896 открыта станция (Кормиловка) на Транссибирской железнодорожной магистрали. Эта дата и является датой основания посёлка. Постройка Сибирской железной дороги должна была вызвать внимание и интерес к переселенческому делу. Объединённые крестьяне с Малороссии и центрально-чернозёмных губерний — Курской, Тамбовской, Орловской, Черниговской, Тульской, Рязанской бежали от непосильных налогов и селились на свободных сибирских землях. Так появились первые посёлки Аксаковский (1894), Новороссийка (1895), Никитино (1895), Ивановка (1888), ст. Кормиловка (1896) и прочие. Несмотря на близость Омска, станция Кормиловка служила местом отправлений грузов в Ревель (нынешний Таллин), Либаву, Европейскую территорию до 12 тонн пшеницы. Гражданская война требовала внутри Сибири особенного административного аппарата, который бы смог справиться с экономическими задачами, возникшими в Сибири. Поэтому в конце 1922 года в Омской губернии начались подготовительные работы по низовому районированию, направленные на укрепление волостей и длилось оно до 1 апреля 1924. С 25 мая 1925 года в составе Корниловского района.',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [workingPlace, workingPlace2],
  coordinates: new Coordinates({ lat: 54.997959, lng: 74.095973 }),
},
{
  name: 'Novosibirskaya Station',
  UNM: 777777,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [workingPlace3, workingPlace2],
  coordinates: new Coordinates({ lat: 55.035588, lng: 82.895181 }),
}, {
  name: 'Tomskaiy Station',
  UNM: 555555,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [workingPlace, workingPlace2, workingPlace3],
  coordinates: new Coordinates({ lat: 56.460470, lng: 84.991118 }),
}];
