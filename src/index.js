import './index.pug'
import './index.scss'

require('dotenv').config()

var isSended = 0;

submit.onclick = function() {

  if (isSended == 1) {
    alert('Ваш заказ уже был отправлен')
    console.log(0);
    return 0;
  }

  var customerName = document.getElementById('name').value;
  var customerPhone = document.getElementById('phone').value;
  var customerAddress = document.getElementById('address').value;
  var customerTime = document.getElementById('time').value;
  var customerOrder = document.getElementById('order').value;

  if ((customerName.length && customerPhone.length && customerAddress.length && customerTime.length) > 3) {
    Email.send({
      SecureToken: '53e51e2d-8f1e-493f-9b91-d61fc1cf4827',
      To : 'stasy.makeup@yandex.ru',
      // To : 'irvins.cassull@gmail.com',
      From : "irvins.cassull@gmail.com",
      Subject : "Новый заказ: " + customerOrder,
      Body :  "Поступил новый заказ на имя " + customerName + 
              ". Номер телефона: " + customerPhone + 
              ". Адрес заазчика: " + customerAddress + 
              ". Дата и время: " + customerTime
    }).then(
      message => alert(message)
    );
  
    isSended = 1;
  } else {
    alert('Заполните все поля');
  }
}
