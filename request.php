<?php
	$w = trim($_GET["w"]);
	$u = trim($_GET["u"]);
	$rss = file_get_contents("http://weather.yahooapis.com/forecastrss?w=".$w."&u=".$u."&d=7");
	$search  = array('yweather:', 'get:lat', 'geo:long', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
	$replace = array('', 'lat', 'long', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo');
	$status_replace = array("tornado", "tormenta tropical", "huracán", "tormentas severas", "tormentas eléctricas", "lluvia y nieve", "lluvia y aguanieve", "nieve y aguanieve", "llovizna helada", "llovizna", "lluvia helada", "lluvias", "lluvias", "ráfagas de nieve", "lluvias ligeras", "nieve soplando", "nieve", "granizo", "aguanieve", "polvo", "brumoso", "neblina", "ahumado", "tempestuoso", "mucho viento", "frío", "nublado", "mayormente nublado", "mayormente nublado", "parcialmente nublado", "parcialmente nublado", "despejado", "soleado", "pocas nubes", "pocas nubes", "lluvia mezclada y granizo", "caliente", "tormentas aisladas", "tormentas dispersas", "tormentas dispersas", "lluvias dispersas", "fuertes nevadas", "nieve dispersa", "fuertes nevadas", "parcialmente nublado", "tormenta", "nieve", "tormenda aislada", "no disponible");
	echo str_replace($search, $replace, strtolower($rss));
?>