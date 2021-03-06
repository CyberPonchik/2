/**
 * Created with JetBrains WebStorm.
 * User: Ann
 * Date: 11.02.13
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */
//num_lev=parseInt(localStorage.num_lev);
//По номеру уровня получаем массив с заданием для этого уровня
function GetTask(){
    var str_task;
    str_task = arrTasks[num_lev-1];
    arrCells = str_task.split(",");
return arrCells;}
var field;
//Вызывается при загрузке страницы
function OnStart(){

    for (var i=1; i<=field_length; i++){
        arr_Flags[i]=0;
    }

    ClearTable('new_rainbow');
    CreateRainbow();
    GetWindowSize();
    ClearTable('new_field');
    CreateTable(field_length);
   // MainDB();
    if (!localStorage.num_lev){
        localStorage.num_lev=1;
        onRestart();
    }
    else{ onRestart();}

    //Draw();

}

function onRestart(){
    num_lev=parseInt(localStorage.num_lev);
    if(num_lev!=10){
        if ( document.getElementById('id1').style.display === 'none') {document.getElementById('id1').style.display = 'block'};
        if ( document.getElementById('timer').style.display === 'none') {document.getElementById('timer').style.display = 'block'};
        if ( document.getElementById('map').style.display === 'none') {document.getElementById('map').style.display = 'block'};
    GetTask();
    sec = 0;
    min = 0;

    Timer();
    Paint();
    ClearBorderImage();
    DrawBorderImage();
    }
    else{
        ClearBorderImage();
        document.getElementById('id1').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('map').style.display = 'none';
    }
}
var y;
var x;
function GetWindowSize(){
    y = window.innerHeight;
    x = window.innerWidth;
 }

function ClearTable(id){
   for(var i=document.getElementById(id).rows.length;i>0;i-- ){
       document.getElementById(id).deleteRow(i-1);
      // document.getElementById(id).removeChild();
   }
}
function CreateTable(field_length){
    var field;
    var row;
    var cell;
    var div;
    var x_cell=parseInt((x-500)/field_length);
    var y_cell=parseInt((y-50)/field_length);

    //field=document.createElement('table');
    field=document.getElementById('new_field');

    for (var i=0; i<=field_length-1; i++){
        row=field.insertRow(-1);
        for (var j=0;j<=field_length-1; j++){
            cell=row.insertCell(-1);

            var num=i*field_length+(j+1);
            div = document.createElement("div");
            div.id = "d"+num.toString();
            cell.appendChild(div);
            div.className="glass";

            //div.style.backgroundColor="";
            div.style.height = parseInt((y-300)/field_length)+'px';
            div.style.width = div.style.height;

        }
    }
    field.addEventListener("click",function(e){
        var elem = null;

        if (e) {elem = e.target}

        if (elem.tagName!='TABLE'){
              var id = elem.id;
            //if (click_on===0){
              UseColor(id);
            //}
            }


    },false);
    document.body.appendChild(field);
}

function CreateRainbow(){
    var rainbow;
    var row;
    var cell;

    rainbow=document.getElementById('new_rainbow');
    for (var i=0; i<=11; i++){
        row=rainbow.insertRow(-1);
        for (var j=0; j<=1; j++){
            cell=row.insertCell(-1);
            var num=i*2+(j+1);
            cell.id="c"+num;
            document.getElementById("c"+num).className += " glass";
            //cell.innerHTML=cell.id;
            cell.style.backgroundColor = arrColors[num-1];
        }
    }
    SaveColor();
}

/*function GetLengthField(){
    if (num_lev===1 || num_lev===2 || num_lev===3){field_length=4; }
    else {if (num_lev===4 || num_lev===5 || num_lev===6){field_length=8;}
        else {if(num_lev===7 || num_lev===8 || num_lev===9){field_length=16;}
        }
    }
}*/
//Закрашиваем подсказку для раскраски уровня
function Clear_Paint(){
    for(var i=0; i<arrCells.length; i++) {
        var cur_id="m"+parseInt(i+1);
        var id_new = document.getElementById(cur_id);
        id_new.style.backgroundColor = "";
    }
}
function Paint(){
        Clear_Paint();
        for(var i=0; i<arrCells.length; i++) {
            var cur_id="m"+parseInt(i+1);
            var id_new = document.getElementById(cur_id);
            id_new.style.backgroundColor = arrColors[arrCells[i]];
        }
}

