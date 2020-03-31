// ==UserScript==
// @name         Discord Slide Guilds
// @version      0.0.32
// @namespace    https://raw.githubusercontent.com/danamw/discordweb/master/DiscordSlideGuilds.user.js
// @updateURL    https://raw.githubusercontent.com/danamw/discordweb/master/DiscordSlideGuilds.user.js
// @description  Slides the channel, guildes and Member lists in and out on hover.
// @author       Dana Meli
// @author       Kosshi (Author of the betterdiscord version)
// @icon         https://danamw.github.io/img/eyeball128.png
// @include      /https?://discordapp\.com/channels/*/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */

var injCSS = ` /* CSS STUFF */
div[class^=title][class*="container"] {
   z-index: 0;
}
body.reveal nav[class*="wrapper"][class*="guilds"] div>div[class*="scrollerWrapPolyfill"],
body.reveal nav[class*="wrapper"][class*="guilds"] {
    position: fixed;
    height: 100%;
    width: 70px;
    max-width: 70px;
    z-index: 5;
    left: -70px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.reveal div[class^="sidebar"] {
    position: fixed;
    height: 100%;
    left: -70px;
    width: 240px;
    z-index: 4;
    left: -240px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.reveal div[class*="base"] {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.disclose div[class^="membersWrap"] {
    position: fixed;
    height: 100%;
    width: 240px;
    z-index: 5;
    right: -240px;
    -moz-transition: right ease-in-out 300ms;
    -webkit-transition: right ease-in-out 300ms;
    transition: right ease-in-out 300ms;
}
body.mouse-active nav[class*="wrapper"][class*="guilds"] div>div[class*="scrollerWrapPolyfill"],
body.mouse-active nav[class*="wrapper"][class*="guilds"] {
    position: fixed;
    left: 0;
    height: 100%;
    z-index: 5;
    width: 70px;
    max-width: 70px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.mouse-active div[class^="sidebar"] {
    position: fixed;
    left: 70px;
    height: 100%;
    z-index: 4;
    width: 240px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.mouse-active div[class*="base"] {
    position: fixed;
    height: 100%;
    left: 70px;
    width: initial;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.mouse-moving div[class^="membersWrap"] {
    position: fixed;
    right: 0px;
    height: 100%;
    z-index: 5;
    width: 240px;
    -moz-transition: right ease-in-out 300ms;
    -webkit-transition: right ease-in-out 300ms;
    transition: right ease-in-out 300ms;
}

body.reveal.disclose div[class*="iconWrapper"][class*="clickable"][class*="selected"],
body.reveal div[class*="iconWrapper"][class*="clickable"][class*="selected"],
body.disclose div[class*="iconWrapper"][class*="clickable"][class*="selected"] {
    display: none !important;
}
body:not(.disclose):not(.mouse-moving) div[class^="membersWrap"],
body:not(.reveal):not(.mouse-active) div[class*="wrapper"][class*="guilds"]>div>div[class*="scrollerWrapPolyfill"],
body:not(.reveal):not(.mouse-active) nav[class*="wrapper"][class*="guilds"],
/*body:not(.reveal):not(.mouse-active) div[class*="base"],*/
body:not(.reveal):not(.mouse-active) div[class*="sidebar"] {
    height: 100%;
    margin-top: 0 !important;
    position: initial;
}
.btn-slide {
   background-color: var(--Mygray2) !important;
   border: 1px outset var(--Myback) !important;
   border-radius: 0px 3px 3px 0px !important;
   -moz-transition: background .2s, box-shadow .4s, border-color .2s !important;
   -webkit-transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition-timing-function: linear !important;
}
.btn-slide:hover {
   box-shadow: inset 0px 2px 4px 0px var(--MyB) !important;
   border: 1px inset var(--Myback) !important;
   background-color: var(--Myback) !important;
   border-radius: 3px !important;
   -moz-transition: background .2s, box-shadow .4s, border-color .2s !important;
   -webkit-transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition-timing-function: linear !important;
}
`;

