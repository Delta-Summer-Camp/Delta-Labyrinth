function detectBrowser() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isIE || isEdge || isBlink || isSafari) {
        return true
    }
    return false
}

function detectBrowserUA() {
    navigator.sayswho = (function () {
        var N = navigator.appName, ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*([\d\.]+)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        return M.join(' ');
    })();
    if (navigator.sayswho.includes("Chrome") || navigator.sayswho.includes("Firefox") || navigator.sayswho.includes("Opera")) {
        return false
    }
    return true
}

function forceProperBrowser(should) {
    if (should) {
        alert("This webapp only supports Firefox / Chrome and its derivities, please use one of them")
        window.close()
    }
}

forceProperBrowser(detectBrowserUA())