function DrawBorderImage(){
    for (var i=0; i<=arrCells.length-1; i++){
         var cur_id="m"+parseInt(i+1);
         var id_cell="d"+parseInt(i+1);
         var id_new = document.getElementById(cur_id);
         var new_cell = document.getElementById(id_cell);
        if (id_new.style.backgroundColor != ""){
            new_cell.style.borderWidth = "3px";
            new_cell.style.borderColor = "#464451";
         }

    }
}
function ClearBorderImage(){
    for (var i=0; i<=arrCells.length-1; i++){
        var id_cell="d"+parseInt(i+1);
        var new_cell = document.getElementById(id_cell);
        new_cell.style.border = "1px solid rgba(0,0,0,0.5)";
        new_cell.style.borderBottom = "3px solid rgba(0,0,0,0.5)";}
    }
//Рисуем палитру цветов
/*function Draw(){
    for(var i=0; i<arrColors.length; i++) {
        rain_id="col"+parseInt(i+1);
        rain_new = document.getElementById(rain_id);
        rain_new.style.backgroundColor = arrColors[i];

    }
}*/
//Поучаем треки звуков
s_aud="audio_colors";
sound=document.getElementById(s_aud);
awards=document.getElementById("audio_awards");
sound_fon=document.getElementById("audio_fon");

//Сохраняем выбранный из палитры цвет для последующей закраски им
function SaveColor () {
    var rainbow=document.getElementById('new_rainbow');
    rainbow.addEventListener("click",function(e){
        var elem = null;
        if (e) {elem = e.target}
        var id = elem.id;
        cur_color=parseInt(id.replace(/\D+/g,""));
        --cur_color;
        AudioPlay(arrColors_name[cur_color]);

    },false);
     return cur_color;
}


function UseColor (cell){
    var num = parseInt(cell.replace(/\D+/g,""))-1;
    var id_cell = document.getElementById(cell);
    var cur_id="m"+(num+1);
    var id_new = document.getElementById(cur_id);


    if (id_cell.style.backgroundColor === arrColors[cur_color]){
        id_cell.style.backgroundColor = "";
        if (id_new.style.backgroundColor != ""){
            id_cell.style.borderWidth = "3px";
            id_cell.style.borderColor = "#464451";
            }
    }
    else {
        //id_cell.className = id_cell.className +" "+arrColors_name[cur_color];
        id_cell.style.backgroundColor = arrColors[cur_color];
         }
    if (num_lev!=10){
    if(cur_color!=arrCells[num]){
        AudioPlay('attention');
        arr_Flags [num]= 1;
    }
    }
}


//id_but =  document.getElementById(id1);
//id_but.addEventListener('touchstart',Chek,false);

 //Проверка совпадения полученного при раскраске рисунка с заданием уровня
// Запускается при нажатии кнопки "проверить"
function Chek(id1){

    var f=0;
    var str1, str2;
    id_but =  document.getElementById(id1);

    clearInterval(t); //Останавливаем таймер
     s = sec; m = min;

    // Непосредственно проверка совпадения цвета в каждой ячейке
    for (var i=0; i<=arrCells.length-1; i++) {
        str1 = "d"+parseInt(i+1);
        str2 = "m"+parseInt(i+1);
        id_arr = document.getElementById(str1);
        id_map = document.getElementById(str2);
        if(id_arr.style.backgroundColor != id_map.style.backgroundColor){
            f = 1; //несовпадение цветов
        }
    }
    //Если раскраска совпала с шаблоном, то выводим результаты игры и звуковое сообщение об этом
    if (f===0) {
        game_Awards(s,m,f);
        AwardsPlay(med);
        //CountBall(med);
    }
    else {
        //med='not';
        game_Awards(s,m,f);
       // alert("pattern does not match the map!");
        AwardsPlay(med);
    }
    //Делаем видимыми элементы меню результатов прохождения уровня
   document.getElementById("wr").style.display="block";
   document.getElementById("mess").style.display="block";
    OutImage(med);
    OutButtons();

}

//Вывод рисунка заработанной медали
function OutImage(med){
    var id_res;
    var adr;
    id_res = document.getElementById("res2");

    if (med==='gold'){
        adr = 'url(img/gold_medal.png)';
    }
    else {if (med==='silver'){
        adr = 'url(img/silver_medal.png)';
        }
        else {if (med==='bronze'){
        adr = 'url(img/bronze_medal.png)';
            }
            else {adr = 'url(img/not_medal.png)'; //Когда вышло время,а результат не достигнут
            }
        }
    }
    id_res.style.backgroundImage = adr;
}

//Вывод рисунков для кнопок перехода по уровням, возврата в меню и повтора уровня
function OutButtons(){

    var id_but1, id_but2, id_but3;
    var adr1, adr2, adr3;

    adr1 = 'url(img/repeat_level_but.png)';
    id_but1 = document.getElementById("res3");
    id_but1.style.backgroundImage = adr1;

    adr2 = 'url(img/in_menu_but.png)';
    id_but2 = document.getElementById("res4");
    id_but2.style.backgroundImage = adr2;

    adr3 = 'url(img/next_level_but.png)';
    id_but3 = document.getElementById("res5");
    id_but3.style.backgroundImage = adr3;
}

