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

	/* 탭이 4개 이상일 경우 히든처리 후 버튼 출력 */
	$('.tab-hide-box').each(function(){
		var len = $(this).find('.tab-list4 .item').length;
		if(len >= 5){
			$(this).append('<button type="button" class="btn-goods-more"><span class="text">더보기</span></button>');
		}
		var btn = $(this).find('.btn-goods-more');

		$(btn).click(function(){
			var box = $(this).parents('.tab-hide-box');
			$(box).toggleClass('open');
			if(box.hasClass('open')){
				$(this).parents('.tab-hide-box').find('.tab-list4').css({'max-height':'90px'});
				$(this).children('.text').text('더보기');
			}else {
				$(this).parents('.tab-hide-box').find('.tab-list4').css({'max-height':'inherit'});
				$(this).children('.text').text('닫기');
			}
		});
	});

	/* -----------------------------------------------------------------------------------------------
		버튼
	---------------------------------------------------------------------------------------------- */
	// 온/오프 버튼
	$('.btn-onoff').click(function(){
		$(this).toggleClass('on');
	});

	/* -----------------------------------------------------------------------------------------------
		레이어팝업
	---------------------------------------------------------------------------------------------- */
	/* 열기 */
	$('.btn-popup').click(function(){
		scrollNo();
	});

	/* 닫기 */
	$('.layer-popup').hide().css({'opacity':'1'});
	$(document).on('click', '.popup-close, .block-ui', function(){
		scrollOk();
		$('.layer-popup').fadeOut(200);
		$('.block-ui').fadeOut();
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
	$('.btn-filter01').click(function(){
		scrollNo();
		$('.filter-layer01').show().stop().animate({right:0}, 200);
	});
	$('.btn-filter02').click(function(){
		scrollNo();
		$('.filter-layer02').show().stop().animate({right:0}, 200);
	});
	// 레이어 내 아코디언
	$('.search-layer .accordion-list .item.on .layer-list').show();
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
		달력 (datepicker)
	=============================================================================================== */
	$('.datepicker1').each(function(){
		$(this).datepicker({
			dateFormat:'yy/mm/dd',
			monthNames :['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			showMonthAfterYear:true,
			dayNamesMin:['일', '월', '화', '수', '목', '금', '토'],
			firstDay: 0,
			showOtherMonths: true,
			yearSuffix: '.'
		});
	});

	/* 공급일 선택일 경우 */
	$('.datepicker2').each(function(){
		$(this).datepicker({
			dateFormat:'yy/mm/dd',
			monthNames :['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			showMonthAfterYear:true,
			dayNamesMin:['일', '월', '화', '수', '목', '금', '토'],
			firstDay: 0,
			showOtherMonths: true,
			yearSuffix: '.'
		});

		/* 공급일 선택일 기본 설정 */
		function dateSetting(){
			setTimeout(function(){
				$('.datepicker2 .ui-state-default').each(function(){
					var txt = $(this).html();
					// 선택가능 공급일
					if(txt == '5' || txt == '21') $(this).addClass('ui-gray');
					// 희망 배송일
					if(txt == '18') $(this).addClass('ui-blue');
				});
			}, 20);
		}
		dateSetting();
	});


	$('.btn-calendar').click(function(){
		scrollNo();
		$('.calendar-layer').show();
		if($(this).hasClass('two')){
			$(this).addClass('twoOn');
		}else{
			$(this).addClass('on');
		}
	});
	$('.btn-date-print').click(function(){
		scrollOk();
		if($(this).parents('.calendar-layer').find('a').hasClass('ui-state-active')){
			var yesr = $(this).parents('.calendar-layer').find('.ui-datepicker-year').html();
			var month = $(this).parents('.calendar-layer').find('.ui-datepicker-month').html();
			var date = $(this).parents('.calendar-layer').find('.ui-state-active').html();
			// 일반
			$('.btn-calendar.twoOn').html(yesr + '년 ' + month + '월 ' + date + '일').removeClass('on');

			// 요일 구하기
			var idx = $(this).parents('.calendar-layer').find('a.ui-state-active').parent('td').index();
			if(idx == 0) var idx = '일';
			if(idx == 1) var idx = '월';
			if(idx == 2) var idx = '화';
			if(idx == 3) var idx = '수';
			if(idx == 4) var idx = '목';
			if(idx == 5) var idx = '금';
			if(idx == 6) var idx = '토';
			// 내역조회/공급일 선택
			$('.btn-calendar.on').html(yesr + '/' + month + '/' + date + '(' + idx + ')').removeClass('twoOn');
			$('.calendar-layer').hide();
		}else{
			$('.calendar-layer').hide();
		}
		//$('.datepicker1 a').removeClass('ui-state-active');
	});
	$('.btn-calendar-close, .calendar-layer .btn-text-line1').click(function(){
		scrollOk();
		$('.calendar-layer').hide();
	});

	$('.btn-month').click(function(){
		$('.btn-month').removeClass('on');
		$(this).addClass('on');
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
