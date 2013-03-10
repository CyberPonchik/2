/**
 * Created with JetBrains WebStorm.
 * User: 1
 * Date: 19.02.13
 * Time: 20:20
 * To change this template use File | Settings | File Templates.
 */

var arr_map=Array();
function OpenLevel(lev){
   num_lev = lev;
   MainDB();
   arr_map=ReadMap(1);
   window.location.href = "index.html";
}
function OpenResults(){
    window.location.href = "results.html";
}