//Функция-таймер
function Timer(){

   // sec=0;
    //min=0;
    var id_timer=document.getElementById("timer");
    //Включаем таймер
    t=setInterval(function(){
        sec++;
        //Наращиваем число минут по прошествии 60 сек
        if (sec==60){
            min++;
            sec = 0;
        }
        //Вывод цифры 0 в отображении сек таймера для значений от 0до9
        if (sec < 10){
            s_sec = ": 0" + sec;
        }
        else {s_sec = ": " + sec;}
        //Вывод ) перед мин от 0до9
        if (min < 10){
            s_min = "0"+min;
        }
        else {s_min = min;}
        //Проверка на достижение времени, установленного для выполнения задания уровня
        if (min===10){
            clearInterval(t); //Останавливаем таймер
            //Отображаем элементы для вывода результатов
            document.getElementById("wr").style.display="block";
            document.getElementById("mess").style.display="block";
            game_Awards(sec,min);
            AwardsPlay(med);
            OutImage(med);
            OutButtons();
            min = 0; //Сбрасываем время в 0
        }
        //Вывод значений таймера на странице
        id_timer.innerHTML = "Прошло времени:\n   "+s_min+s_sec;
    },1000);
}

// Задание границ результатов и определение полученной награды
//исходя из затраченного времени, которое фиксируется при выключении таймера
function game_Awards(s,m,f){
    var id_time;
    var all_time;

    id_time = document.getElementById("res1");

    all_time = 60*m + s;

    if ((all_time<=30) && f===0){
        med = 'gold';
        //Вывод времени выполнения задания в соответствующем блоке меню результатов
        id_time.innerHTML = "Затрачено времени <br>"+parseInt(m)+" : "+parseInt(s) ;
    }
    else
        {if ((all_time<=90)&& f===0){
            med = 'silver';
            id_time.innerHTML = "Затрачено времени <br>"+parseInt(m)+" : "+parseInt(s) ;
            }
        else
            {if ((all_time<600)&& f===0) {
                med = 'bronze';
                CountBall(med);
                var str_res = "Твой результат: "+res+" баллов";
                id_time.innerHTML = "Затрачено времени: "+parseInt(m)+" : "+parseInt(s)+"<br>"+"<br>"+str_res;
                }
            else
                {if (all_time>=600)
                    {med = 'not';
                    id_time.innerHTML = "Время вышло! <br>"+parseInt(m)+" : 00";
                    }
                    else {med='not';
                        id_time.innerHTML = "Уровень не пройден <br>"+parseInt(m)+" : "+parseInt(s) ;
                        }
                }
            }
        }
return med;}
function CountBall(med){
    if (med === 'gold'){
        res = res + 50;
        if(arrDifficult[num_lev-1]===2){ res = res +res*2;  }
        else {
            if(arrDifficult[num_lev-1]===3){ res = res + res*3;  }
        }
    }
    else {if (med === 'silver'){
        res = res + 25;
        if(arrDifficult[num_lev-1]===2){ res = res + res*2;  }
        else {
            if(arrDifficult[num_lev-1]===3){ res = res + res*3;  }
        }
    }
    else {if (med === 'bronze'){
        res = res + 15;
        if(arrDifficult[num_lev-1]===2){ res = res + res*2;  }
        else {
            if(arrDifficult[num_lev-1]===3){ res = res + res*3;  }
        }
    }
}
}
}


//Слушаем события для аудио с названием цветов
sound.addEventListener('timeupdate', function(audio_ev){

    if (sound.currentTime>end){
        sound.pause();
    }
},false);

//Проигрываем заданный фрагмент звукового файла с названием цветов
function AudioPlay(mus_el){

    if (audiosprite[mus_el] && a_off===0){
        sound.currentTime=audiosprite[mus_el][0];
        end=audiosprite[mus_el][1];
        sound.play();

    }
}

//Слушаем события для аудио с названием наград
awards.addEventListener('timeupdate',function(aw_ev){

    if (awards.currentTime>=end_aw){
        awards.pause();
    }
},false);

//Проигрываем заданный фрагмент звукового файла с названием наград
function AwardsPlay(aw_el){

    awards.pause();
    if (audio_records[aw_el] && a_off===0){
        awards.currentTime=audio_records[aw_el][0];
        end_aw=audio_records[aw_el][1];
        awards.play();
    }
}

//Загрузка и отображение страницы главного меню
//выполняется при нажатии соответствующей кнопи в меню результатов
function LoadMenu(){

    window.location.href = "select_level.html";
}

//Очищает поле для выполнения задания от цветов предыдущего уровня
function ClearField(){

    for (var i=0; i<arrCells.length; i++) {
        str = "d"+parseInt(i+1);
        id_arr = document.getElementById(str);
        id_arr.style.backgroundColor = "";
    }
}

