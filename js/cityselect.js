/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城大学数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城大学 */

Vcity.allCity = ['北京大学|beijing|bj','上海大学|shanghai|sh','广大学大学|guangzhou|gz','深圳大学|shenzhen|sz','南京大学|nanjing|nj','杭大学大学|hangzhou|hz','天津大学|tianjin|tj','重庆大学|chongqing|cq','成都大学|chengdu|cd','青岛大学|qingdao|qd','苏大学大学|shuzhou|sz','无锡大学|wuxi|wx','常大学大学|changzhou|cz','温大学大学|wenzhou|wz','武汉大学|wuhan|wh','长沙大学|changsha|cs','石家庄大学|shijiazhuang|sjz','南昌大学|nanchang|nc','三亚大学|sanya|sy','合肥大学|hefei|hf','郑大学大学|zhengzhou|zz','保定大学|baoding|bd','唐山大学|tangshan|ts','秦皇岛大学|qinhuangdao|qhd','邯郸大学|handan|hd','邢台大学|xingtai|xt','张家口大学|zhangjiakou|zjk','承德大学|chengde|cd','衡水大学|hengshui|hs','廊坊大学|langfang|lf','沧大学大学|cangzhou|cz','太原大学|taiyuan|ty','大同大学|datong|dt','阳泉大学|yangquan|yq','长治大学|changzhi|cz','晋城大学|jincheng|jc','朔大学大学|shuozhou|sz','晋中大学|jinzhong|jz','运城大学|yuncheng|yc','忻大学大学|xinzhou|xz','临汾大学|linfen|lf','吕梁大学|lvliang|ll','呼和浩特大学|huhehaote|hhht','包头大学|baotou|bt','乌海大学|wuhai|wh','赤峰大学|chifeng|cf','通辽大学|tongliao|tl','鄂尔多斯大学|eerduosi|eeds','呼伦贝尔大学|hulunbeier|hlbe','巴彦淖尔大学|bayannaoer|byne','乌兰察布大学|wulanchabu|wlcb','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm','阿拉善盟|alashanmeng|alsm','沈阳大学|shenyang|sy','大连大学|dalian|dl','鞍山大学|anshan|as','抚顺大学|fushun|fs','本溪大学|benxi|bx','丹东大学|dandong|dd','锦大学大学|jinzhou|jz','营口大学|yingkou|yk','阜新大学|fuxin|fx','辽阳大学|liaoyang|ly','盘锦大学|panjin|pj','铁岭大学|tieling|tl','朝阳大学|chaoyang|cy','葫芦岛大学|huludao|hld','长春大学|changchun|cc','吉林大学|jilin|jl','四平大学|siping|sp','辽源大学|liaoyuan|ly','通化大学|tonghua|th','白山大学|baishan|bs','松原大学|songyuan|sy','白城大学|baicheng|bc','延边朝鲜族自治大学|ybcxzzzz|ybcxzzzz','哈尔滨大学|haerbin|heb','齐齐哈尔大学|qiqihaer|qqhe','鸡西大学|jixi|jx','鹤岗大学|hegang|hg','双鸭山大学|shuangyashan|sys','大庆大学|daqing|dq','伊春大学|yichun|yc','佳木斯大学|jiamusi|jms','七台河大学|qitaihe|qth','牡丹江大学|mudanjiang|mdj','黑河大学|heihe|hh','绥化大学|suihua|sh','大兴安岭地大学|daxinganling|dxaldq','徐大学大学|xuzhou|xz','南通大学|nantong|nt','连云港大学|lianyungang|lyg','淮安大学|huaian|ha','盐城大学|yancheng|yc','扬大学大学|yangzhou|yz','镇江大学|zhenjiang|zj','泰大学大学|taizhou|tz','宿迁大学|suqian|sq','宁波大学|ningbo|nb','嘉兴大学|jiaxing|jx','湖大学大学|huzhou|hz','绍兴大学|shaoxing|sx','舟山大学|zhoushan|zs','衢大学大学|quzhou|qz','金华大学|jinhua|jh','台大学大学|taizhou|tz','丽水大学|lishui|ls','芜湖大学|wuhu|wh','蚌埠大学|bengbu|bb','淮南大学|huainan|hn','马鞍山大学|maanshan|mas','淮北大学|huaibei|hb','铜陵大学|tongling|tl','安庆大学|anqing|aq','黄山大学|huangshan|hs','滁大学大学|chuzhou|cz','阜阳大学|fuyang|fy','宿大学大学|suzhou|sz','巢湖大学|chaohu|ch','六安大学|luan|la','亳大学大学|bozhou|bz','池大学大学|chizhou|cz','宣城大学|xuancheng|xc','福大学大学|fuzhou|fz','厦门大学|xiamen|xm','莆田大学|putian|pt','三明大学|sanming|sm','泉大学大学|quanzhou|qz','漳大学大学|zhangzhou|zz','南平大学|nanping|np','龙岩大学|longyan|ly','宁德大学|ningde|nd','景德镇大学|jingdezhen|jdz','萍乡大学|pingxiang|px','九江大学|jiujiang|jj','新余大学|xinyu|xy','鹰潭大学|yingtan|yt','赣大学大学|ganzhou|gz','吉安大学|jian|ja','宜春大学|yichun|yc','抚大学大学|fuzhou|fz','上饶大学|shangrao|sr','济南大学|jinan|jn','淄博大学|zibo|zb','枣庄大学|zaozhuang|zz','东营大学|dongying|dy','烟台大学|yantai|yt','潍坊大学|weifang|wf','济宁大学|jining|jn','泰安大学|taian|ta','威海大学|weihai|wh','日照大学|rizhao|rz','莱芜大学|laiwu|lw','临沂大学|linyi|ly','德大学大学|dezhou|dz','聊城大学|liaocheng|lc','滨大学大学|binzhou|bz','菏泽大学|heze|hz','开封大学|kaifeng|kf','洛阳大学|luoyang|ly','平顶山大学|pingdingshan|pds','安阳大学|anyang|ay','鹤壁大学|hebi|hb','新乡大学|xinxiang|xx','焦作大学|jiaozuo|jz','濮阳大学|puyang|py','许昌大学|xuchang|xc','漯河大学|luohe|lh','三门峡大学|sanmenxia|smx','南阳大学|nanyang|ny','商丘大学|shangqiu|sq','信阳大学|xinyang|xy','周口大学|zhoukou|zk','驻马店大学|zhumadian|zmd','济源大学|jiyuan|jiyuan','黄石大学|huangshi|hs','十堰大学|shiyan|sy','宜昌大学|yichang|yc','襄樊大学|xiangfan|xf','鄂大学大学|ezhou|ez','荆门大学|jingmen|jm','孝感大学|xiaogan|xg','荆大学大学|jingzhou|jz','黄冈大学|huanggang|hg','咸宁大学|xianning|xn','随大学大学|suizhou|sz','恩施土家族苗族自治大学|estjzmzzzz|estjzmzzzz','仙桃大学|xiantao|xt','潜江大学|qianjiang|qj','天门大学|tianmen|tm','神农架林大学|shennongjia|snjlq','株洲大学|zhuzhou|zz','湘潭大学|xiangtan|xt','衡阳大学|hengyang|hy','邵阳大学|shaoyang|sy','岳阳大学|yueyang|yy','常德大学|changde|cd','张家界大学|zhangjiajie|zjj','益阳大学|yiyang|yy','郴大学大学|chenzhou|cz','永大学大学|yongzhou|yz','怀化大学|huaihua|hh','娄底大学|loudi|ld','湘西土家族苗族自治大学|xxtjzmzzzz|xxtjzmzzzz','韶关大学|shaoguan|sg','珠海大学|zhuhai|zh','汕头大学|shantou|st','佛山大学|foushan|fs','江门大学|jiangmen|jm','湛江大学|zhanjiang|jz','茂名大学|maoming|mm','肇庆大学|zhaoqing|zq','惠大学大学|huizhou|hz','梅大学大学|meizhou|mz','汕尾大学|shanwei|sw','河源大学|heyuan|hy','阳江大学|yangjiang|yj','清远大学|qingyuan|qy','东莞大学|dongguan|dg','中山大学|zhongshan|zs','潮大学大学|chaozhou|cz','揭阳大学|jieyang|jy','云浮大学|yunfu|yf','南宁大学|nanning|nn','柳大学大学|liuzhou|lz','桂林大学|guilin|gl','梧大学大学|wuzhou|wz','北海大学|beihai|bh','防城港大学|fangchenggang|fcg','钦大学大学|qinzhou|qz','贵港大学|guigang|gg','玉林大学|yulin|yl','百色大学|baise|bs','贺大学大学|hezhou|hz','河池大学|hechi|hc','来宾大学|laibin|lb','崇左大学|chongzuo|cz','海口大学|haikou|hk','三亚大学|sanya|sy','五指山大学|wuzhishan|wzs','琼海大学|qionghai|qh','儋大学大学|danzhou|dz','文昌大学|wenchang|wc','万宁大学|wanning|wn','东方大学|dongfang|df','定安县大学|dingan|da','屯昌县大学|tunchang|tc','澄迈县大学|chengmai|cm','临高县大学|lingao|lg','白沙黎族自治县大学|bsnzzzx|bsnzzzx','昌江黎族自治县大学|cjlzzzx|cjlzzzx','乐东黎族自治县大学|ldlzzzx|ldlzzzx','陵水黎族自治县大学|lingshui|ls','保亭黎族苗族自治县大学|btlzmzzzx|btlzmzzzx','琼中黎族苗族自治县大学|qzlzmzzzx|qzlzmzzzx','西沙群岛|xishaqundao|xsqd','南沙群岛|nanshaqundao|nsqd','中沙群岛的岛礁及其海域|zhongshaqundao|zsqd','自贡大学|zigong|zg','攀枝花大学|panzhihua|pzh','泸大学大学|luzhou|lz','德阳大学|deyang|dy','绵阳大学|mianyang|my','广元大学|guangyuan|gy','遂宁大学|suining|sn','内江大学|neijiang|nj','乐山大学|leshan|ls','南充大学|nanchong|nc','眉山大学|meishan|ms','宜宾大学|yibin|yb','广安大学|guangan|ga','达大学大学|dazhou|dz','雅安大学|yaan|ya','巴中大学|bazhong|bz','资阳大学|ziyang|zy','阿坝藏族羌族自治大学|abzzqzzzz|abzzqzzzz','甘孜藏族自治大学|gzzzzzz|gzzzzzz','凉山彝族自治大学|lsyzzzz|lsyzzzz','贵阳大学|guiyang|gy','六盘水大学|liupanshui|lps','遵义大学|zunyi|zy','安顺大学|anshun|as','铜仁地大学|tongren|tr','黔西南布依族苗族自治大学|qxnbyzmzzzz|qxnbyzmzzzz','毕节地大学|bijie|bj','黔东南苗族侗族自治大学|qdnmzdzzzz|qdnmzdzzzz','黔南布依族苗族自治大学|qnbyzmzzzz|qnbyzmzzzz','昆明大学|kunming|km','曲靖大学|qujing|qj','玉溪大学|yuxi|yx','保山大学|baoshan|bs','昭通大学|zhaotong|zt','丽江大学|lijiang|lj','思茅大学|simao|sm','临沧大学|lincang|lc','楚雄彝族自治大学|cxyzzzz|cxyzzzz','红河哈尼族彝族自治大学|hhhnzyzzzz|hhhnzyzzzz','文山壮族苗族自治大学|wszzmzzzz|wszzmzzzz','西双版纳傣族自治大学|xsbndzzzz|xsbndzzzz','大理白族自治大学|dlbzzzz|dlbzzzz','德宏傣族景颇族自治大学|dhdzjpzzzz|dhdzjpzzzz','怒江傈僳族自治大学|njlszzzz|njlszzzz','迪庆藏族自治大学|dqzzzzz|dqzzzzz','拉萨大学|lasa|ls','昌都地大学|changdudiqu|cd','山南地大学|shannandiqu|sndq','日喀则地大学|rikazediqu|rkzdq','那曲地大学|naqudiqu|nqdq','阿里地大学|alidiqu|aldq','林芝地大学|linzhidiqu|lzdq','西安大学|xian|xa','铜川大学|tongchuan|tc','宝鸡大学|baoji|bj','咸阳大学|xianyang|xy','渭南大学|weinan|wn','延安大学|yanan|ya','汉中大学|hanzhong|hz','榆林大学|yulin|yl','安康大学|ankang|ak','商洛大学|shangluo|sl','兰大学大学|lanzhou|lz','嘉峪关大学|jiayuguan|jyg','金昌大学|jinchang|jc','白银大学|baiyin|by','天水大学|tianshui|ts','武威大学|wuwei|ww','张掖大学|zhangye|zy','平凉大学|pingliang|pl','酒泉大学|jiuquan|jq','庆阳大学|qingyang|qy','定西大学|dingxi|dx','陇南大学|longnan|ln','临夏回族自治大学|lxhzzzz|lxhzzzz','甘南藏族自治大学|gnzzzzz|gnzzzzz','西宁大学|xining|xn','海东地大学|haidongdiqu|hddq','海北藏族自治大学|hbzzzzz|hbzzzzz','黄南藏族自治大学|hnzzzzz|hnzzzzz','海南藏族自治大学|hnzzzzz|hnzzzzz','果洛藏族自治大学|glzzzzz|hlzzzzz','玉树藏族自治大学|yszzzzz|yszzzzz','海西蒙古族藏族自治大学|hxmgzzzzzz|hxmgzzzzzz','银川大学|yinchuan|yc','石嘴山大学|shizuishan|szs','吴忠大学|wuzhong|wz','固原大学|guyuan|gy','中卫大学|zhongwei|zw','乌鲁木齐大学|wulumuqi|wlmq','克拉玛依大学|kelamayi|klmy','吐鲁番地大学|tulufandiqu|tlfdq','哈密地大学|hamidiqu|hmdq','昌吉回族自治大学|cjhzzzz|cjhzzzz','博尔塔拉蒙古自治大学|betlmgzzz|betlmgzzz','巴音郭楞蒙古自治大学|byglmgzzz|byglmgzzz','阿克苏地大学|akesudiqu|aksdq','克孜勒苏柯尔克孜自治大学|kzlskekzzzz|kzlskekzzzz','喀什地大学|kashidiqu|ksdq','和田地大学|hetian|ht','伊犁哈萨克自治大学|ylhskzzz|ylhskzzz','塔城地大学|tachengdiqu|tcdq','阿勒泰地大学|aletaidiqu|altdq','石河子大学|shihezi|shz','阿拉尔大学|alaer|ale','图木舒克大学|tumushuke|tmsk','五家渠大学|wujiaqu|wjq','台北大学|taibei|tb','高雄大学|gaoxiong|gx','基隆大学|jilong|jl','台中大学|taizhong|tz','台南大学|tainan|tn','新竹大学|xinzhu|xz','嘉义大学|jiayi|jy','台北县大学|taibeixian|tbx','宜兰县大学|yilanxian|ylx','桃园县大学|taoyuanxian|tyx','新竹县大学|xinzhuxian|xzx','苗栗县大学|miaolixian|mlx','台中县大学|taizhongxian|tzx','彰化县大学|zhanghuaxian|zhx','南投县大学|nantouxian|ntx','云林县大学|yunlinxian|ylx','嘉义县大学|jiayixian|jyx','台南县大学|tainanxian|tnx','高雄县大学|gaoxiongxian|gxx','屏东县大学|pingdongxian|pdx','澎湖县大学|penghuxian|phx','台东县大学|taidongxian|tdx','花莲县大学|hualianxian|hlx','中西大学|zhongxiqu|zxq','东大学|dongqu|dq','九龙城大学|jiulongchengqu|jlcq','观塘大学|guantangqu|gtq','南大学|nanqu|nq','深水埗大学|shenshuibuqu|ssbq','黄大仙大学|huangdaxianqu|hdxq','湾仔大学|wanzaiqu|wzq','油尖旺大学|youjianwangqu|yjwq','离岛大学|lidaoqu|ldq','葵青大学|kuiqingqu|kqq','北大学|beiqu|bq','西贡大学|xigongqu|xgq','沙田大学|shatianqu|stq','屯门大学|tunmenqu|tmq','大埔大学|dabuqu|dbq','荃湾大学|quanwanqu|qwq','元朗大学|yuanlangqu|ylq','花地玛堂大学|huadimatangqu|hdmtq','圣安多尼堂大学|shenganduonitangqu|sadntq','大堂大学|datangqu|dtq','望德堂大学|wangdetangqu|wdtq','风顺堂大学|fengshuntangqu|fstq','嘉模堂大学|jiamotangqu|jmtq','圣方济各堂大学|shengfangjigetangqu|sfjgtq'];


