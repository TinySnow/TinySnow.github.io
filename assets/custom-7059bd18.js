var initAll = function () {
    var path = window.location.href;
    if (path.endsWith("/print.html")) {
        return;
    }

    var images = document.querySelectorAll("main img")
    Array.prototype.forEach.call(images, function (img) {
        img.addEventListener("click", function () {
            BigPicture({
                el: img,
            });
        });
    });

    // Un-active everything when you click it
    Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function (el) {
        el.addEventHandler("click", function () {
            Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function (el) {
                el.classList.remove("active");
            });
            el.classList.add("active");
        });
    });

    var updateFunction = function () {
        var id = null;
        var elements = document.getElementsByClassName("header");
        Array.prototype.forEach.call(elements, function (el) {
            if (window.pageYOffset >= el.offsetTop) {
                id = el;
            }
        });

        Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function (el) {
            el.classList.remove("active");
        });

        Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function (el) {
            if (id == null) {
                return;
            }
            if (id.href.localeCompare(el.href) == 0) {
                el.classList.add("active");
            }
        });
    };

    var pagetoc = document.getElementsByClassName("pagetoc")[0];
    var elements = document.getElementsByClassName("header");
    Array.prototype.forEach.call(elements, function (el) {
        var link = document.createElement("a");

        // Indent shows hierarchy
        var indent = "";
        switch (el.parentElement.tagName) {
            case "H1":
                return;
            case "H3":
                indent = "18px";
                break;
            case "H4":
                indent = "24px";
                break;
            case "H5":
                indent = "36px";
                break;
            case "H6":
                indent = "48px";
                break;
            default:
                break;
        }

        link.appendChild(document.createTextNode(el.text));
        link.style.paddingLeft = indent;
        link.href = el.href;
        pagetoc.appendChild(link);
    });
    updateFunction.call();

    // Handle active elements on scroll
    window.addEventListener("scroll", updateFunction);

    document.getElementById("theme-list").addEventListener("click", function (e) {
        var iframe = document.querySelector('.giscus-frame');
        if (!iframe) return;
        var theme;
        if (e.target.className === "theme") {
            theme = e.target.id;
        } else {
            return;
        }

        // 若当前 mdbook 主题不是 Light 或 Rust ，则将 giscuz 主题设置为 transparent_dark
        var giscusTheme = "light"
        if (theme != "light" && theme != "rust") {
            giscusTheme = "transparent_dark";
        }

        var msg = {
            setConfig: {
                theme: giscusTheme
            }
        };
        iframe.contentWindow.postMessage({ giscus: msg }, 'https://giscus.app');
    });
    
    pagePath = pagePath.replace("index.md", "");
    pagePath = pagePath.replace(".md", "");
    if (pagePath.length > 0) {
        if (pagePath.charAt(pagePath.length-1) == "/"){
            pagePath = pagePath.substring(0, pagePath.length-1)
        }
    }else {
        pagePath = "index"
    }

    var divider = document.createElement("hr")

    document.getElementById("giscus-container").appendChild(divider);

    // 选取浏览器默认使用的语言
    const lang = navigator.language || navigator.userLanguage

    // 若当前 mdbook 主题为 Light 或 Rust ，则将 giscuz 主题设置为 light
    var theme = "transparent_dark";
    const themeClass = document.getElementsByTagName("html")[0].className;
    if (themeClass.indexOf("light") != -1 || themeClass.indexOf("rust") != -1) {
        theme = "light"
    }

    var giscusContainer = document.createElement("script")
    giscusContainer.type = "text/javascript";
    giscusContainer.src = "https://giscus.app/client.js";
    giscusContainer.async = true;
    giscusContainer.setAttribute("crossOrigin", "anonymous");
    giscusContainer.setAttribute("data-repo", "TinySnow/TinySnow.github.io");
    giscusContainer.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzNTAxOTA3Mjc=");
    giscusContainer.setAttribute("data-category", "Announcements");
    giscusContainer.setAttribute("data-category-id", "DIC_kwDOFN98h84CTDFJ");
    giscusContainer.setAttribute("data-mapping", "specific");
    // giscusContainer.setAttribute("data-term", pagePath);
    giscusContainer.setAttribute("data-reactions-enabled", "1");
    giscusContainer.setAttribute("data-emit-metadata", "0");
    giscusContainer.setAttribute("data-input-position", "top");
    giscusContainer.setAttribute("data-theme", theme);
    giscusContainer.setAttribute("data-lang", lang);
    // 预先加载评论会更好，这样用户读到那边时，评论就加载好了
    giscusContainer.setAttribute("data-loading", "lazy");
    document.getElementById("giscus-container").appendChild(giscusContainer);

};

window.addEventListener('load', initAll);