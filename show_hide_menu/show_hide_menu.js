window.onload = function(){
    var flag = true;
    //get all li>h2
    var Lic = document.querySelectorAll('.navBox li h2')
    
    //add click event to nav
    for(let i=0;i<Lic.length;i++){
        Lic[i].onclick = function(){

            //judge the li open or not
            if(flag){
                // to controll the flag open/close 
                flag = false;
                setTimeout(function(){
                    flag = true;
                },300)

                console.log(this);

                if(this.className =='obFocus'){
                    this.querySelector('i').classList.remove('arrowRot');
                    //getNext : get the siblings element
                    getNext(this).style.height = '0'
                    this.classList.add('obtain')
                    this.classList.remove('obFocus')
                    //all operations done return
                    return
                }

                //获取下一个兄弟节点
                var secound = getNext(this);
                //获取这个节点的父节点的其余兄弟节点
                var sibling = except_self_siblings(secound.parentNode);
                var otherArr = [];
                var arrowClass = [];

                //delete other li shows up only show this one

                for(let j=0;j<sibling.length;j++){

                    var sibling_Sec = sibling[j].getElementsByTagName('*');
                    console.log(sibling_Sec)

                    for(let i =0;i<sibling_Sec;i++){
                        //judge
                        if (sibling_Sec[i].className == "secondary") {
                            otherArr.push(sibling_Sec[i])
                        }
                        if (sibling_Sec[i].className == "arrowRot") {
                            arrowClass.push(sibling_Sec[i])
                        }
                        if (sibling_Sec[i].className == "obFocus") {
                            sibling_Sec[i].classList.remove("obFocus");
                            sibling_Sec[i].classList.add("obtain");

                        }

                    }
                    
                }
                for (var i = 0; i < otherArr.length; i++) {
                    otherArr[i].style.height = "0";
                }
                if (arrowClass[0]) {
                    arrowClass[0].classList.remove("arrowRot");
                }

                // keep self
                secound.style.height = 2.5078 + "rem";
                this.getElementsByTagName("i")[0].classList.add("arrowRot");
                this.classList.remove("obtain");
                this.classList.add("obFocus");
            }

        }
    }

    // 子导航点击事件
    var seconC = document.querySelectorAll(".secondary h3")
    for (var i = 0; i < seconC.length; i++) {
        seconC[i].onclick = function () {
            for (var i = 0; i < seconC.length; i++) {
                seconC[i].classList.remove("seconFocus");
            }
            this.classList.add("seconFocus");
        }
    }
    
    // 隐藏菜单
    var obscure = document.querySelector(".navh");
    var open = document.querySelector("#open");
    var ensconce = document.querySelector("#ensconce");
    obscure.onclick = function () {
        open.style.marginLeft = "-300px";
        setTimeout(function () {
            ensconce.style.display = "block";
        }, 350)

    }
    //显示菜单
    var showC = document.querySelector("#ensconce h2");
    showC.onclick = function () {
        open.style.marginLeft = "0px";
        setTimeout(function () {
            ensconce.style.display = "none";
        }, 100)

    }    


}




//获得类名
function getClass(classname,parent){
    var Oparent = parent? document.getElementById(parent) : document,
        boxArr = [],
        oElements = Oparent.getElementsByTagName('*');

    for(var i =0;i<oElements.length;i++){

        if(oElements[i].className = classname){
            boxArr.push(oElements[i])
        }

    }
    //返回类名数组
    return boxArr;
}




//下个兄弟
function getNext(node){
    if(!node.nextSibling) return null;
    var nextNode =node.nextSibling;
    //nodetype?
    if(nextNode.nodeType == 1){
        return nextNode;
    }
    return getNext(node.nextSibling)
}





//得到除了自己的其他兄弟
function except_self_siblings(self){
    var r= [];
    var n =self.parentNode.firstChild;
    
    for(;n;n=n.nextSibling){

        if(n.nodeType ===1 && n != self){
            r.push(n)
        }

    }

    return r
}