// ==UserScript==
// @name         Discord Slide Guilds
// @version      0.0.31
// @namespace    https://raw.githubusercontent.com/danamw/discordweb/master/DiscordSlideGuilds.user.js
// @updateURL    https://raw.githubusercontent.com/danamw/discordweb/master/DiscordSlideGuilds.user.js
// @description  Slides the channel, guildes and Member lists in and out on hover.
// @author       Dana Meli
// @author       Kosshi (Author of the betterdiscord version)
// @icon         https://danamw.github.io/img/eyeball128.png
// @include      /https?://discordapp\.com/channels/*/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */

var injCSS = ` /* CSS STUFF */
div[class^=title][class*="container"] {
   z-index: 0;
}
body.reveal nav[class*="wrapper"][class*="guilds"] div>div[class*="scrollerWrapPolyfill"],
body.reveal nav[class*="wrapper"][class*="guilds"] {
    position: fixed;
    height: 100%;
    width: 70px;
    max-width: 70px;
    z-index: 5;
    left: -70px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.reveal div[class^="sidebar"] {
    position: fixed;
    height: 100%;
    left: -70px;
    width: 240px;
    z-index: 4;
    left: -240px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.reveal div[class*="base"] {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.disclose div[class^="membersWrap"] {
    position: fixed;
    height: 100%;
    width: 240px;
    z-index: 5;
    right: -240px;
    -moz-transition: right ease-in-out 300ms;
    -webkit-transition: right ease-in-out 300ms;
    transition: right ease-in-out 300ms;
}
body.mouse-active nav[class*="wrapper"][class*="guilds"] div>div[class*="scrollerWrapPolyfill"],
body.mouse-active nav[class*="wrapper"][class*="guilds"] {
    position: fixed;
    left: 0;
    height: 100%;
    z-index: 5;
    width: 70px;
    max-width: 70px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.mouse-active div[class^="sidebar"] {
    position: fixed;
    left: 70px;
    height: 100%;
    z-index: 4;
    width: 240px;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.mouse-active div[class*="base"] {
    position: fixed;
    height: 100%;
    left: 70px;
    width: initial;
    -moz-transition: left ease-in-out 300ms;
    -webkit-transition: left ease-in-out 300ms;
    transition: left ease-in-out 300ms;
}
body.mouse-moving div[class^="membersWrap"] {
    position: fixed;
    right: 0px;
    height: 100%;
    z-index: 5;
    width: 240px;
    -moz-transition: right ease-in-out 300ms;
    -webkit-transition: right ease-in-out 300ms;
    transition: right ease-in-out 300ms;
}

body.reveal.disclose div[class*="iconWrapper"][class*="clickable"][class*="selected"],
body.reveal div[class*="iconWrapper"][class*="clickable"][class*="selected"],
body.disclose div[class*="iconWrapper"][class*="clickable"][class*="selected"] {
    display: none !important;
}
body:not(.disclose):not(.mouse-moving) div[class^="membersWrap"],
body:not(.reveal):not(.mouse-active) div[class*="wrapper"][class*="guilds"]>div>div[class*="scrollerWrapPolyfill"],
body:not(.reveal):not(.mouse-active) nav[class*="wrapper"][class*="guilds"],
/*body:not(.reveal):not(.mouse-active) div[class*="base"],*/
body:not(.reveal):not(.mouse-active) div[class*="sidebar"] {
    height: 100%;
    margin-top: 0 !important;
    position: initial;
}
.btn-slide {
   background-color: var(--Mygray2) !important;
   border: 1px outset var(--Myback) !important;
   border-radius: 0px 3px 3px 0px !important;
   -moz-transition: background .2s, box-shadow .4s, border-color .2s !important;
   -webkit-transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition-timing-function: linear !important;
}
.btn-slide:hover {
   box-shadow: inset 0px 2px 4px 0px var(--MyB) !important;
   border: 1px inset var(--Myback) !important;
   background-color: var(--Myback) !important;
   border-radius: 3px !important;
   -moz-transition: background .2s, box-shadow .4s, border-color .2s !important;
   -webkit-transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition: background .2s, box-shadow .4s, border-color .2s !important;
   transition-timing-function: linear !important;
}
`;

