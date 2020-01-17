import $ from 'jquery'
import Vue from 'vue'

import * as des from './des'
import arrayHelper from './arrayHelper'
import platform from './platform'
import config from '../config'

export default class utils {
    static des = des;
    static arrayHelper = arrayHelper;
    static platform = platform;

    // 键盘弹出
    static inputKeyBoardUp(value, e) {
        if (config.appVersion < 0) {
            return
        }
        Vue.nextTick(function () {
            if (e && e.target) {
                // console.error('====>>>弹出1')
                // let input = $(e.target)
                // if (utils.isAndroid()) {
                //     let offsetButtom = input.offset().top + input.height()
                //     let centerY = $('body').height() * 0.5
                // 	let offsetY = 0
                // 	console.error('====>>>弹出1centerY:' + centerY + ' offsetButtom:' + offsetButtom)
                //     if (offsetButtom > centerY) {
                //         offsetY = offsetButtom - centerY
                // 	}
                // 	console.error('====>>>弹出1offsetY:' + offsetY)
                //     $('body').css('transform', 'translate(0px, -' + offsetY + 'px)')
                // }
            } else if (value && value.target) {
                // console.log('激活', value)
                // console.error('====>>>弹出2')
                // let input = $(value.target)
                // if (utils.isAndroid()) {
                //     let offsetButtom = input.offset().top + input.height()
                // 	let centerY = $('body').height() * 0.5
                // 	console.error('====>>>弹出2centerY:' + centerY + ' offsetButtom:' + offsetButtom)
                //     let offsetY = 0
                //     if (offsetButtom > centerY) {
                //         offsetY = offsetButtom - centerY
                // 	}
                // 	console.error('====>>>弹出2offsetY:' + offsetY)
                //     $('body').css('transform', 'translate(0px, -' + offsetY + 'px)')
                // }
            }
        })
    }

    // 键盘收回
    static inputKeyBoardDown(value, e) {
        if (e && e.target) {
            if (utils.isAndroid()) {
                $('body').css('transform', '')
            } else if (utils.isIOS()) {
                utils.fixIOSInput(null)
                setTimeout(() => {
                    $('.ant-modal-mask').css('position', 'fixed')
                    $('.ant-modal-wrap').css('position', 'fixed')
                }, 600)
            }
        } else if (value && value.target) {
            if (utils.isAndroid()) {
                $('body').css('transform', '')
            } else if (utils.isIOS()) {
                utils.fixIOSInput(null)
                setTimeout(() => {
                    $('.ant-modal-mask').css('position', 'fixed')
                    $('.ant-modal-wrap').css('position', 'fixed')
                }, 600)
            }
        }
    }

    static keyboardHide() {
        if (utils.isAndroid()) {
            let forceEle = $(':focus')
            if (forceEle) {
                forceEle.blur()
            }
            $('body').css('transform', '')
        }
    }

    static backFun() {
        console.log('PUSH了吧')
        window.history.pushState(null, null, document.URL)
    }

    static disableBack(canBack) {
        // if (utils.isAndroid()) {
        //     if (canBack) {
        //         window.removeEventListener('popstate', utils.backFun, false)
        //         window.history.back()
        //     } else {
        //         console.log('添加PUSH')
        //         window.history.pushState(null, null, document.URL)
        //         window.addEventListener('popstate', utils.backFun, false)
        //     }
        // }
    }

    static fixIOSInput(nodeName) {
        if (utils.isIOS()) {
            if ($(nodeName)) $(nodeName).css('position', 'absolute')
            if ($('.ant-modal-mask')) $('.ant-modal-mask').css('position', 'absolute')
            if ($('.ant-modal-wrap')) $('.ant-modal-wrap').css('position', 'absolute')
        }
    }

    static isAndroid() {
        let ua = navigator.userAgent.toLowerCase()
        if (/android/.test(ua)) {
            return true
        }
        return false
    }

