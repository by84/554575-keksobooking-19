'use strict';
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_TIMES = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var T_LENGHT = 8;

// функция для рандома
var selfRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция для округления до десятых
var myRound10 = function (val) {
  return Math.round(val / 10) * 10;
};

// функция создания случайного массива
var randLengthArr = function (valArr) {
  var randArr = [];
  for (var i = 0; i < selfRandom(0, valArr.length - 1); i++) {
    randArr[i] = valArr[selfRandom(0, valArr.length - 1)];
  }
  return randArr;
};

// получаем размеры
var areaSize = function (className) {
  var mapArea = document.querySelector('.' + className);
  var sizesArr = [];
  sizesArr[0] = mapArea.offsetWidth;
  sizesArr[1] = mapArea.offsetHeight;

  return sizesArr;
};

var advertArr = function (types, times, features, photos) {
  var adverts = [];
  for (var i = 0; i < T_LENGHT; i++) {
    adverts[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'строка, заголовок предложения',
        'address': myRound10(selfRandom(100, 600)) + ', ' + myRound10(selfRandom(100, 600)), // запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        'price': myRound10(selfRandom(2000, 25000)) + ' руб.',
        'type': types[selfRandom(0, 3)],
        'rooms': selfRandom(1, 5),
        'guests': selfRandom(1, 5),
        'checkin': times[selfRandom(0, 2)],
        'checkout': times[selfRandom(0, 2)],
        'features': randLengthArr(features),
        'photos': randLengthArr(photos)
      },

      'location': {
        'x': selfRandom(0, areaSize('map__pins')[0]), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        'y': selfRandom(130, 630) // случайное число, координата y метки на карте от 130 до 630.
      }
    }
  }
  return adverts;
};

var workArr = advertArr(AD_TYPES, AD_TIMES, AD_FEATURES, AD_PHOTOS);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var advertArrTempIn = userDialog.querySelector('.map__pins');
var advertArrTemp = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (workArr) {
  var pinElement = advertArrTemp.cloneNode(true);

  console.log(pinElement);
    pinElement.querySelector('img').src = workArr.author.avatar;
    pinElement.querySelector('img').alt = workArr.offer.title;
    pinElement.setAttribute('style', 'left:' + (workArr.location.x - 20) +  'px; top: ' + (workArr.location.y - 40) + 'px;');

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < workArr.length; i++) {
  fragment.appendChild(renderPin(workArr[i]));
}
advertArrTempIn.appendChild(fragment);