function main() {
    var noBtn = $('#btn-slide').length == 0;
    if (noBtn) {
        $('div[class*="title"][class*="container"]').each(function() {
            $('<button>', {
                id: 'btn-slide',
                class: 'btn-slide',
                title: 'Slides the Guilds, channels and userlist on hover.',
                style: 'position:relative;height:28px;width:28px;margin-left:15px;color:#FFF;background-color:rgb(79, 79, 79);border:1px outset #000; background-image: url("data:image/png;base64,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")',
            }).insertAfter('h3[class*="title"][class*="base"]');
            $('<style>')
                .prop('type', 'text/css')
                .html(injCSS)
                .appendTo('head');
        });
    }
}

function blockRequest(e) {
    return {
        cancel: e.url.endsWith("/typing")
    };
}
browser.webRequest.onBeforeRequest.addListener(
    blockRequest, {
        urls: ["https://discordapp.com/api/*"]
    }, [
        "blocking"
    ]
);

$(document).on('click', '#btn-slide', (function() {
    $('body').toggleClass('reveal');
    $('body').toggleClass('disclose');
    if ($('body.reveal').length > 0) {
        $(document).on('mousemove', function(event) {
            if ($('body.reveal').length > 0 && event.pageX < 40) {
                $('body').toggleClass('mouse-active').toggleClass('reveal');
            }
            if ($('body.mouse-active').length > 0 && event.pageX > 320) {
                $('body').toggleClass('mouse-active').toggleClass('reveal');
            }
        });
        if ($('body.disclose').length > 0) {
            $(document).on('mousemove', function(event) {
                if ($('body.disclose').length > 0 && event.pageX > $(window).width() - 40) {
                    $('body').toggleClass('mouse-moving').toggleClass('disclose');
                }
                if ($('body.mouse-moving').length > 0 && event.pageX < $(window).width() - 250) {
                    $('body').toggleClass('mouse-moving').toggleClass('disclose');
                }
            });
        } else {
            $(document).off('mousemove');
        }
    }
}));

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe(document, config);
});

var config = {
    attributes: true,
    subtree: true,
};

observer.observe(document, config);

function main() {
    var noBtn = $('#btn-slide').length == 0;
    if (noBtn) {
        $('div[class*="title"][class*="container"]').each(function() {
            $('<button>', {
                id: 'btn-slide',
                class: 'btn-slide',
                title: 'Slides the Guilds, channels and userlist on hover.',
                style: 'position:relative;height:28px;width:28px;margin-left:15px;color:#FFF;background-color:rgb(79, 79, 79);border:1px outset #000; background-image: url("data:image/png;base64,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")',
            }).insertAfter('h3[class*="title"][class*="base"]');
            $('<style>')
                .prop('type', 'text/css')
                .html(injCSS)
                .appendTo('head');
        });
    }
}

$(document).on('click', '#btn-slide', (function() {
    $('body').toggleClass('reveal');
    $('body').toggleClass('disclose');

    if ($('body.reveal').length > 0) {
        $(document).on('mousemove', function(event) {
            if ($('body.reveal').length > 0 && event.pageX < 40) {
                $('body').toggleClass('mouse-active').toggleClass('reveal');
            }
            if ($('body.mouse-active').length > 0 && event.pageX > 320) {
                $('body').toggleClass('mouse-active').toggleClass('reveal');
            }
        });
        if ($('body.disclose').length > 0) {
            $(document).on('mousemove', function(event) {
                if ($('body.disclose').length > 0 && event.pageX > $(window).width() - 40) {
                    $('body').toggleClass('mouse-moving').toggleClass('disclose');
                }
                if ($('body.mouse-moving').length > 0 && event.pageX < $(window).width() - 250) {
                    $('body').toggleClass('mouse-moving').toggleClass('disclose');
                }
            });
        } else {
            $(document).off('mousemove');
        }
    }
}));

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe(document, config);
});

var config = {
    attributes: true,
    subtree: true,
};

observer.observe(document, config);