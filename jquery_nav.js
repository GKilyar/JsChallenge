/**
 * copy the nav.js learn to build a jquery plugins
 * 
 * change some place in navjs use in my style
 */ 

;(function($,window,doucment,undefined){
    //constructor 写好获取的所有属性方便后续直接调用
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

        //调整nav class 给当前点击a 元素的父元素加类名
        adjustNav:function(self,$parent){
            self.$elem.find('.'+self.config.currentClass).removeClass(self.config.currentClass);
            $parent.addClass(self.config.currentClass);
        },

        //绑定Interval
        bindInterval:function(){
            var self = this;
            var docHeight;

            //$(window).on()是否移动
            self.$win.on('scroll.onePageNav',function(){
                self.didScroll = true;
            })

            //add 定时器属性
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

        //找到链接对应部分的高度 返回比当前窗口高度 更高的section
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
            //当前点击元素
            var $link = $(e.currentTarget);
            //当前元素的父元素
            var $parent = $link.parent();
            //得到每个a fref=#{name} #后对应的部分
            var newLoc = '#'+self.getHash($link);


            //判断当前元素有没有高亮类名
            if(!$parent.hasClass(self.config.currentClass)){
                //判断是否是开始状态
                if(self.config.begin){
                    self.config.begin();
                }

                //改变高亮当前nav项
                self.adjustNav(self,$parent);

                //移除
                self.unbindInterval();

                //移动至正确位置
                self.scrollTo(newLoc,function(){
                    //判断是否改变hash
                    if(self.config.changeHash){
                        window.location.hash = newLoc;
                    }

                    self.bindInterval();

                    if(self.config.end){
                        self.config.end();
                    }
                });
            }

            e.preventDefault();
        },

        /**
         * 判断是否移动操作 
         */
        scrollChange:function(){
            var windowTop = this.$win.scrollTop();
            var position = this.getSection(windowTop);
            var $parent


            if(position !==null){
                $parent = this.$elem.find('a[href$="#'+position+'"]').parent();
                

                //如果不是当前section
                if(!$parent.hasClass(this.config.currentClass)){
                    this.adjustNav(this,$parent)
                }

                if(this.config.scrollChange){
                    this.config.scrollChange($parent);
                }
            }

        },


        /**
         * 前序判断是否移动完毕后 开始跳转操作 调用$.animate()
         */
        scrollTo:function(target,callback){
            var offset = $(target).offset().top - this.config.navHeight
            $('html,body').animate({
                scrollTop:offset,
            },this.config.scrollSpeed,this.config.easing,callback)
        },

        //取消绑定事件及定时器
        unbindInterval:function(){
            //清除定时器
            clearInterval(this.t)
            //删除绑定事件
            this.$win.unbind('scroll.onePageNav')
        }
    };

    //默认属性 = 原型链上的default 可做拓展 以后就这么写代码 可拓展性强
    OnePageNav.defaults = OnePageNav.prototype.defaults

    //把当前OnePageNav拓展 添加到$ 插件已完成最后的添加操作
    $.fn.OnePageNav = function(options){
        console.log(this);
        return this.each(function(){
            new OnePageNav(this,options).init();
        });
    }

})(jquery,window,doucment);