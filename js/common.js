$(window).load(function(){
	/* ===============================================================================================
		공통
	=============================================================================================== */
	/* 레이어 출력시 스크롤 방지  */
	function scrollNo(){
		var winTop = $(window).scrollTop();
		$('html').addClass('no-scroll');
		$('html').css({'top':-winTop}).attr('data', winTop);
	}
	function scrollOk(){
		var winTop = $('html').attr('data');
		$('html').removeClass('no-scroll').removeAttr('style');
		$('body').scrollTop(winTop);
	}

	/* 상단 고정 메뉴 슬라이드 */
	$('.head-menu .swiper-container').each(function(){
		var swiper = new Swiper(this, {
			slidesPerView:'auto',
			nextButton: '.head-menu .btn-next',
			prevButton: '.head-menu .btn-prev'
		});
	});

	/* -----------------------------------------------------------------------------------------------
		전체메뉴 레이어
	---------------------------------------------------------------------------------------------- */
	var slideAreaH = $('.gnb-layer .slide-area').outerHeight();
	$('.gnb-layer').hide();
	$('.btn-gnb').click(function(){
		scrollNo();
		$('.gnb-layer').show().stop().animate({left:0}, 200);
	});
	$('.btn-gnb-close').click(function(){
		scrollOk();
		$('.gnb-layer').stop().animate({left:'-100%'}, 100, function(){
			$(this).hide();
		});
	});
	/* 전체메뉴 레이어 내 스크롤 카테고리 */
	// 스크롤 이벤트
	$('.gnb-layer .slide-area .depth-box:last-child').css({'height':slideAreaH});
	$('.gnb-layer .slide-area').scroll(function(){
		var boxTop = $(this).offset().top;
		var $direct = $(this).find('.depth-box');
		$direct.each(function(index){
			$depthTop = $direct.eq(index).offset().top;
			if ($depthTop <= boxTop) {
				$('.gnb-layer .menu-list .item').eq(index).addClass('on').siblings().removeClass('on');
			}
		});
	});
	// 메뉴 리스트 클릭
	$('.slide-menu .depth-box').each(function(){
		var wrapT = $(this).parents('.slide-menu').find('.slide-area').offset().top;
		var depthT = $(this).offset().top;
		$(this).attr('data', depthT - wrapT);
	});
	$('.menu-list .item').click(function(){
		var idx = $(this).index();
		var scrl = $(this).parents('.slide-menu').find('.depth-box').eq(idx).attr('data');
		$(this).parents('.slide-menu').find('.slide-area').animate({scrollTop:scrl});
	});

	/* 하단 고정 메뉴가 있을 경우 */
	$('.btm-fix-menu').each(function(){
		var menuH = $(this).outerHeight();
		$('.container').css({'padding-bottom':menuH});
	});

	/* 버튼 */
	// 관심물품
	$('.btn-like').click(function(){
		$(this).addClass('on');
	});
	$('.btn-ico1').click(function(){
		$(this).addClass('on');
	});

	/* -----------------------------------------------------------------------------------------------
		폼요소
	----------------------------------------------------------------------------------------------- */
	/* 체크박스 전체 선택 해제 */
	$('input[type=checkbox].all-check').change(function(){
		var name = $(this).attr('name');
		var dLen = $('input[name='+name+']').length;
		//var cLen = $('input[name='+name+']:checked').length;
		if(this.checked){
			$('input[name='+name+']').not('.all-check').prop('checked', true);
		}else{
			$('input[name='+name+']').not('.all-check').prop('checked', false);
		}
	});
	$('input[type=checkbox]').change(function(){
		var name = $(this).attr('name');
		var allDLen = $('input[name='+name+'].all-check').length;
		var allCLen = $('input[name='+name+']:checked.all-check').length;
		var dLen = $('input[name='+name+']').length - allDLen;
		var cLen = $('input[name='+name+']:checked').length - allCLen;
		if(cLen >= dLen){
			$('input[name='+name+'].all-check').prop('checked', true);
		}else{
			$('input[name='+name+'].all-check').prop('checked', false);
		}
	});

	/* ===============================================================================================
		스크롤 이벤트
	=============================================================================================== */
	/* 하단 고정메뉴 */
	var scrolling = 0;
	$(window).scroll(function(){
		var winTop = $(this).scrollTop();
		if (winTop > scrolling){
			if(winTop == ($(document).height() - $(window).height())){
				$('html').removeClass('down');
			}else{
				$('html').addClass('down');
			}
		}else {
			$('html').removeClass('down');
		}
		scrolling = winTop;
	});
});