/* 正则表达式 筛选中文城大学名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城大学数组为对象oCity，按照a-h,i-p,q-z,hot热门城大学分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-b]$/i, reg3 = /^[c-d]$/i, reg4 = /^[e-g]$/i,reg5 = /^[h]$/i,reg6 = /^[j]$/i,reg7 = /^[k-l]$/i,reg8 =  /^[m-p]$/i,reg9 =  /^[q-r]$/i,reg10 =  /^[s]$/i,reg11 =  /^[t]$/i,reg12 =  /^[w]$/i,reg13 =  /^[x]$/i,reg14 =  /^[y]$/i,reg15 =  /^[z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},AB:{},CD:{},EFG:{},H:{},J:{},KL:{},MNP:{},QR:{},S:{},T:{},W:{},X:{},Y:{},Z:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.AB[letter]) Vcity.oCity.AB[letter] = [];
                Vcity.oCity.AB[letter].push(match[1]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.CD[letter]) Vcity.oCity.CD[letter] = [];
                Vcity.oCity.CD[letter].push(match[1]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.EFG[letter]) Vcity.oCity.EFG[letter] = [];
                Vcity.oCity.EFG[letter].push(match[1]);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.H[letter]) Vcity.oCity.H[letter] = [];
                Vcity.oCity.H[letter].push(match[1]);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.J[letter]) Vcity.oCity.J[letter] = [];
                Vcity.oCity.J[letter].push(match[1]);
            }else if (reg7.test(letter)) {
                if (!Vcity.oCity.KL[letter]) Vcity.oCity.KL[letter] = [];
                Vcity.oCity.KL[letter].push(match[1]);
            }else if (reg8.test(letter)) {
                if (!Vcity.oCity.MNP[letter]) Vcity.oCity.MNP[letter] = [];
                Vcity.oCity.MNP[letter].push(match[1]);
            }else if (reg9.test(letter)) {
                if (!Vcity.oCity.QR[letter]) Vcity.oCity.QR[letter] = [];
                Vcity.oCity.QR[letter].push(match[1]);
            }else if (reg10.test(letter)) {
                if (!Vcity.oCity.S[letter]) Vcity.oCity.S[letter] = [];
                Vcity.oCity.S[letter].push(match[1]);
            }else if (reg11.test(letter)) {
                if (!Vcity.oCity.T[letter]) Vcity.oCity.T[letter] = [];
                Vcity.oCity.T[letter].push(match[1]);
            }else if (reg12.test(letter)) {
                if (!Vcity.oCity.W[letter]) Vcity.oCity.W[letter] = [];
                Vcity.oCity.W[letter].push(match[1]);
            }else if (reg13.test(letter)) {
                if (!Vcity.oCity.X[letter]) Vcity.oCity.X[letter] = [];
                Vcity.oCity.X[letter].push(match[1]);
            }else if (reg14.test(letter)) {
                if (!Vcity.oCity.Y[letter]) Vcity.oCity.Y[letter] = [];
                Vcity.oCity.Y[letter].push(match[1]);
            }else if (reg15.test(letter)) {
                if (!Vcity.oCity.Z[letter]) Vcity.oCity.Z[letter] = [];
                Vcity.oCity.Z[letter].push(match[1]);
            }

            /* 热门城大学 前16条 */
            if(i<20){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[1]);
            }
        }
    }
})();


