/**
 * Created by Administrator on 2018/8/30/030.
 */
/*
* 第一个块
* */
let bell = $('#bell')[0],
    say = $('#say')[0],
    bgm = $('#bg_music')[0];
let loading = function () {
    //进度条加载完成后，要让loading的这块消失
    let $progressBar = $('.progress .progressBar'),
        $loadingBox = $('.loadingBox');
    //进度条的进度是由项目中所以的图片加载完成来决定的
    let ary = ['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0;//记录加载完成的图片个数
    ary.forEach((item)=>{
        let img = new Image();
        img.src = `./img/`+item;
       /* img.onload = function () {

        }*/
       img.onload = load;
    });
    function load() {
        n++;
        if(n == ary.length){
            //所以图片加载完毕
            $progressBar.css({
                width:'100%'
            });
            let timer = setTimeout(function () {
                $loadingBox.css({
                    opacity:0
                })
            },1000),
                timer2 = setTimeout(()=>{
                    $loadingBox.hide();
                    //第一个块隐藏，执行第二个块
                    phoneFn();
                },1800)

        }else {
            $progressBar.css({
                width:n/ary.length*100 + '%'
            })
        }
    }

};
loading();

/*
* 第二块
* */
let phoneFn = function () {
    let $phoneBox = $('.phoneBox'),//整个第二个块
        $listenBOx = $('.listen_box'),//接听的盒子
        $listenBtn = $('.listenBtn'),//接听 的按钮
        $noListenBox = $('.no_listen_box'),//挂机对应的盒子
        $noListenBtn = $('.no_listenBtn'),//挂机键
        $timeBox = $('.phoneBox header h4');//语音的时间
    bell.play();
    $listenBtn.tap(function () {
        //点击接听按钮
        $listenBOx.hide();
        $timeBox.show();
        $noListenBox.css({
            transform: 'translateY(0)'
        });
        bell.pause();
        say.play();
        //语言播放  怎么让上边的时间跟着变化
        let sayTimer = setInterval(function () {
            let t = say.currentTime;
            let str = '00:'+(Math.ceil(t) < 10 ? '0' + Math.ceil(t) : Math.ceil(t));
            $timeBox.html(str);
            //需要把say.currentTime转成 00:23这个格式的字符串

            //需要我们判断音频是否播放完毕；若播放完毕，则直接执行 挂机键执行的操作
            if(say.ended){
                clearInterval(sayTimer);
                phoneEnd();
            }
        },1000);

        //给挂机键绑定点击事件
        $noListenBtn.on('touchend',function () {
           phoneEnd();
            say.pause();
        });
        function phoneEnd() {
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            $phoneBox.css({
                transform:`translateY(${h}px)`
            });
            //设置个定时器 等待0.8秒后触发 下一个模块的函数
            setTimeout(function () {
                msgFn();
            },1000)
        }
    })
};

/*
* 第三块
* */

let msgFn = function () {
    /*
    * 让每一个li先都透明并且下移
    * 循环这些li让这些li轮着升上去，并且显示出来
    * */
    let $msgBox = $('.msgBox'),
        $ul = $msgBox.children('ul'),
        $lis = $ul.children('li'),
        $keyboard = $msgBox.find('.keyboard'),
        $textBOx = $keyboard.find('.textBox'),
        $btn = $keyboard.find('.btn');
    bgm.play();
    let h = 0,
        n = 0;//存储当前要显示的那个元素li的索引；

    let moveTimer = null;

    function move() {
        moveTimer = setInterval(function () {
            if(n === $lis.length){
                clearInterval(moveTimer);
                return;
            }
            $lis.eq(n).css({
                transform:'translateY(0)',
                opacity:1
            });
            //ul向上移动  根据索引；索引大于3；就让ul向上移动
            if(n >= 3){
                h +=$lis[n].clientHeight ;
                $ul.css({
                    transform:`translateY(-${h}px)`
                })
            }
            if(n === 2){
                $keyboard.css({
                    transform:'translateY(0)'
                });
                clearInterval(moveTimer);
                //接下来我们要让字体一个一个的显示出来
                setTimeout(function () {
                    inputWord();//这个是异步，n已经变成3了
                },1600);
                // inputWord();//
            }
            n++;
        },2000);
    }
    move();

    function inputWord() {
        //让字体一个个的蹦出来
        // let str = $lis[n+1].innerText;
        let str = $lis[n].innerText;
        let str2 = '';//当前要显示的字体内容
        let timer2 = null;
        let index = 0;//控制当前
        timer2 = setInterval(function () {
            if(index == str.length){
                clearInterval(timer2);
                $btn.show();//让按钮显示
                $btn.tap(function () {
                    $textBOx.html('');
                    h +=$lis[n].clientHeight ;
                    $ul.css({
                        transform:`translateY(-${h}px)`
                    });
                    $lis.eq(n).css({
                        opacity:1,
                        transform:'translateY(0)'
                    });
                    $keyboard.css({
                        transform:'translateY(3.7rem)'
                    });
                    n++;
                    move();

                });//点击按钮要做  1.清空textbox  2. 让键盘下去  3.让对话框接着弹
                return;
            }
            str2 += str[index];
            $textBOx.html(str2);
            index++;
        },200    )
    }

   /* $lis.each(function (index,item) {
        setTimeout(function () {
            $(item).css({
                opacity:1,
                transform:'translateY(0)'
            });
            if(index >= 3){
                h +=item.clientHeight ;
                $ul.css({
                    transform:`translateY(-${h}px)`
                })
            }
            if(index === 2){
                $keyboard.css({
                    transform:'translateY(0)'
                })
            }
        },index*2000)
    })*/
}











