/**
 * Created with JetBrains WebStorm.
 * User: 1
 * Date: 27.02.13
 * Time: 13:28
 * To change this template use File | Settings | File Templates.
 */
var cur_color;
var arrColors = ["rgb(255, 0, 0)","rgb(255, 140, 0)","rgb(0, 0, 128)","rgb(0, 128, 0)","rgb(255, 215, 0)","rgb(153, 50, 204)","rgb(245, 245, 220)","rgb(255, 0, 255)"];
//var arrColors = [красный, оранжевый, синий, зеленый, желтый, фиолетовый, почти белый, фуксия];
var arrTasks = ["2,1,2,1,1,2,1,2,2,1,2,1,1,2,1,2", "2,2,3,3,2,1,1,3,3,1,1,2,3,3,2,2","6,7,7,6,7,4,4,7,6,3,3,6,6,3,3,6"];
var arrCells = [];

var arr_Flags = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var t; //
var field_length=0;
var sec;
var min;
var sound;
var sound_fon;
var end=0;
var end_aw=0;
var med;
var s_aud;
var num_lev = 1;
var audiosprite = {
    'attention':[0,2],
    'bejevii':[2,4],
    'belii':[4,5],
    'biruzov':[5,7],
    'bordov':[7,9],
    'chernii':[9,11],
    'fuksia':[11,13],
    'golyboi':[13,15],
    'haki':[15,16],
    'indigo':[16,17],
    'jeltii':[17,18],
    'korall':[18,20],
    'korichnev':[20,22],
    'krasnii':[22,24],
    'laim':[24,25],
    'malinovii':[25,27],
    'oliva':[27,28],
    'oranje':[28,30],
    'rozovii':[30,32],
    'salatnev':[32,34],
    'serii':[34,35],
    'sinii':[35,36],
    'sirenev':[36,38],
    'violet':[38,40],
    'zelenii':[40,41]
}
var audio_records = {
    'not':[0,3.9],
    'bronze':[4,7],
    'silver':[8,12],
    'gold':[12,16]
}
