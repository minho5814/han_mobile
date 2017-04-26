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

	/* 새창 팝업 닫기 */
	$('.header .btn-close').click(function(){
		window.close();
	});

	/* 상단 고정 메뉴 슬라이드 */
	$('.head-menu .swiper-container').each(function(){
		var swiper = new Swiper(this, {
			slidesPerView:'auto',
			nextButton: '.head-menu .btn-next',
			prevButton: '.head-menu .btn-prev'
		});
	});

	/* -----------------------------------------------------------------------------------------------
		슬라이드
	---------------------------------------------------------------------------------------------- */
	// 이미지 슬라이드 01
	$('.visual-slide1 .swiper-container').each(function(){
		var swiper = new Swiper(this, {
			pagination: '.visual-slide1 .swiper-pagination',
			paginationType: 'fraction'
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

	/* -----------------------------------------------------------------------------------------------
		검색 레이어
	---------------------------------------------------------------------------------------------- */
	// 닫기
	$('.search-layer .btn-close, .bg-close').click(function(){
		scrollOk();
		$('.search-layer').stop().animate({right:'-100%'}, 100, function(){
			$(this).hide();
		});
	});
	// 체크 전체 해제
	$('.search-layer .btn-text-line1').click(function(){
		$(this).parents('.search-layer').find('input[type=checkbox]').prop('checked', false);
	});
	/* 필터 검색 */
	// 열기
	$('.btn-filter').click(function(){
		scrollNo();
		$('.filter-layer').show().stop().animate({right:0}, 200);
	});
	/* 상세 검색 */
	$('.search-layer .accordion-list .item.on .layer-list').show();
	$('.header .btn-search').click(function(){
		scrollNo();
		$('.detail-layer').show().stop().animate({right:0}, 200);
	});
	$('.search-layer .accordion-list .item .layer-title').click(function(){
		if($(this).parents('.item').hasClass('on')){
			$(this).parents('.item').removeClass('on').find('.layer-list').slideUp(100);
		}else{
			$(this).parents('.item').addClass('on').find('.layer-list').slideDown(200);
		}
	});

	/* -----------------------------------------------------------------------------------------------
		카테고리 레이어
	---------------------------------------------------------------------------------------------- */
	$('.btm-fix-menu .btn-list .btn2').click(function(){
		scrollNo();
		$('.btm-fix-menu .btn-list .btn2').css({'opacity':'0'});
		$('.category-layer').show().stop().animate({bottom:0}, 200);
	});
	// 닫기
	$('.btn-close-category').click(function(){
		scrollOk();
		$('.btm-fix-menu .btn-list .btn2').css({'opacity':'1'});
		$('.category-layer').stop().animate({bottom:'-100%'}, 100, function(){
			$(this).hide();
		});
	});

	/* 상단 고정 버튼 영역이 있을경우 */
	$('.select-btn1').each(function(){
		var btnH = $(this).outerHeight();
		$(this).parents('.wrapper').css({'padding-top':btnH});
	});

	/* 하단 고정 메뉴가 있을 경우 */
	$('.btm-fix-menu').each(function(){
		var menuH = $(this).outerHeight();
		$('.wrapper').css({'padding-bottom':menuH});
	});

	/* 하단 플로팅 버튼이 있을 경우 (물품상세) */
	$('.order-floating-box').each(function(){
		var orderH = $(this).outerHeight() + 10;
		$('.container').css({'padding-bottom':orderH});
	});

	/* 버튼 */
	// 관심물품
	$('.btn-like').click(function(){
		$(this).addClass('on');
	});
	$('.btn-ico1').click(function(){
		$(this).addClass('on');
	});
	/* 물품 수량 */
	$('.len-btn-box button').click(function(){
		var len = $(this).parents('.len-btn-box').find('input').val() * 1;
		if($(this).hasClass('btn-plus')){
			$(this).parents('.len-btn-box').find('input').val(len + 1);
		}else{
			if(len <= 1){
				$(this).parents('.len-btn-box').find('input').val('1');
			}else{
				$(this).parents('.len-btn-box').find('input').val(len - 1);
			}
		}
	});
	/* 물품상세 하단 플로팅 영역 */
	$('.btn-order-close').click(function(){
		var orderH = $(this).parents('.order-floating-box').find('.order-layer').outerHeight() - $(this).parents('.order-floating-box').find('.btn-list1').outerHeight();
		if($(this).parents('.order-floating-box').hasClass('on')){
			$(this).parents('.order-floating-box').removeClass('on').find('.order-layer').animate({top:-1}, 100);
		}else{
			$(this).parents('.order-floating-box').addClass('on').find('.order-layer').animate({top:-orderH}, 200);
		}
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

	/* 텍스트아레아 글자수 체크 */
	$('.text-len-box textarea').each(function(){
		$(this).keyup(function(){
			var len = $(this).val().length;
			$(this).parents('.text-len-box').find('.len-text .len').html(len);
		});
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
