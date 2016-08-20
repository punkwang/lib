<?php
error_reporting(0);
$config = array(
    'roomId'=>$argv[1],//房间ID
    'dmServerIp'=>gethostbyname('openbarrage.douyutv.com'),
    'dmServerPort'=> 8601,//
    'groupId'=>-9999,//据说目前填-9999就行不须获取gid了
    'gidServerIp'=>'119.90.49.110',//119.90.49.111  119.90.49.104
    'gidServerPort'=>8046,//8020
);
 
function checkRoomOnline($html){
    $reg = '#"show_status":(\d*),#';
 
    preg_match($reg,$html,$match);
 
    if(count($match)==0){
        return -1;
    }
 
    return $match[1];
}
 
function packMsg($str){
    $length = pack('V', 4 + 4 + strlen($str) + 1);
    $code = $length;
    $magic = chr(0xb1).chr(0x02).chr(0x00).chr(0x00);
    $end = chr(0x00);
    return $length.$code.$magic.$str.$end;
}
 
 
function guid(){
    mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
    $charid = strtoupper(md5(uniqid(rand(), true)));
    $hyphen = chr(45);// "-"
    $uuid = //chr(123)// "{"
         substr($charid, 0, 8).$hyphen
        .substr($charid, 8, 4).$hyphen
        .substr($charid,12, 4).$hyphen
        .substr($charid,16, 4).$hyphen
        .substr($charid,20,12);
       // .chr(125);// "}"
    return $uuid;
}
 
function getGidMsg(){
    global $config;
    $time = time();
    $uuid = str_replace('-','',guid());
    $msg = 'type@=loginreq/username@=/password@=/roomid@='.$config['roomId'].'/';
    $msg.='ct@=2/';
    $msg.='devid@='.$uuid.'/';
    $msg.='rt@='.$time;
    $msg.='vk@='.md5($time.'7oE9nPEG9xXV69phU31FYCLUagKeYtsF'.$uuid).'/';
    $msg.='ver@=20150929/';
    return $msg;
}
 
function msg_decode($str)
{
    if(empty($str)){
        return '';
    }
    $data = array();
    $key = $val = '';
    if ($str[strlen($str) - 1] !== '/') {
        $str .= '/';
    }
    for ($i = 0; $i < strlen($str); $i++) {
        if ($str[$i] == '/') {
            $data[$key] = $val;
            if(strpos($val,'@S/')!==false){
                $arr = explode('@S/',$val);
                $data[$key] = array();
                foreach($arr as $v){
                    $data[$key][] = msg_decode(decodeStr($v));
                }
            }
            $key=$val='';
        } else {
            if($str[$i]=='@'){
                $i++;
                if($str[$i]=='A'){
                    $val.='@';
                }else{
                    if($str[$i]=='S'){
                        $val.='/';
                    }else{
                        if($str[$i]=='='){
                            $key = $val;
                            $val='';
                        }
                    }
                }
            }else{
                $val.=$str[$i];
            }
 
        }
    }
 
    return $data;
}
 
function decodeStr($str){
    return str_replace('@S','/',str_replace('@A','@',$str));
}
 
function getServerConfig($html){
    global $config;
    $reg = '#server_config":"(.*?)"#';
 
 
    preg_match($reg,$html,$match);
 
    $t = urldecode($match[1]);
    $list = (json_decode($t,true));
    if(!empty($list)){
        $config['gidServerIp'] = $list[0]['ip'];
        $config['gidServerPort'] = $list[0]['port'];
        echo "get gidServerIp success ip:{$config['gidServerIp']},
        port:{$config['gidServerPort']}\r\n";
    }else{
        echo 'get gidServerIp error '."\r\n";
    }
 
}
 
function getGid(){
    global $config;
    $gid_client = new swoole_client(SWOOLE_SOCK_TCP);
    if (!$gid_client->connect($config['gidServerIp'], $config['gidServerPort'], -1))
    {
        exit("connect failed. Error: {$gid_client->errCode}\n");
    }
    $gid_client->send(packMsg(getGidMsg()));
    $str = $gid_client->recv();
    $str.= $gid_client->recv();
    print_r(msg_decode($str));
    $gid_client->close();
 
    preg_match_all('#gid@=(\d+)/#',decodeStr($str),$matchs);
 
    foreach($matchs as $gid){
        if(is_numeric($gid[0]) && $gid[0]>0){
            $config['groupId'] = $gid[0];
            break;
        }
    }
 
    preg_match('#@ASport@AA=(\d+)@#',$str,$ports);
    if($ports[1]>1){
        $config['dmServerPort'] = $ports[1];
    }
 
 
    echo 'gid is '.$config['groupId']."\r\n port is {$config['dmServerPort']}";
 
}
 
if(empty($argv[1])){
    die('参数有误，房间id不存在，Usage：php yu.php 265593'."\n");
}
 
$html = file_get_contents('http://www.douyutv.com/'.$config['roomId']);
 
$roomStatus = checkRoomOnline($html);
 
if($roomStatus==-1){
    die("房间{$config['roomId']}不存在\n");
}else if($roomStatus==2){
    echo "房间{$config['roomId']}还在直播路上\n";
}
 
getServerConfig($html);
 
//getGid();  //获取gid  //据说目前填-9999就行不须获取gid了
 
$client = new swoole_client(SWOOLE_SOCK_TCP,SWOOLE_SOCK_ASYNC);
$client->on("connect", function($cli) {
    global $config;
    $cli->send(packMsg(
    'type@=loginreq/username@=auto_KRLJbE8mZM/password@=1234567890123456/roomid@='
    .$config['roomId'].'/'));
    $cli->send(packMsg("type@=joingroup/rid@="
    .$config['roomId'] . "/gid@=".$config['groupId']."/"));
 
});
 
$client->on("receive", function($cli, $data){
    static $flag=true;
    $sub_data = substr($data,12,-1);
   //file_put_contents("msg.txt",$sub_data."\r\n",8);
   $dataArr = msg_decode($sub_data);
    if(empty($dataArr['type'])){
        echo '解析错误,原始数据:'.$data."\r\n";
        return;
    }
 
   switch($dataArr['type']){
        case "loginres":
            echo '已连接上服务器...'."\r\n";
            break;
        case "chatmsg":
            echo $dataArr['nn'].':'.$dataArr['txt']."\r\n";
            break;
        case "keeplive":
            //echo '心跳信息'."\r\n";
            break;
        case "dgb":
            empty($dataArr['gfcnt']) && $dataArr['gfcnt']=1;
            empty($dataArr['hits']) && $dataArr['hits']=1;
 
            echo "{$dataArr['nn']}送的礼物(gfid={$dataArr['gfid']}) 数量{$dataArr['gfcnt']},
            连击{$dataArr['hits']}\r\n";
            break;
        case "ranklist":
            echo '排名信息'."\r\n";
            break;
        case "uenter":
            echo "{$dataArr['nn']} 进入直播间\r\n";
            break;
        default:
            echo "未知消息type:{$dataArr['type']}，data:$sub_data\r\n";
    }
 
    if($flag){
        swoole_timer_tick(45000,function() use ($cli){
            //echo date('Y-m-d H:i:s')."\r\n";
            $cli->send(packMsg("type@=keeplive/tick@=70/"));
        });
        $flag = false;
        echo "心跳进程启动\r\n";
    }
});
$client->on("error", function($cli){
    echo "Connect failed\n";
});
$client->on("close", function($cli){
    echo "Connection close\n";
});
//发起网络连接
$client->connect($config['dmServerIp'], $config['dmServerPort'], 1);