//Повторная загрузка текущего уровня
//вызывается из меню резульатов
function Repeat(){

    document.getElementById("wr").style.display="none";
    document.getElementById("mess").style.display="none";
    ClearField();
    onRestart();
}

//Изменяет номер уровня и загружает его
function NewLevel(){

    var new_lev = parseInt(localStorage.num_lev) + 1;
    localStorage.num_lev = new_lev;
    document.getElementById("wr").style.display="none";
    document.getElementById("mess").style.display="none";
    ClearField();
    onRestart();
}

function PauseOn (){
    clearInterval(t);
    sound_fon.pause();
    document.getElementById("p1").style.display="block";
    document.getElementById("p2").style.display="block";
    document.getElementById("p3").style.display="block";
    document.getElementById("p4").style.display="block";
}

function PauseOff (){
    if (m_off===0){sound_fon.play();}
    Timer();
    document.getElementById("p1").style.display="none";
    document.getElementById("p2").style.display="none";
    document.getElementById("p3").style.display="none";
    document.getElementById("p4").style.display="none";

}
function AudioOff (){
    clearInterval(t);
    document.getElementById("a1").style.display="block";
    document.getElementById("a2").style.display="block";
    document.getElementById("a3").style.display="block";
    document.getElementById("a4").style.display="block";
    document.getElementById("a5").style.display="block";

}
function ChangeSetMusic (){
    Timer();
    document.getElementById("a1").style.display="none";
    document.getElementById("a2").style.display="none";
    document.getElementById("a3").style.display="none";
    document.getElementById("a4").style.display="none";
    document.getElementById("a5").style.display="none";

}

function MusicOff(){
    var aud_but;
    aud_but=document.getElementById("a3");
    if (m_off===0){
        sound_fon.pause();
        m_off=1;
        aud_but.style.border = "inset";
    }
    else {
        sound_fon.play();
        m_off=0;
        aud_but.style.border = "outset";
    }
}

function SoundOff(){
    var aud_but;
    aud_but=document.getElementById("a4");
    if (a_off===0){
        sound.pause();
        awards.pause();
        a_off=1;
        aud_but.style.border = "inset";
    }
    else {
        a_off=0;
        aud_but.style.border = "outset";
    }
}

function OpenSelectLevel(){
    window.location.href = "select_level.html";
    //document.getElementById("k1").style.display="block";
    //document.getElementById("k2").style.display="block";

}

var sw_but = document.getElementById("sw");
sw_but.addEventListener('click', function(e){
    if (m_off===0){
        sound_fon.pause();
        m_off=1;
    }
    else {
        sound_fon.play();
        m_off=0;
    }
},false);

var on_off = document.getElementById("myonoffswitch");
on_off.addEventListener('click', function(e){
    if (m_off===0){
        sound_fon.pause();
        m_off=1;
    }
    else {
        sound_fon.play();
        m_off=0;
    }
},false);

/*var myCounter = null
var timerId = null

function loadCounter(){
    myCounter = [
        new Counter("my_counter_1",
            {
                digitsNumber : 2,
                direction : Counter.ScrollDirection.Upwards,

                characterSet : Counter.DefaultCharacterSets.numericUp,
                charsImageUrl : "images/numeric_up_blackbg5.png",
                markerImageUrl : "marker.png",
                extraClassName: {
                    left: "my_counter_left",

                    right: "my_counter_right",

                    inner: "my_counter_inner"
                }
            }),
        new Counter("my_counter_2",
            {
                digitsNumber : 2,
                direction : Counter.ScrollDirection.Upwards,

                characterSet : Counter.DefaultCharacterSets.numericUp,
                charsImageUrl : "images/numeric_up_blackbg5.png",
                markerImageUrl : "marker.png",
                extraClassName: {
                    left: "my_counter_left",

                    right: "my_counter_right",

                    inner: "my_counter_inner"
                }
            }),
        new Counter("my_counter_3",
            {
                digitsNumber : 2,
                direction : Counter.ScrollDirection.Upwards,

                characterSet : Counter.DefaultCharacterSets.numericUp,
                charsImageUrl : "images/numeric_up_blackbg5.png",
                markerImageUrl : "marker.png",
                extraClassName: {
                    left: "my_counter_left",

                    right: "my_counter_right",

                    inner: "my_counter_inner"
                }
            })
    ];

    timerId = window.setInterval(function(){
            var now = new Date();
            myCounter[0].setValue(now.getHours(),
                800);
            myCounter[1].setValue(now.getMinutes(),
                800);
            myCounter[2].setValue(now.getSeconds(),
                800);

        },
        1000);
}

loadCounter();*/