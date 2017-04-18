$(window).load(function(){
	/* ===============================================================================================
		공통
	=============================================================================================== */
	/* 상단 고정 메뉴 슬라이드 */
	$('.head-menu .swiper-container').each(function(){
		var swiper = new Swiper(this, {
			slidesPerView:'auto',
			nextButton: '.head-menu .btn-next',
			prevButton: '.head-menu .btn-prev'
		});
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
