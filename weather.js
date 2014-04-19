var weather = (function($, window, undefined){
	return{ 
		woeid:
			{
				amazonas: 2346468,
				ancash: 2346469,
				apurimac: 2346470,
				arequipa: 2346471,
				ayacucho: 2346472,
				cajamarca: 2346473,
				cusco: 2346475,
				huancavelica: 2346476,
				huanuco: 2346477,
				ica: 2346478,
				junin: 2346479,
				la_libertad: 2346480,
				lambayeque: 2346481,
				lima: 28358302,
				loreto: 2346483,
				madre_de_dios: 2346484,
				moquegua: 2346485,
				pasco: 2346486,
				piura: 2346487,
				puno: 2346488,
				san_martin: 2346489,
				tacna: 2346490,
				tumbes: 2346491,
				ucayali: 2346492
			},
		status:{
			s0: "tornado", s1: "tormenta tropical", s2: "huracán", s3: "tormentas severas", s4: "tormentas eléctricas", s5: "lluvia y nieve", s6: "lluvia y aguanieve", s7: "nieve y aguanieve", s8: "llovizna helada", s9: "llovizna", s10: "lluvia helada", s11: "lluvias", s12: "lluvias", s13: "ráfagas de nieve", s14: "lluvias ligeras", s15: "nieve soplando", s16: "nieve", s17: "granizo", s18: "aguanieve", s19: "polvo", s20: "brumoso", s21: "neblina", s22: "ahumado", s23: "tempestuoso", s24: "mucho viento", s25: "frío", s26: "nublado", s27: "mayormente nublado", s28: "mayormente nublado", s29: "parcialmente nublado", s30: "parcialmente nublado", s31: "despejado", s32: "soleado", s33:"pocas nubes", s34: "pocas nubes", s35: "lluvia mezclada y granizo", s36: "caliente", s37: "tormentas aisladas", s38: "tormentas dispersas", s39: "tormentas dispersas", s40: "lluvias dispersas", s41: "fuertes nevadas", s42: "nieve dispersa", s43: "fuertes nevadas", s44: "parcialmente nublado", s45: "tormenta", s46: "nieve", s47: "tormenda aislada", s3200: "no disponible"
		},
		getWeather: function(){
			var id = $("#view_weather").val();
			var u = $("#type").val();
			var w = (this.woeid[id])?this.woeid[id]:this.woeid["lima"];
			$.ajax({
				dataType: "html",
				url: "request.php?w=" + w + "&u=" + u,
				success: function(xml){
					var xml = $(xml);
					weather.setData(xml);
				},
				error: function(){
					weather.getWeather();
				}
			})
		},
		setData: function(xml){
			var condition = xml.find("condition");
			var units = xml.find("units");
			var wind = xml.find("wind");
			var atmosphere = xml.find("atmosphere");
			var grade = condition.attr("temp");
			var code = condition.attr("code");
			var status = condition.attr("text");
			var day = condition.attr("date").split(" ");
			var humidity = atmosphere.attr("humidity");
			$("h1 span").text($("#view_weather option:selected").text());
			$("#grade").text(grade);
			$("#status").text(weather.status["s" + code]);
			$("#icon").attr("class", "icon-weather" + code);
			$("#date").text(day[0] + " " + day[4] + " " + day[5]);
			$("#humidity span").text(humidity);
			$("#wind span").text(wind.attr("speed") + " " + units.attr("speed"));
			$("#visibility span").text(atmosphere.attr("visibility") + " " + units.attr("distance"));
			var a = 0;
			xml.find("forecast").each(function(){
				var obj = $(this);
				var forecast = $(".days").eq(a);
				var d = (a == 0)?"Hoy":obj.attr("day");
				var l = obj.attr("low");
				var h = obj.attr("high");
				var c = obj.attr("code");
				forecast.find("h3").text(d);
				forecast.find(".i span").attr("class", "icon-weather" + c);
				forecast.find(".min").text(l);
				forecast.find(".max").text(h);
				a++;
			});
		},
		setCities: function(){
			var html = '';
			for(x in weather.woeid){
				var name = x.split("_").join(" ");
				var selected = (name == "lima")?'selected="selected"':'';
				html += '<option value="' + x + '" ' +  selected + '>' + name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) + '</option>';
			}
			$("#view_weather").prepend(html);
		},
		selects: function(){
			$("#view_weather,#type").on("change", function(){
				weather.getWeather();
			});
		},
		init: function(){
			this.setCities();
			this.selects();
			this.getWeather();
		}
	}
})(jQuery, this);
$(document).on("ready", function(){
	weather.init();
});
