Mi.on("init", function() {
    $("#js-open-in-app").on("click", function() {
        var b = $('meta[name="apple-itunes-app"]').attr("content");
        if (b) {
            b = (new kj(b.replace(/,\s*/, "&"))).get("app-argument") || "";
            - 1 === b.indexOf("zhihu://") && (b = "zhihu://" + b);
            if (/Android/.test(navigator.userAgent)) {
                var c = b.replace(/^zhihu/, "intent") + "/#Intent;scheme=zhihu;package=com.zhihu.android;end", d = navigator.userAgent.match(/Chrome\/(\d+)/);
                if (25 <= (d && d[1]))
                    window.location = c;
                else {
                    c = document.createElement("iframe");
                    c.hidden = j;
                    c.src = b;
                    document.body.appendChild(c);
                    var e = za();
                    window.setTimeout(function() {
                        600 > za() - e && (window.location = "http://api.zhihu.com/client/download/apk")
                    }, 400)
                }
            } else {
                var g = m;
                window.location = b;
                window.setTimeout(function() {
                    g = j;
                    window.location = "http://itunes.apple.com/cn/app/id432274380"
                }, 250);
                window.setTimeout(function() {
                    g && window.location.reload()
                }, 500)
            }
            W("app-promotion", "click_zhihu_ios_open_dl_link", "header_not_logged_in")
        }
    })
});