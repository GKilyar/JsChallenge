/**
 * copy the nav.js learn to build a jquery plugins
 * 
 * change some place in navjs use in my style
 */ 

;(function($,window,doucment,undefined){
    //constructor
    var OnePageNav = function (elem, options) {
        //获得元素
        this.elem = elem;
        //jquery 对象
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('plugin-options');
        //window对象
        this.$win = $(window);
        this.sections = {};
        //是否滚动
        this.didScroll = false;
        this.$doc = $(document);
        this.docHeight = this.$doc.height();
    };

    
    OnePageNav.prototype = {
        defaults:{
            navItems:'a',
            currentClass:'current',
            changeHash:false, 
            easing:'swing',
            filter:'',
            //nav 初始高度
            navHeight:70,
            scrollSpeed:700,
            //滚动初始值
            scrollThreshold:0.5,
            begin:false,
            end:false,
            scrollChange:false
        },
        //初始化
        init:function(){
            //拓展defaults
            this.config = $.extend({},this.defaults,this.options,this.metadata);

            this.$nav = this.$elem.find(this.config.navItems);

            //如果当前链接的filter属性不为空 就指定当前nav
            if(this.config.filter !==''){
                this.$nav = this.$nav.filter(this.config.filter);
            }

            //处理click事件 把作用域指向当前this
            //$.proxy(scope：作用域对象,name) 返回特定的上下文context
            this.$nav.on('click.onePageNav',$.proxy(this.handleClick,this));

            this.getPositions();

            //绑定定时器给scroll
            this.bindInterval();

            //更新位置且重设大小
            this.$win.on('resize.onePageNav',$.proxy(this.getPosition,this));

            return this;
        },

        //调整nav class
        adjustNav:function(self,$parent){
            self.$elem.find('.'+self.config.currentClass).removeClass(self.config.currentClass);
            $parent.addClass(self.config.currentClass);
        },

        //绑定Interval
        bindInterval:function(){
            var self = this;
            var docHeight;

            //$(window).on()
            self.$win.on('scroll.onePageNav',function(){
                self.didScroll = true;
            })

            self.t = setInterval(function(){
                //当前document的高度
                docHeight = self.$doc.height();

                //当滚动时
                if(self.didScroll){
                    self.didScroll = false;
                    self.scrollChange();
                }

                //如果document的高度变化
                if(docHeight !==self.docHeight){
                    self.docHeight = docHeight;
                    self.getPosition();
                }
            },200);
        },
        //得到每个链接
        getHash:function($link){
            return $link.attr('href').split('#')[1];
        },
        //获取位置
        getPosition:function(){
            var self = this,linkHref,topPos,$target;
            //遍历a标签 得到每个#后的相应位置
            self.$nav.each(function(){
                linkHref = self.getHash($(this));
                $target = $('#'+linkHref);

                if($target.lengt){
                    topPos = $target.offset().top;

                    self.sections[linkHref] = Math.round(topPos);
                }
            });
        },
        //
        getSection:function(windowPos){
            var returnValue = null;
            var windowHeight = Math.round(this.$win.height()*this.config.scrollThreshold);

            for (var section in this.sections) {
                if((this.sections[section] - windowHeight)<windowPos) {
                    returnValue = section;
                }
            }

            return returnValue;

        },
        //点击事件 回到相应部分
        handleClick : function (e) {
            var self = this;
            var $link = $(e.currentTarget);
            var $parent = $link.parent();
            var newLoc = '#'+self.getHash($link);


            //这部分还没写完
            if (!$parent.hasClass(self.config.currentClass)) {
                //Start callback
                if (self.config.begin) {
                    self.config.begin();
                }

                //Change the highlighted nav item
                self.adjustNav(self, $parent);

                //Removing the auto-adjust on scroll
                self.unbindInterval();

                //Scroll to the correct position
                self.scrollTo(newLoc, function () {
                    //Do we need to change the hash?
                    if (self.config.changeHash) {
                        window.location.hash = newLoc;
                    }

                    self.bindInterval();

                    //End callback
                    if (self.config.end) {
                        self.config.end();
                    }
                });
            }

            e.preventDefault();
        },
        //
        scrollChange:function(){},
        //
        scrollTo:function(){},
        //
        unbindInterval:function(){}
    };

    OnePageNav.defaults = OnePageNav.prototype.defaults

    $.fn.OnePageNav = function(options){
        console.log(this);
        return this.each(function(){
            new OnePageNav(this,options).init();
        });
    }

})(jquery,window,doucment);