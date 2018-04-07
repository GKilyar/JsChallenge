//对象被创建了无数次 没有处理好 可能会造成内存泄漏
function creatXHR() {
    var xhr = null
    try {
        xhr = new XMLHttpRequest()
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                xhr = null
            }
        }
    }

    return xhr
}



//惰性函数
function creatXHR() {
    var xhr = null
    if (typeof XMLHttpRequest != 'undefined') {
        xhr = new XMLHttpRequest()
        creatXHR = function () {
            return new XMLHttpRequest()
        }
    } else {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP")
            creatXHR = function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }
        } catch (e) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP")
                creatXHR = function () {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                }
            } catch (e) {
                creatXHR = function () {
                    return null
                }
            }
        }
    }
    return xhr
}