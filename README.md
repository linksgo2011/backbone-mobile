
# backbone-mobile
 工程化构建高性能移动webAPP项目骨架。使用backbone、requirejs、amazeui等项目构建
 
 本项目解决的问题： 

1.   足够好的性能
2.   多人协同开发和统一的开发方式
3.   包管理和打包发布
4.   可维护性
5.   集成UI套件以及页面过渡动画
6.   资源按需加载和预加载

# demo 预览

http://linksgo2011.github.io/backbone-mobile/

# 为什么需要 backbone-mobile
    
自己从事纯前端工作一年多而已，但是却遇到了很多的webapp项目需求。尝试过使用很多框架以及现成的解决方案，这些方案非常不错，但是对于自己项目来说
借鉴意义大于拿来自己用。我把学习过的相关项目罗列出来细说12

1、https://github.com/zhangxinxu/mobilebone 张鑫旭大牛的过渡动画骨架。这个是最先吸引我的一个东西，理念很好但是并没有用于项目。
原因是这个项目重点在于过场动画以及切换方式，需要配合其他框架使用，需要添加路由、包管理、模型、控制器等等。还有一个项目官网
http://www.mobilebone.org/

2、https://github.com/yexiaochai/blade 叶小钗的blade框架。也有过渡动画效果，加入了requirejs，比较有特色的地方是使用了web组件。
对于小型小项目还是够用，带有简单的UI，同样需要路由、包管理、模型、控制器等特性。

3、https://github.com/driftyco/ionic ionic框架。非常强大的框架。使用angularjs作为路由、控制器、模型的实现。带有一套全面的UI框架，
同时可以打包成APP，非常方便。不好的地方就是需要学习angularjs，这个问题不是太大，angular在移动端有个致命的问题，就是双向绑定造成的性能
低下。同时也需要抛弃jquery生态系统。

4、https://github.com/shixy/Jingle 和blade类似，也是比较完善的框架，同样存在无法工程化的问题。

### backbone-mobile 工程化思路

使用backbone + require 做项目骨架，拓展出controller 划分 controller、model、view、templetes目录来进行协作开发。

# 如何使用

首先我们说下目录项目的目录结构及其功能
<pre>
├─css
├─fonts
├─img
└─js
    ├─controller       控制相关代码
    ├─lib              依赖的第三方库
    │  ├─backbone
    │  │  └─plugins
    │  ├─jquery
    │  │  └─plugins
    │  ├─modernizr
    │  ├─require
    │  │  └─plugins
    │  ├─underscore
    │  └─vsf
    │      ├─log
    │      └─store
    ├─template      模板文件，默认使用的html
    │  ├─Layzload   每个控制器推荐对应一个目录
    │  ├─Pages
    │  └─Preload
    └─view          视图目录
</pre>

可以看出我们依赖 backbone、requirejs 因此需要学习相关文档

 下载本项目
 
     git clone https://github.com/linksgo2011/backbone-mobile.git

 需要将项目放到web服务器目录下，这里约定使用web根目录,在编辑器中打开后，我们来说明如何开始开发。我们想增加一个 http://localhost/#/Users/update/9
 页面。我们需要怎么做呢？
 
 在我们的项目中拓展backbone 增加了路由中的controller以及，因此约定路由 按照
 
 <pre>
    #/controller/action/params
 </pre>
 
 格式来书写。
 
  
  在template 目录下创建 Users 目录，添加一个 update.html 模板文件
  
  <pre>
 &lt;div class="page" id="users-update-page" &gt;
    这是更新user的模板
 &lt;/div&gt;

  </pre>
  
  为了展示页面过场效果，最外层div标签必须按照这个格式书写，并且每个html页面的ID全局唯一，避免页面切换时冲突
  
 接下来，我们在controller 目录下创建 
 UsersController.js 
 <pre>
/**
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/MobileController',
        'view/BaseMobileView',
        'ui',
        'text!../template/Users/update.html'
    ],
    function($, _, Backbone, MobileController, BaseMobileView, ui, update) {
        return MobileController.extend({
            // 批量初始化
            initialize: function() {
                var views = {
                    updateView: update
                };
                $.each(views, $.proxy(function(key,tpl){
                    this[key] = new BaseMobileView({
                        $container: $('body'),
                        appendable: true,
                        controller: this,
                        textTemplate: tpl
                    });
                },this));
            },
            update: function() {
                // TODO

                this.updateView.render({});
                
                // 给页面绑定自己的事件，因为每次render都会重新渲染页面，不必担心事件重复
                this.updateView.$el.on("click", function(event) {
                    $.alert("你点击了页面!");
                });
                
            },
        });
    }
);
 </pre>

  
  这样路由中的controller对应这文件，而第二段对应了文件中的update方法，当url第一次被请求时，控制器的initialize 方法会被执行。
  然后每次请求都会执行update方法。
  
  我们可以在init方法中初始化view，然后在update方法中编写我们的业务逻辑
  
  这样你就可以根据路由划分功能和业务逻辑，更好的协作开发了。如果做过后端开发例如PHP、JAVA MVC相关的应该会很快理解这样编写代码的好处。
  
# 项目打包
    
使用requirejs开发的项目可以直接被打包成一个文件，提高加载效率，使用非常方便，项目根目录下放置了一个gruntfile文件，可以阅读该文件，使用nodejs相关模块打包即可。
 
# 配合后端API
 
 移步nodecms项目 https://github.com/linksgo2011/nodecms
 
#最后说几句
 
 这个项目不算自己完成，只能算是整合网络上一些代码然后修改整理了并在实际项目中使用过。
 下面我罗列出项目中使用的代码来源
 
 
 1.  backbone http://backbone.org.au/
 2.  controller https://github.com/hoatle/mobile-webapp-template
 3.  jquery http://jquery.com/
 4.  unnderscode http://underscorejs.org/
 5.  requeire http://www.requirejs.org/ 
 6.  amazeui  http://amazeui.org

 疏漏之处请指正，谢谢！
 
 
 贡献代码或者问题意见联系 120377843@qq.com