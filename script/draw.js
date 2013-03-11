/**
 * Created with JetBrains WebStorm.
 * User: Ann
 * Date: 11.02.13
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

//По номеру уровня получаем массив с заданием для этого уровня
function GetTask(){
    var str_task;
    str_task = arrTasks[num_lev-1];
    arrCells = str_task.split(",");
return arrCells;}
var field;
//Вызывается при загрузке страницы
function OnStart(){
    sec = 0;
    min = 0;
    GetTask();
    //Draw();
    Timer();
    Paint();
    ClearTable('new_field');
    GetLengthField();
    CreateTable(field_length);
    CreateRainbow();
}

function ClearTable(id){
   for(var i=document.getElementById(id).rows.length;i>0;i-- ){
       document.getElementById(id).deleteRow(i-1);
   }
}
function CreateTable(field_length){
    var field;
    var row;
    var cell;

    //field=document.createElement('table');
    field=document.getElementById('new_field');
   // field.style.border = '2';
    //field.style.borderColor='black';
    field.style.position = 'absolute';
    field.style.width = '400px';
    field.style.height = '400px';
    //field.id = "new_field";


    for (var i=0; i<=field_length-1; i++){
        row=field.insertRow(-1);
        for (var j=0;j<=field_length-1; j++){
            cell=row.insertCell(-1);
            var num=i*field_length+(j+1);
            cell.id="tc"+num;
            cell.innerHTML=cell.id;

        }
    }
    field.addEventListener("click",function(e){
        var elem = null;
        if (e) {elem = e.target}
        var id = elem.id;
        UseColor(id);

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
            cell.innerHTML=cell.id;
            cell.style.backgroundColor = arrColors[num];
        }
    }
    SaveColor();
}

function GetLengthField(){
    if (num_lev===1 || num_lev===2 || num_lev===3){field_length=4; }
    else {if (num_lev===4 || num_lev===5 || num_lev===6){field_length=8;}
        else {if(num_lev===7 || num_lev===8 || num_lev===9){field_length=16;}
        }
    }
}
//Закрашиваем подсказку для раскраски уровня
function Paint(){

        for(var i=0; i<arrCells.length; i++) {
            cur_id="m"+parseInt(i+1);
            id_new = document.getElementById(cur_id);
            id_new.style.backgroundColor = arrColors[arrCells[i]];
        }
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
        var cur_color=parseInt(id.replace(/\D+/g,""));
        AudioPlay(arrColors_name[cur_color-1]);
        //UseColor(id);

    },false);
     return cur_color;
}


function UseColor (cell){

    id_cell = document.getElementById(cell);
    id_cell.style.backgroundColor = arrColors[cur_color];
    num = parseInt(cell.replace(/\D+/g,""))-1;
    if(cur_color!=arrCells[num]){
        AudioPlay('attention');
        arr_Flags [num]= 1;
    }
}


//id_but =  document.getElementById(id1);
//id_but.addEventListener('touchstart',Chek,false);

 //Проверка совпадения полученного при раскраске рисунка с заданием уровня
// Запускается при нажатии кнопки "проверить"
function Chek(id1){

    var f=0;
    var str;
    id_but =  document.getElementById(id1);

    clearInterval(t); //Останавливаем таймер
    s = sec; m = min;

    // Непосредственно проверка совпадения цвета в каждой ячейке
    for (var i=0; i<arrCells.length; i++) {
        str = "tc"+parseInt(i+1);
        id_arr = document.getElementById(str);
        if(id_arr.style.backgroundColor != arrColors[arrCells[i]]){
            f = 1; //несовпадение цветов
        }
    }
    //Если раскраска совпала с шаблоном, то выводим результаты игры и звуковое сообщение об этом
    if (f===0) {
        game_Awards(s,m,f);
        AwardsPlay(med);
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
        if (min===2){
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
        id_timer.innerHTML = "TIME is:\n   "+s_min+s_sec;
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
        id_time.innerHTML = "Level time is <br>"+parseInt(m)+" : "+parseInt(s) ;
    }
    else
        {if ((all_time<=90)&& f===0){
            med = 'silver';
            id_time.innerHTML = "Level time is <br>"+parseInt(m)+" : "+parseInt(s) ;
            }
        else
            {if ((all_time<120)&& f===0) {
                med = 'bronze';
                id_time.innerHTML = "Level time is <br>"+parseInt(m)+" : "+parseInt(s) ;
                }
            else
                {if (all_time>=120)
                    {med = 'not';
                    id_time.innerHTML = "Time is over! <br>"+parseInt(m)+" : 00";
                    }
                    else {med='not';
                        id_time.innerHTML = "Level not complete <br>"+parseInt(m)+" : "+parseInt(s) ;
                        }
                }
            }
        }
return med;}

//Слушаем события для аудио с названием цветов
sound.addEventListener('timeupdate', function(audio_ev){

    if (sound.currentTime>end){
        sound.pause();
    }
},false);

//Проигрываем заданный фрагмент звукового файла с названием цветов
function AudioPlay(mus_el){

    if (audiosprite[mus_el]){
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
    if (audio_records[aw_el]){
        awards.currentTime=audio_records[aw_el][0];
        end_aw=audio_records[aw_el][1];
        awards.play();
    }
}

//Загрузка и отображение страницы главного меню
//выполняется при нажатии соответствующей кнопи в меню результатов
function LoadMenu(){

    window.location.href = "menu.html";
}

//Очищает поле для выполнения задания от цветов предыдущего уровня
function ClearField(){

    for (var i=0; i<arrCells.length; i++) {
        str = "tc"+parseInt(i+1);
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
    OnStart();
}

//Изменяет номер уровня и загружает его
function NewLevel(){

    num_lev = num_lev + 1;
    document.getElementById("wr").style.display="none";
    document.getElementById("mess").style.display="none";
    ClearField();
    OnStart();
}

function PauseOn (){
    clearInterval(t);
    sound_fon.pause();
    document.getElementById("p1").style.display="block";
    document.getElementById("p2").style.display="block";
    document.getElementById("p3").style.display="block";
}

function PauseOff (){
    sound_fon.play();
    Timer();
    document.getElementById("p1").style.display="none";
    document.getElementById("p2").style.display="none";
    document.getElementById("p3").style.display="none";

}


