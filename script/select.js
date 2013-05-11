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
    var star1 = "url(img/1stars.png) no-repeat";
    var star2 = "url(img/2stars.png) no-repeat";
    var star3 = "url(img/3stars.png) no-repeat";
    li.id = "li"+i;
    lis[i].style.position='relative';
    var span = document.createElement('span');
    // обычно лучше использовать CSS-классы,
    // но этот код - для удобства разработки, так что не будем трогать стили
    //span.style.cssText='position:absolute;left:10;top:0';
    span.innerHTML = "Уровень "+(i+1)+": "+arrLevel_name[i];
    lis[i].appendChild(span);
    var div = document.createElement('div');
    div.className = "difficult";
    if (i<3){
        div.style.background = star1;
    }
    else {
        if (i>2 && i<6){
            div.style.background = star2;
        }
        else{
            div.style.background = star3;}
    }


    lis[i].getElementsByTagName('div')[0].appendChild(div);
}

/* конфигурация */
var width = 400; // ширина изображения
var count = 3; // количество изображений

var ul = document.getElementById('images');
var imgs = ul.getElementsByTagName('li');

ul.addEventListener('click', function(event){
    var elem = null;
    if (event) {elem = event.target}
    if (elem)
        var id= elem.parentNode.parentNode.id;
    window.num_lev = parseInt(id.replace(/\D+/g,""))+1;
    localStorage.num_lev=window.num_lev;
    //console.log(num_lev);
    window.location.href = "index.html";
    //alert(id);
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



