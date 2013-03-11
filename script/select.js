/**
 * Created with JetBrains WebStorm.
 * User: 1
 * Date: 11.03.13
 * Time: 20:31
 * To change this template use File | Settings | File Templates.
 */

/* этот код помечает картинки, для удобства разработки */
var lis = document.getElementsByTagName('li');

for(var i=0; i<lis.length; i++) {
    var li = lis[i];
    li.id = "li"+i;
    lis[i].style.position='relative';
    var span = document.createElement('span');
    // обычно лучше использовать CSS-классы,
    // но этот код - для удобства разработки, так что не будем трогать стили
    span.style.cssText='position:absolute;left:0;top:0';
    span.innerHTML = i+1;
    lis[i].appendChild(span);
}

/* конфигурация */
var width = 130; // ширина изображения
var count = 3; // количество изображений

var ul = document.getElementById('images');
var imgs = ul.getElementsByTagName('li');

ul.addEventListener('click', function(event){
    var elem = null;
    if (event) {elem = event.target}
    var id= elem.parentNode.id;
    alert(id);
}, false);

var position = 0; // текущий сдвиг влево

document.getElementById('prev').addEventListener('click', function(event){
    if (position >= 0) return false; // уже до упора

    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    position = Math.min(position + width*count, 0)
    ul.style.marginLeft = position + 'px';
    return false;
},false);

document.getElementById('next').addEventListener('click', function(event){
    if (position <= -width*(imgs.length-count)) return false; // уже до упора

    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position-width*count, -width*(imgs.length-count));
    ul.style.marginLeft = position + 'px';
    return false;
},false);



