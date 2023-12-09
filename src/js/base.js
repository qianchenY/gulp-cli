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
    // .j-listscroll start
    $(".j-listscroll").DY_scroll();
    $(".j-listscroll2").DY_scroll({auto: true});
    // .j-listscroll end	

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
	
	//.j-hoverbg start
    $(".j-hoverbg").each(function(){
        var _this = $(this),
            $src1 = _this.data("src1"),
            $src2 = _this.data("src2"),
            $isLink = _this.data("islink"),
            $el = _this.data("el") || _this;

        $el.data("flag", 0);

        if($el.hasClass("active")){
            $el.css("background-image", 'url(' + $src2 +')');
            $el.data("flag", 1);
        }
        
        $el.hover(function(){
            var _this = $(this);
    
            _this.css("background-image", 'url(' + $src2 +')');
        },function(){
            var _this = $(this);
    
            if(_this.data("flag") == 1) return;

            _this.css("background-image", 'url(' + $src1 +')');
        })

        if(!$isLink || $isLink == 'false'){
            $el.click(function(e){
                e.preventDefault();
                var _this = $(this);

                setTimeout(function(){
                    if(_this.hasClass("active")){
                        _this.css("background-image", 'url(' + $src2 +')').siblings().each(function(){
                            $(this).removeClass("active").css("background-image", 'url(' + $(this).data("src1") +')');
                            $(this).data("flag", 0);
                        });
                        _this.data("flag", 1);
                    }else{
                        _this.css("background-image", 'url(' + $src1 +')');
                        _this.data("flag", 0);
                    }
                })
            })
        }
    })
    //.j-hoverbg end
    
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
	
})