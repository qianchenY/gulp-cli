$(function(){
    // .m-kf start
    $(".m-kf .kf-item2").click(function(e){
        e.preventDefault();

        var _this = $(this),
            $img = _this.find(".kf-wx");

        if($(window).innerWidth() < 992){

            if($img.is(":hidden")){
                $img.show();
                _this.addClass("active");
            }else{
                $img.hide();
                _this.removeClass("active");
            }
        }

        
    })
    $(".m-kf .kf-item2").hover(function(e){
        e.preventDefault();

        var _this = $(this),
            $img = _this.find(".kf-wx");

        if($(window).innerWidth() > 991){
            $img.show();
            _this.addClass("active");
        }

        
    }, function(e){
        e.preventDefault();

        var _this = $(this),
            $img = _this.find(".kf-wx");

        if($(window).innerWidth() > 991){
            $img.hide();
            _this.removeClass("active");
        }
        
    })
    
    // .m-kf end

    //.returntop start
	$(".j-gotop").click(function(e){
		e.preventDefault();
		
		$("body, html").animate({scrollTop: 0}, 350)
	});
	
	$(window).scroll(function(){	
        
		if(wScroll.time){
			clearTimeout(wScroll.time);
		}
		wScroll.time = setTimeout(wScroll,100);		
	});
	
	function wScroll(){
		var _this = $(this),
			$top = _this.scrollTop(),
			$el = $("#j-gotop");
		
		if($top > 300){
            $el.css("display", "block");

		}else{
			$el.css("display", "none");
		}
		
	}
	//.returntop end
	// .g-hd start
	$(".m-hdnav li").hover(function () {
        var _this = $(this),
            $a = _this.children("a");

        $a.next().addClass("show");
        $a.addClass("active");
    }, function () {
        var _this = $(this),
            $a = _this.children("a");

        $a.next().removeClass("show");
        $a.removeClass("active");
	})
    // .g-hd end
	
	// lazyload start
    $(".j-lazy").lazyload({effect: "fadeIn"});
    // lazyload end
	
	// baguetteBox start
    baguetteBox.run('.baguetteBoxOne', {
        animation: 'fadeIn'
    });     
    // baguetteBox end
	
	// .table start
	$("table").wrap("<div class='table'></div>");
	// .table end

    // .j-nextshow start
    $(".j-nextshow").each(function(){
            
        var _this = $(this),
            $next = _this.next(),
            $cname = _this.data("cname"),
            $event = _this.data("event"),
            $ctel = _this.data("ctel");

        if($ctel) $next = $($ctel);

        if($event == "hover"){
            _this.hover(function(e){
                e.preventDefault();
    
                if($cname){
                    $next.addClass($cname);
                    _this.addClass("active");
                }else{
                    $next.slideDown();
                    _this.addClass("active");
                }
            }, function(e){
                e.preventDefault();
    
                if($cname){
                    $next.removeClass($cname);
                    _this.removeClass("active");
                }else{
                    $next.slideUp();
                    _this.removeClass("active");      
                }
            })
        }else{

            _this.click(function(e){
                e.preventDefault();
    
                if($cname){
                    
                    if($next.hasClass($cname)){
                        $next.removeClass($cname);
                        _this.removeClass("active");
                    }else{
                        $next.addClass($cname);
                        _this.addClass("active");
                    }  
                }else{
                    if($next.is(":hidden")){
                        $next.slideDown();
                        _this.addClass("active");
                    }else{
                        $next.slideUp();
                        _this.removeClass("active");
                    }         
                }
            })
        }

    })
    // .j-nextshow end
    
    // .j-select start
    $(".j-select .select-item a").click(function(e){
        e.preventDefault();

        var _this = $(this),
            $text = _this.text(),
            $wp = _this.parents(".j-select"),
            $span = $wp.find(".select-btn span"),
            $list = _this.parents(".select-list"),
            $input = $wp.find("input");
        
        _this.addClass("active").parent().siblings().children("a").removeClass("active");
        $span.text($text);
        $wp.find(".select-btn").removeClass("active");
        $list.slideUp();

        if(_this.data("val")){
            $input.val(_this.data("val"));
        }else{
            location.href = _this.data("href");
        }

    })
    // .j-select end
	
	// .j-modalshow start
    $(".j-modalshow").click(function(e){
        e.preventDefault();

        var _this = $(this),
            $el = $(_this.data("el"));

        $el.show();
    })

    $(".j-modalclose").click(function(e){
        e.preventDefault();

        $(this).parents(".m-modal").hide();
    })    
	
	$(".j-videoshow").click(function(e){
        e.preventDefault();

        var _this = $(this),
            $src = _this.data("src"),
            $modal = $(".j-videomodal");

        $modal.show().html('<iframe src="'+$src+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    });

    $(".j-videomodal").click(function(){
        $(this).hide().html('');
    })
    // .j-modalshow end
	
    // .j-hdata start
    if($(".j-hdata").length > 0){
        $(window).scroll(function(){
            var _this = $(this),
                $sTop = _this.scrollTop(),
                $height = _this.innerHeight(),
                $dom = $(".j-hdata"),
                $oTop = $dom.offset().top,
                $item = $dom.find(".num");
            if($sTop + $height >= $oTop){
                $item.each(function(){
                    var _this = $(this),
                        $num = parseInt(_this.data("num"));

                    if(!_this.data("num")) return;
                    
                    _this.animate({count: $num}, {
                        duration: 2000,
                        step: function(){
                            _this.text(Math.round(this.count).toLocaleString('en-US', {groupingSeparator: ','}));
                        },
                        complete: function(){
                            _this.text($num.toLocaleString('en-US', {groupingSeparator: ','}));
                        },
                    })
                })
            }
        })
    }
    // .j-hdata end
    // .j-sdnav start
    $('.j-sdnav .nav-item .iconfont').click(function(e){
        e.stopPropagation();
        e.preventDefault();
    
        var _this = $(this),
            $a = _this.parent('a'),
            $ul = $a.next();
    
        if($a.hasClass('active')){
            $a.removeClass('active');
            $ul.slideUp();
        }else{
            $a.addClass('active');
            $ul.slideDown();
        }
    })
    // .j-sdnav end
})