/* 城大学HTML模板 */
Vcity._template = [
    '<p class="tip">直接输入可搜索城大学(支持汉字/拼音)</p>',
    '<ul>',
    '<li class="on">热门城大学</li>',
    '<li>AB</li>',
    '<li>CD</li>',
    '<li>EFG</li>',
    '<li>H</li>',
    '<li>J</li>',
    '<li>KL</li>',
    '<li>MNP</li>',
    '<li>QR</li>',
    '<li>S</li>',
    '<li>T</li>',
    '<li>W</li>',
    '<li>X</li>',
    '<li>Y</li>',
    '<li>Z</li>',
    '</ul>'
];

/* *
 * 城大学控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
        

    /* *
     * @createWarp
     * 创建城大学BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城大学选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 5 + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="#">' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城大学的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城大学LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城大学名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
            }
        }
    },

    /* *
     * INPUT城大学输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        // Vcity._m.on(this.input,'focus',function(){
        //     that.input.select();
        //     if(that.input.value == '城大学名') that.input.value = '';
        // });
        Vcity._m.on(this.input,'blur',function(){
            // if(that.input.value == '') that.input.value = '城大学名';
            
            var value = Vcity._m.trim(that.input.value);
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag=0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    that.input.value= '';
                }else{
                    var lis = Vcity._m.$('li',that.ul);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1){
                            that.input.value = bs[0].innerHTML;
                        }
                    }else{
                        that.input.value = '';
                    }
                }
            }

        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){ 
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};