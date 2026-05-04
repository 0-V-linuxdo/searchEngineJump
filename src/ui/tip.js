var iqxinTimerGlobalTip = null;

export function iqxinShowTip(text, duration) {
    console.log("iqxin -- 消息提示框: ", text);
    var odom = document.querySelector("#iqixn-global-tip");
    if (!odom) {
        odom = document.createElement("iqxinDiv");
        odom.id = "iqixn-global-tip";
        odom.style.cssText = "" +
            "opacity: 0;" +
            "height: 25px;" +
            "line-height: 25px;" +
            "letter-spacing: 1px;" +
            "font-size: 1em;" +
            "color: #fff;" +
            "padding: 5px 20px;" +
            "border-radius: 5px;" +
            "background-color: #666;" +
            "position: fixed;" +
            "z-index: 200000001;" +
            "left: 50%;" +
            "bottom: 5%;" +
            "transform: translate(-50%);" +
            "transition: .4s;";
        document.body.appendChild(odom);
    }

    odom.innerHTML = text;
    odom.style.opacity = 1;

    duration = duration ? duration : 1500;
    if (!iqxinTimerGlobalTip) {
        iqxinTimerGlobalTip = setTimeout(function () {
            odom.style.opacity = 0;
            iqxinTimerGlobalTip = null;
        }, duration);
    }
}
