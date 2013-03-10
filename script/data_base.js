
/**
 * Created with JetBrains WebStorm.
 * User: 1
 * Date: 17.02.13
 * Time: 20:06
 * To change this template use File | Settings | File Templates.
 */
var mosaic_db;
var name="My_DB";
var version= "1.0";
var about="Mosaic_DB";
var size=5*1024;
var _lev;

function MainDB(){
    InitDB();
    CreateTables();
    InsertData();
    ReadMap(_lev);
}

function InitDB(){
    mosaic_db = openDatabase(name,version, about, size);
    if(!mosaic_db){alert("Not connect with database");}
}
function CreateTables(){
    mosaic_db.transaction(function (tx)
        {
        //tx.executeSql("DROP TABLE IF EXISTS Users");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Users (id_user INT UNIQUE PRIMARY KEY, user_name TEXT)",
            [], function(res){}, function(tx, err){alert("Error: "+err);});
        //tx.executeSql("DROP TABLE IF EXISTS Level");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Level (id_level INT UNIQUE PRIMARY KEY, number INT, difficult TEXT, map TEXT)",
            [] ,function(res){}, function(tx, err){alert("Error: "+err);});
        //tx.executeSql("DROP TABLE IF EXISTS Stat");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Stat (id_stat INT UNIQUE PRIMARY KEY, id_user INT, id_level INT, time TEXT, bonus TEXT)",
            [],function(res){}, function(tx, err){alert("Error: "+err);});
        }
    )
}
/*function f_Ok(res) {
    alert("Cool!");
}
function f_Error (us,err) {
    alert("Error: "+err);
}*/

function InsertData(){
    mosaic_db.transaction(function (ins)
        {
       var map1;
        map1= "2,1,2,1,1,2,1,2,2,1,2,1,1,2,1,2";
        ins.executeSql("INSERT INTO Level(number,difficult,map) values (?,?,?)", [1, "easy", map1],
        function(res){}, function(ins, err){alert("Error: "+err);});
        }
    )
}


function ReadMap(_lev){
    var map = [];
    var res = [];

    mosaic_db.transaction(function (tx){
        tx.executeSql("SELECT * FROM Level WHERE number='"+_lev.toString()+"'"+"'", [],
            function(tx,result){
                res = result.rows.item(0)['map'];
                map=res.split(",");
               // return map;
            }), function(tx, err){alert("Error: "+err);}
        }
    )
    return map;
}

/*
mosaic_db.transaction(function (rm)
    {
    rm.executeSql("SELECT * FROM Level WHERE number='1'", [],
        function(rm,result){
            res = result.rows.item(0)['map'];
           map=res.split(",");
           return map;
        }), function(rm, err){alert("Error: "+err);}
    //arr_map=res.split(",");
    //return arr_map;
    }
)
*/
//arr_map=res.split(",");'

a=arr_map[0];