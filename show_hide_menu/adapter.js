
    var html = document.getElementsByTagName('html')[0];

    //innerwidth 窗口的文档显示区的宽度
    var width = window.innerWidth;

    if (width > 1080) {
        width = 1080;
    } else if (width < 320) {
        width = 320
    }

    var fontsize = 100 / 1080 * width;
    html.style.fontSize = fontsize + 'px';