    static isIOS() {
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
            return true
        }
        return false
    }

    static isApp() {
        return (utils.isIOS() || utils.isAndroid()) && config.appVersion > 0
    }

    static isOldApp() {
        return (utils.isIOS() || utils.isAndroid()) && (Number(config.appVersion) === 1)
    }

    static isMac() {
        return /macintosh|mac os x/i.test(navigator.userAgent)
    }

    static isWindows() {
        /windows|win32/i.test(navigator.userAgent)
    }

    static isFireFox() { // 火狐浏览器
		return navigator.vendor.includes('Google Inc.')
    }

    static isRegisterUserName(s) {
        // let reg = new RegExp('^[a-zA-Z][a-zA-Z0-9_]{4,19}$');
        let reg = new RegExp('^[a-zA-Z][a-zA-Z0-9]{4,11}$')
        return reg.test(s)
    }

    static inviteCode(s) {
        // let reg = new RegExp('^[a-zA-Z][a-zA-Z0-9]{4,11}$')
        let reg = new RegExp('^[a-zA-Z0-9]{1,11}$')
        return reg.test(s)
    }

	static checkRealName(s) {
		let regName = /^[\u4e00-\u9fa5a-zA-Z]｜[\u4e00-\u9fa5a-zA-Z]+((\·|\.|\s)[\u4e00-\u9fa5a-zA-Z])$/
		let regEn = /[`~!@#$%^&*()+-=<>?:"{}|,\\/;'[\]]/im
		let regCn = /[！#￥（）：；、“’｜《。》？【】]/im
		let reg1 = new RegExp(regName)
		let reg2 = new RegExp(regEn)
		let reg3 = new RegExp(regCn)
		return reg1.test(s) || reg2.test(s) || reg3.test(s)
	}

    // 深拷贝一个对象
    static deepCopy(obj) {
        var o = obj.constructor === Array ? [] : {}
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                o[i] = typeof obj[i] === 'object' ? this.deepCopy(obj[i]) : obj[i]
            }
        }
        return o
    }

    static isEmojiCharacter(substring) {
        for (let i = 0; i < substring.length; i++) {
            let hs = substring.charCodeAt(i)
            if (hs >= 0xd800 && hs <= 0xdbff) {
                if (substring.length > 1) {
                    let ls = substring.charCodeAt(i + 1)
                    let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
                    if (uc >= 0x1d000 && uc <= 0x1f77f) {
                        return true
                    }
                }
            } else if (substring.length > 1) {
                let ls = substring.charCodeAt(i + 1)
                if (ls === 0x20e3) {
                    return true
                }
            } else {
                if (hs >= 0x2100 && hs <= 0x27ff) {
                    return true
                } else if (hs >= 0x2B05 && hs <= 0x2b07) {
                    return true
                } else if (hs >= 0x2934 && hs <= 0x2935) {
                    return true
                } else if (hs >= 0x3297 && hs <= 0x3299) {
                    return true
                } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
                    hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b ||
                    hs === 0x2b50) {
                    return true
                }
            }
        }
        return false
    }

    // 银行卡号显示*****
    static displayCardcode(payNo) {
        payNo = payNo.replace(/^(.{4})(.*)(.{4})$/,
            (obj) => {
                var a = ''
                for (var i = 0; i < obj.length; i++) {
                    if (i < 4 || i > obj.length - 5) {
                        a += obj[i]
                    }
                    else {
                        a += '*'
                    }
                }
                return a
            })
        return payNo
    }

    // 金钱数值
    static moneyString(num) {
        return Number(num).toFixed(3)
    }

    //
    static moneyToInt(num) {
        return num * 1000
    }

    static moneyToFloat(num) {
        return this.accMul(num, 0.001)
    }

    static moneyChange(status, balance) {
        let acount = ''
        if (status.toLocaleLowerCase() === 'running' || status.toLocaleLowerCase() === 'waiting' || status.toLocaleLowerCase() === 'void' || status.toLocaleLowerCase() === 'refund' || status.toLocaleLowerCase() === 'reject') {
            acount = '--'
        } else if (status.toLocaleLowerCase() === 'draw') {
            acount = 0
        } else {
            acount = this.accMul(balance, 0.001)
        }
        return acount
    }

    static randomInteger(low, high) {
        return low + Math.floor(Math.random() * (high - low))
    }
    /*
     金币动画用
     */
    static randomFloat(low, high) {
        return low + Math.random() * (high - low)
    }
    /*
     金币动画用
     */
    static durationValue(value) {
        return value + 's'
    }

    // 数字左边补0
    static strPadLeft(str, lenght) {
        if (str.toString().length >= lenght) {
            return str
        } else {
            return utils.strPadLeft('0' + str, lenght)
        }
    }

    static countDownStr(duraction) {
        let duraction2 = duraction
        if (duraction2 <= 0) {
            duraction2 = 0
        }
        let dd = parseInt(duraction2 / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
        let hh = parseInt(duraction2 / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时数
        let mm = parseInt(duraction2 / 1000 / 60 % 60, 10) // 计算剩余的分钟数
        let ss = parseInt(duraction2 / 1000 % 60, 10) // 计算剩余的秒数
        let strdd = this.strPadLeft(dd, 2)
        let strhh = this.strPadLeft(hh, 2)
        let strmm = this.strPadLeft(mm, 2)
        let strss = this.strPadLeft(ss, 2)

        let str = ''
        if (dd > 0) {
            str += strdd + '天'
        }
        if (hh > 0) {
            str += strhh + '时'
        }
        str += strmm + '分'
        str += strss + '秒'
        return str
    }

    static countDownHourStr(duraction) {
        let duraction2 = duraction
        if (duraction2 <= 0) {
            duraction2 = 0
        }
        let dd = parseInt(duraction2 / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
        let hh = parseInt(duraction2 / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时数
        let mm = parseInt(duraction2 / 1000 / 60 % 60, 10) // 计算剩余的分钟数
        let ss = parseInt(duraction2 / 1000 % 60, 10) // 计算剩余的秒数
        let strhh = this.strPadLeft(hh, 2)
        let strmm = this.strPadLeft(mm, 2)
        let strss = this.strPadLeft(ss, 2)

        let str = ''
        if (dd > 0) {
            hh += 24 * dd
            strhh = this.strPadLeft(hh, 2)
        }
        if (hh > 0) {
            str += strhh + '时'
        }
        str += strmm + '分'
        str += strss + '秒'
        return str
    }

	static countDownStr1(duraction) {
		let duraction2 = duraction
		if (duraction2 <= 0) {
			duraction2 = 0
		}
		let dd = parseInt(duraction2 / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
		let hh = parseInt(duraction2 / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时数
		let mm = parseInt(duraction2 / 1000 / 60 % 60, 10) // 计算剩余的分钟数
		let ss = parseInt(duraction2 / 1000 % 60, 10) // 计算剩余的秒数
		let strhh = this.strPadLeft(hh, 2)
		let strmm = this.strPadLeft(mm, 2)
		let strss = this.strPadLeft(ss, 2)

		if (dd > 0) {
			hh += 24 * dd
			strhh = this.strPadLeft(hh, 2)
		}

		const obj = {
			hour: strhh,
			min: strmm,
			ss: strss
		}
		return obj
	}

    static dateFormat(t, style = 1) {
        let d = new Date()
        d.setTime(t)
        if (style === 2) {
            return `${d.getFullYear()}/${this.padLeadingZero(d.getMonth() + 1)}/${this.padLeadingZero(d.getDate())}`
        } else if (style === 3) {
            return `${d.getFullYear()}-${this.padLeadingZero(d.getMonth() + 1)}`
        }
        return `${d.getFullYear()}-${this.padLeadingZero(d.getMonth() + 1)}-${this.padLeadingZero(d.getDate())} ${d.getHours()}:${this.padLeadingZero(d.getMinutes())}:${this.padLeadingZero(d.getSeconds())}`
    }

    static getlastday(year, month) {
        let newyear = year
        let newmonth = month++
        if (month > 12)
        {
            newmonth -= 12
            newyear++
        }
        let newdate = new Date(newyear, newmonth, 1)
        return (new Date(newdate.getTime() - 1000 * 60 * 60 * 24))
    }

    // 获取指定天的24:00时间戳
    static dayEndTime(t) {
        let d = new Date()
        if (t === undefined || t === null || t === '') {
            t = new Date()
        }
        d.setTime(Number(t) + 86400000) // 往前加一天
        let retD = new Date(d.getFullYear() + '/' + this.padLeadingZero(d.getMonth() + 1) + '/' + this.padLeadingZero(d.getDate()))
        return retD.getTime() - 1000
    }

    // 获取指定天的00:00时间戳
    static dayStartTime(t) {
        let d = new Date()
        if (t === undefined || t === null || t === '') {
            t = new Date()
        }
        d.setTime(Number(t))
        let retD = new Date(d.getFullYear() + '/' + this.padLeadingZero(d.getMonth() + 1) + '/' + this.padLeadingZero(d.getDate()))
        return retD.getTime()
    }

    // 获取指定天的24:00时间戳
    static firstDayOfMonth(t) {
        let d = new Date()
        if (t === undefined || t === null || t === '') {
            t = new Date()
        }
        d.setFullYear(t.getFullYear(), t.getMonth(), 1)
        return d.getTime()
    }

    static padLeadingZero(value) {
        return value > 9 ? value : `0${value}`
    }

    // 获得下次请求的起始页
    static getStartPage(list, numPerPage) {
        if (list === null) {
            return 1
        }
        if (list.length === 0) {
            return 1
        }
        let startPage = 1
        startPage = Math.floor(list.length / numPerPage)
        startPage += (list.length % numPerPage === 0) ? 0 : 1
        startPage += 1
        return startPage
    }

    static unique(array) {
        let n = {}
        let r = []
        let val
        let type
        for (var i = 0; i < array.length; i++) {
            val = array[i]
            type = typeof val
            if (!n[val]) {
                n[val] = [type]
                r.push(val)
            } else if (n[val].indexOf(type) < 0) {
                n[val].push(type)
                r.push(val)
            }
        }
        return r
    }

    // 判断是否为纯整数
    static checkInteger(value) {
        let reg = /^[1-9]\d*$|^0$/ // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
        if (reg.test(value) === true) {
            return true
        } else {
            return false
        }
    }

    // 判断是否为数字
    static checkRate(value) {
        let re = /^[0-9]+(.[0-9]{0,3})?$/
        if (re.test(value)) {
            return true
        }
        return false
    }
	// 判断是否为数字，并且可能为1位2位小数
	static checkRate2(value) {
		let re = /^[0-9]+(.[0-9]{1,2})?$/
		if (re.test(value)) {
			return true
		}
		return false
	}

	/**
	 * 检测是否为百分数（小数点为0、1、2位）
	 * @param value
	 * @returns {boolean}
	 */
	static checkPercent(value) {
		const re = /^[0-9]+(.[0-9]{1,2})?%$/
		return re.test(value)
	}

    /** 参数说明：
     * 根据长度截取先使用字符串，超长部分追加…
     * str 对象字符串
     * len 目标字节长度
     * 返回值： 处理结果字符串
     */
    static cutString(str, len) {
        // length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str
        }
        let strlen = 0
        let s = ''
        for (let i = 0; i < str.length; i++) {
            s = s + str.charAt(i)
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + '...'
                }
            } else {
                strlen = strlen + 1
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + '...'
                }
            }
        }
        return s
    }

    static isChn(str) {
        let reg = /^[\u4E00-\u9FA5]+$/
        if (!reg.test(str)) {
            return false
        }
        return true
    }

    static uuid(len, radix) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
        let uuid = []
        radix = radix || chars.length

        if (len) {
            // Compact form
            for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
        } else {
            // rfc4122, version 4 form
            /* eslint-disable */
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            /* eslint-enable */
        }
        return uuid.join('')
    }

    // 小数乘小数，位数不超出
    static accMul(arg1, arg2) {
        if (arg1 == null || arg2 == null) {
            console.error('accMul Error')
        }
        let m = 0
        let s1 = arg1.toString()
        let s2 = arg2.toString()
        try { m += s1.split('.')[1].length } catch (e) { }
        try { m += s2.split('.')[1].length } catch (e) { }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    }

    // 小数点精度（）
    static fixFloat(num) {
        let m = 0
        let s1 = num.toString()
        try {
            m += s1.split('.')[1].length
        } catch (e) {

        }
        return Number(s1.replace('.', '')) / Math.pow(10, m)
    }
    // 1种方法神奇验证银行卡的方法
    static checkPayNo(cardNo) {
        // let reg = new RegExp(/^[0-9]*$/)
        let reg = new RegExp(/\d{15}|\d{19}/)
        if (!reg.test(cardNo)) {
            return false
        }
        let tmp = true
        let total = 0
        for (let i = cardNo.length; i > 0; i--) {
            let num = cardNo.substring(i, i - 1)
            tmp = !tmp
            if (tmp) num = num * 2
            let gw = num % 10
            total += (gw + (num - gw) / 10)
        }
        return total % 10 === 0
    }
    static decimalToBinary = (num, Bits) => { // 转二进制 (数字位数)
        let resArry = Number(num).toString(2)
        if (Bits) {
            let t = ''
            for (let r = resArry.length; r < Bits; r++) {
                t += 0
            }
            resArry = t + resArry
        }
        return resArry
	}
	// HTML转义
	// input: <p><b>123&456</b></p>
	// output: &lt;p&gt;&lt;b&gt;123&amp;456&lt;/b&gt;&lt;/p&gt;
	static HTMLEncode = (html) => {
		let temp = document.createElement('div')
		if (temp.textContent != null) {
			temp.textContent = html
		} else {
			temp.innerText = html
		}
		var output = temp.innerHTML
		temp = null
		return output
	}

	// HTML反转义
	// input: &lt;p&gt;&lt;b&gt;123&amp;456&lt;/b&gt;&lt;/p&gt;
	// output: <p><b>123&456</b></p>
	static htmlDecode = (text) => {
		var temp = document.createElement('div')
		temp.innerHTML = text
		var output = temp.innerText || temp.textContent
		temp = null
		return output
    }
    //  阻止“.”的按键
    static handleIntNum = (e) => {
        if (e && (e.key === '.' || e.key === 'e')) {
            e.returnValue = false
            return false
        }
    }
	static getUrlParam (url) {
		var param = {}
		if (url.indexOf('?') !== -1) {
			var str = url.split('?')[1]
			var strs = str.split('&')
			for (var i = 0; i < strs.length; i++) {
				param[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
			}
		}
		return param
	}
	// url转对象
	static getUrlParams (url) {
		let obj = {}
		try {
			url = url.match(/\?([^#]+)/)[1]
			let arr = url.split('&')
			for (let i = 0; i < arr.length; i++) {
				let subArr = arr[i].split('=')
				let key = decodeURIComponent(subArr[0])
				let value = decodeURIComponent(subArr[1])
				obj[key] = value
			}
			return obj
		} catch (e) {
			return obj
		}
	}
	// 对象转url
	static parseUrlParams (data) {
        try {
            let tempArr = []
			for (let i in data) {
				let key = encodeURIComponent(i)
				let value = encodeURIComponent(data[i])
				tempArr.push(key + '=' + value)
			}
			return tempArr.join('&')
		} catch (e) {
			return ''
		}
	}
	// 生成随机整数
	static randomNum(minNum, maxNum) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * minNum + 1, 10)
			case 2:
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
			default:
				return 0
		}
	}
	// 生成区间随机数
	static randomAboutNum(number, size) {
		let minNum = number + size
		let maxNum = number - size
		return utils.randomNum(minNum, maxNum)
	}
	// 获取当前光标位置
	static getCursortPosition(element) {
		let caretOffset = 0
		let doc = element.ownerDocument || element.document
		let win = doc.defaultView || doc.parentWindow
		let sel
		if (typeof win.getSelection !== 'undefined') { // 谷歌、火狐
			sel = win.getSelection()
			if (sel.rangeCount > 0) { // 选中的区域
				let range = win.getSelection().getRangeAt(0)
				let preCaretRange = range.cloneRange() // 克隆一个选中区域
				preCaretRange.selectNodeContents(element) // 设置选中区域的节点内容为当前节点
				preCaretRange.setEnd(range.endContainer, range.endOffset) // 重置选中区域的结束位置
				caretOffset = preCaretRange.toString().length
			}
		} else if ((sel = doc.selection) && sel.type !== 'Control') { // IE
			let textRange = sel.createRange()
			let preCaretTextRange = doc.body.createTextRange()
			preCaretTextRange.moveToElementText(element)
			preCaretTextRange.setEndPoint('EndToEnd', textRange)
			caretOffset = preCaretTextRange.text.length
		}
		return caretOffset
	}
	// 压缩图片
	static compressFile(file, {ratio}, callback) {
		let fileObj = file
		let reader = new FileReader()
		reader.readAsDataURL(fileObj) // 转base64
		reader.onload = function(e) {
			let image = new Image() // 新建一个img标签（还没嵌入DOM节点)
			image.src = e.target.result
			image.onload = function () {
				let canvas = document.createElement('canvas')
				let	context = canvas.getContext('2d')
				let	imageWidth = image.width * ratio
				let	imageHeight = image.height * ratio
				let	data = ''
				canvas.width = imageWidth
				canvas.height = imageHeight
				context.drawImage(image, 0, 0, imageWidth, imageHeight)
				data = canvas.toDataURL('image/jpeg') // 输出压缩后的base64
				let arr = data.split(',')
				let mime = arr[0].match(/:(.*?);/)[1] // 转成blob
				let	bstr = atob(arr[1])
				let n = bstr.length
				let u8arr = new Uint8Array(n)
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n)
				}
				const lastIndex = fileObj.name.lastIndexOf('.')
				const newName = fileObj.name.slice(0, lastIndex)
				let files = null
				try {
					// 这儿存在兼容性问题
					files = new window.File([new Blob([u8arr], {type: mime})], `${newName}.jpeg`, {type: 'image/jpeg'}) // 转成file
				} catch (e) {
					files = file
				}
				callback(files, {imageWidth, imageHeight}) // 回调
			}
		}
	}
	// 找到字符串在指定字符串中的第N次出现的位置的下标
	static findStrIndex(str, cha, num) {
		let x = str.indexOf(cha)
		for (let i = 0; i < num; i++) {
			x = str.indexOf(cha, x + 1)
		}
		return x
	}
	// 处理复制文本的换行，用于粘贴
	static handleCopyTextToPaste(val) {
		// console.log('处理前', val)
		if (val) {
			// 插入换行辨认字段（长一点...）
			let wrap = 'fjallkhnfaljflajff+uiuioijweoihkmfl41555mkmlkmlkmlmlhasfjlkjflakf;amf;sak8'
			let reg0 = /fjallkhnfaljflajff\+uiuioijweoihkmfl41555mkmlkmlkmlmlhasfjlkjflakf;amf;sak8/g
			let reg1 = /<br\/>/g
			let reg2 = /<div>/g
			let reg3 = /<\/div>/g

			// 外围是否由div包裹，有就去掉
			let index = val.indexOf('<div>')
			if (index === 0) {
				val = val.slice(5, -6)
			}

			let vals = val.replace(reg1, wrap)
			vals = vals.replace(reg2, wrap)
			vals = vals.replace(reg3, '')
			// console.log('replace后', vals)
			let ele = document.createElement('div')
			ele.innerHTML = vals
			// console.log('innerHTML处理后', ele.innerHTML)

			let innerText = ele.innerText
			innerText = innerText.replace(reg0, '\n')
			// console.log('处理后', innerText)
			return innerText
		}
	}
	// 光标处插入表情 （文本元素，插入值,this） this:手动插入后不触发v-model等双向绑定自动更新组件data值。
	static insertText(myField, myValue, _this) {
		// IE support
		if (document.selection) {
			myField.focus()
			let sel = document.selection.createRange()
			sel.text = myValue
			sel.select()
		} else if (myField.selectionStart || myField.selectionStart === '0') { // MOZILLA/NETSCAPE support
			var startPos = myField.selectionStart
			var endPos = myField.selectionEnd
			// save scrollTop before insert
			var restoreTop = myField.scrollTop
			myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)
			if (restoreTop > 0) {
				// restore previous scrollTop
				myField.scrollTop = restoreTop
			}
			myField.focus()
			myField.selectionStart = startPos + myValue.length
			myField.selectionEnd = startPos + myValue.length
		} else {
			myField.value += myValue
			myField.focus()
		}
		_this.inputText = myField.value // 跟新引用该函数的组件的inputText值
	}
}
