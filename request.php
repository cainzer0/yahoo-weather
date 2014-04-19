<?php
	$w = trim($_GET["w"]);
	$u = trim($_GET["u"]);
	$rss = file_get_contents("http://weather.yahooapis.com/forecastrss?w=".$w."&u=".$u."&d=7");
	$search  = array('yweather:', 'get:lat', 'geo:long', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
	$replace = array('', 'lat', 'long', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo');
	echo str_replace($search, $replace, strtolower($rss));
?>