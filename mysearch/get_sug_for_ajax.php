<?php
	$key = $_GET['key'];

	if($key !== ""){

	$uri = "http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key=".$key."&type=web&abtestid=1";
	//从搜狗浏览器抓取suggest关键词
	 
	$ch = curl_init ();
	// print_r($ch);
	curl_setopt ( $ch, CURLOPT_URL, $uri );
	curl_setopt ( $ch, CURLOPT_HEADER, 0 );
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	$return = curl_exec ( $ch );
	
	$patten = '/["](.*)["]/U';

	preg_match_all($patten,$return,$res);

	$sug =  array();

	for ($i=0; $i <10 ; $i++) { 
		$str = $res[0][$i+1];
		if ($str == "\"0;0;0;0\"" || $str == "\"0;0;1;0\"") {
			break;
		}
		$sug[$i] = encodeConvert(substr($str,1,strlen($str)-2),'gb2312','utf-8');
		//因为搜索结果含有中文 应转为utf-8
		//$sug[$i] = substr($str,1,strlen($str)-2);

	}

	curl_close ( $ch );

	


	echo json_encode($sug);

	}

	//var_dump($sug);
	/*json_encode函数只能接受 UTF-8 编码的数据（译注：指字符/字符串类型的数据）
	*
	*该函数用于转换编码
	*/
    function encodeConvert($str,$fromCode,$toCode){
		if(strtoupper($toCode) == strtoupper($fromCode)) return $str;
		
		if(is_string($str)){
			if(function_exists('mb_convert_encoding')){
				return mb_convert_encoding($str,$toCode,$fromCode);
			}
			else{
				return iconv($fromCode,$toCode,$str);
			}
		}
		elseif(is_array($str)){			
			foreach($str as $k=>$v){				
				$str[$k] = encodeConvert($v,$fromCode,$toCode);
			}
			return $str;
		}
		return $str;
		
	}

?>