$(window).load(function() { // Inicia el script
	

	// CAMBIANDO EL FONDO	
	var fondo = true;
	function cambiarFondo () {

		if (fondo) {
			fondos("img/fondo-portada-0.jpg");
			setTimeout(function() {
				fondos("img/fondo-portada-2.jpg")
			}, 710);
			fondo = false;
		}
		else {
			fondos("img/fondo-portada-0.jpg");
			setTimeout(function() {
				fondos("img/fondo-portada-1.jpg")
			}, 710);
			fondo = true;
		}
	}
	setInterval(cambiarFondo, 5000);


	function fondos (imagen) {
		document.getElementById("portadaconfondo").style.backgroundImage = "url("+imagen+")";
		console.log("cambiando a "+imagen);
	}


	//esconde el menú
	$('.regresar').hide();

	// ************* MOSTRAR MENU
	var visible = false;
	$('.activa_menu').click( function() { 
		if( visible == true ) {
				$('.menu').css('z-index', '-1');
				$('.portada').animate({ marginLeft: '0px' }, 1000);
				visible = false;
		}
		else {
			$('.portada').animate({ marginLeft: '-300px' }, 1000, 
				function() { $('.menu').css('z-index', '10'); });
			visible = true;
		}
	});

	

	// ************* Hace funcionar al menú
	$(function() { 
		$('.menu ul li a').on('click', function(e) {

			$('.menu').css('z-index', '-1');
				$('.portada').animate({ marginLeft: '0px' }, 1000);
				visible = false;


			e.preventDefault();
			var ancla = $(this).attr('href');
			$('body, html').stop(true, true).animate({
				scrollTop : $(ancla).offset().top
			}, 1000);
		});
	});


	// ************* Funcion boton primer Scroll
	$('.scroll').on('click', function(e) {
			console.log("Click en scroll");

			e.preventDefault();
			$('body, html').stop(true, true).animate({
				scrollTop : $("#diferencia").offset().top
			}, 1000);
	});

	$('.regresar').on('click', function(e) {
			e.preventDefault();
			$('body, html').stop(true, true).animate({
				scrollTop : $("#portada").offset().top
			}, 1000);
	});


	var medidas = function() {

		// ********************		Scroll		********************
		Al = $(window).height();
		An = $(window).width();
		AlImagenIndeximg =	 $('.imagen_index img').height();
		//Al_marcos = (AlImagenIndeximg/100) * 52;
		Al_marcos = An * 0.23;
		$('.imagen_ideologia, .imagen_diferencia, .imagen_contact').css('height', Al_marcos+'px');

		// ------------ valores de las Als
		AlImagenIndex 			=	$('.imagen_index').height();
		AlContenidoIndex 		=	$('.contenido_index').height();
		AlImagenIdeologia 		=	$('.imagen_ideologia').height();
		AlContenidoIdeologia 	=	$('.contenido_ideologia').height();
		AlImagenDiferencia 		=	$('.imagen_diferencia').height();
		AlContenidoDiferencia 	=	$('.contenido_diferencia').height();
		AlImagenServicios 		=	$('.imagen_contact').height();
		AlContenidoServicios 	=	$('.contenido_contact').height();

		// ------------ valores de las posiciones
		Poimgindex 					=	$('.imagen_index').position();
		Pocontenidoindex				=	$('.contenido_index').position();
		Poimgideologia 				=	$('.imagen_ideologia').position();
		Pocontenidoideologia 		=	$('.contenido_ideologia').position();
		Poimgdiferencia 			=	$('.imagen_diferencia').position();
		Pocontenidodiferencia 		=	$('.contenido_diferencia').position();
		Poimgservicios  				=	$('.imagen_contact').position();
		Pocontenidoservicios 		=	$('.contenido_contact').position();
	}

	medidas();

	$( window ).resize(function() {
		medidas();
	});


	var posiciones = function() {

		if ( getScrollTop() > 0 ) {
			$('.scroll').fadeOut();
			$('.bar').fadeOut();
			$('.regresar').fadeIn();
		}

		if ( getScrollTop() <= 0 ) {
			$('.scroll').fadeIn();
			$('.bar').fadeIn();
			$('.regresar').fadeOut();
		}


		if (getScrollTop() <= Al && getScrollTop() >= 0) {
			a= getScrollTop()/1.2;
			$('.imagen_index img').css('margin-top', a+'px');
		}




		// ------------ valores IDEOLOGIA
		TopIdeologia = ($('.imagen_ideologia img').height())*.7;
		inIdeologia = AlContenidoIndex+AlImagenDiferencia+AlContenidoDiferencia;
		outIdeologia = Pocontenidoideologia.top;

		if (getScrollTop() >= inIdeologia && getScrollTop() <= outIdeologia) {
			posParcialIdeologia = ((TopIdeologia)/100)*((getScrollTop()-inIdeologia)/((outIdeologia-inIdeologia)/100));//equivalencia entre %de avance y %de imagen
			$('.imagen_ideologia img').css('margin-top', -TopIdeologia+posParcialIdeologia+'px');
		}


		// ------------ valores WORK
		TopDiferencia = ($('.imagen_diferencia img').height())*.7;
		// Se suman todo el alto de las secciones.
		//inDiferencia = inIdeologia+AlImagenIdeologia+AlContenidoIdeologia;
		inDiferencia = 0;
		//La posición final
		//outDiferencia = Pocontenidodiferencia.top;
		outDiferencia = Pocontenidodiferencia.top;


		if (getScrollTop() >= inDiferencia && getScrollTop() <= outDiferencia) {
			posParcialDiferencia = ((TopDiferencia)/100)*((getScrollTop()-inDiferencia)/((outDiferencia-inDiferencia)/100));//equivalencia entre %de avance y %de imagen
			$('.imagen_diferencia img').css('margin-top', -TopDiferencia+posParcialDiferencia+'px');
		}

		// ------------ valores SERVICIOS
		TopServicios = ($('.imagen_contact img').height())*.7;
		inServicios = inDiferencia+AlImagenDiferencia+AlContenidoDiferencia;
		outServicios = Pocontenidoservicios.top;

		if (getScrollTop() >= inServicios && getScrollTop() <= outServicios) {
			posParcialServicios = ((TopServicios)/100)*((getScrollTop()-inServicios)/((outServicios-inServicios)/100));//equivalencia entre %de avance y %de imagen
			$('.imagen_contact img').css('margin-top', -TopServicios+posParcialServicios+'px');
		}
		
	}

	$(window).scroll( function() {
		if( visible == true ) {
				$('.menu').css('z-index', '-1');
				$('.imagen_index').animate({
					marginLeft: '0px'
				}, 1000);
				visible = false;
		}

		posiciones();
		
	});


	$(window).on('mousewheel', function(event) {
		posiciones();
	})





	function getScrollTop(){ ///  verifica el calculo total en pixeles de toda la pagina
	    if(typeof pageYOffset!= 'undefined'){
	        //most browsers
	        return pageYOffset;
	    }
	    else{
	        var B= document.body; //IE 'quirks'
	        var D= document.documentElement; //IE with doctype
	        D= (D.clientHeight)? D: B;
	        return D.scrollTop;
	    }
	}


	$('.secciones-ex div').css('position', 'absolute').not(':first').hide();
	$('.secciones-ex div:first').addClass('aqui');
	// Cambia la foto grande desde dar clic en los thumnails
	$('.resume-menu ul li a').click(function(e){
		e.preventDefault();
		$('.resume-menu ul li a').css('color', '#a9a9a9');
		$(this).css('color', '#000');
		$('.secciones-ex div.aqui').fadeOut(400); // Oculta imagen actual
		$('.secciones-ex div').removeClass('aqui').filter(this.hash).fadeIn(400).addClass('aqui'); // Cambia la imagen
	});


	$('.secciones-socios div').css('position', 'absolute').not(':first').hide();
	$('.secciones-socios div:first').addClass('aqui');
	// Cambia la foto grande desde dar clic en los thumnails
	$('.socios-menu ul li a').click(function(e){
		e.preventDefault();
		$('.socios-menu ul li a').css('color', '#a9a9a9');
		$(this).css('color', '#000');
		$('.secciones-socios div.aqui').fadeOut(400); // Oculta imagen actual
		$('.secciones-socios div').removeClass('aqui').filter(this.hash).fadeIn(400).addClass('aqui'); // Cambia la imagen
	});

	

	// **********************	----------------	FUNCION CARGAR GALERÍA Y GALERÍA
	var cargarGaleria = function(galeria) {

		$('.work__slider').load(galeria, function() {
			$('.controles').hide();
			var longitud = $(".items > .item").length;
			var i = 1;

			// Ocultando botones
			if(i == 1) {
				$('.anterior').hide();
			}
			if(!(i < longitud)) {
				$('.siguiente').hide();
			}

			$('.items .item').not(':first').hide();
			$('.items .item:first').addClass('activo');


			//  Botón Siguiente
			$('.siguiente').click(function(e){
				e.preventDefault();
				if(!(i >= (longitud-1))) {
					$('.siguiente').show();
					$('.anterior').show();
					i++; 

					$('.activo').fadeTo('fast', 0);
					$('.items .item').eq(i).fadeTo('fast', 1);
					$('.items .item').eq(i).addClass('activo');
				}
				else {
					$('.siguiente').hide();
				}

				var altoItems = $('.work__slider').height();
				$('.item-slider').height(altoItems);
				$('.video-slider').height(altoItems);
				$('.video-slider-chico').height(altoItems*0.7).css("margin-top", (altoItems*0.15)+"px");
			});

			// Botón Anterior
			$('.anterior').click(function(e){
				console.log("la imagen es: " + i);


				e.preventDefault();
				if(!(i <= 0)) { 
					$('.siguiente').show();
					$('.anterior').show();
					i = i-1; 

					$('.activo').fadeTo('fast', 0);
					$('.items .item').eq(i).fadeTo('fast', 1);
					$('.items .item').eq(i).addClass('activo');
				}
				else {
					$('.anterior').hide();
				}

				var altoItems = $('.work__slider').height();
				$('.item-slider').height(altoItems);
				$('.video-slider').height(altoItems);
				$('.video-slider-chico').height(altoItems*0.7).css("margin-top", (altoItems*0.15)+"px");
			});

			// Controles
			$('.work__slider').mouseover(function(){
				$('.controles').stop(true).fadeTo('fast', 0.8);
			}).mouseleave(function(){
				$('.controles').stop(true).fadeTo('fast', 0);
			});


			var altoItems = $('.work__slider').height();
			$('.item-slider').height(altoItems);
			$('.video-slider').height(altoItems);
			$('.video-slider-chico').height(altoItems*0.7).css("margin-top", (altoItems*0.15)+"px");
		});


		var altoItems = $('.work__slider').height();
		$('.item-slider').height(altoItems);
		$('.video-slider').height(altoItems);
		$('.video-slider-chico').height(altoItems*0.7).css("margin-top", (altoItems*0.15)+"px");
	}
	


	cargarGaleria('work-spectre.html');

	$('.enlaces a').click(function(e) {
		e.preventDefault();
		$('.items').fadeTo('fast', 0);

		var cual = $(this).attr('alt');
		
		cargarGaleria(cual);
	});
	


	$(".cargando").fadeOut("slow");




});
