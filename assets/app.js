
var isAdvanced = false;
var lang = "en";
var browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);

// Cookies
if (Cookies.get('showAdvanced')) {
    isAdvanced = Cookies.get('showAdvanced') == "true" ? true : false;
    $('#ShowAdvanced').prop('checked', isAdvanced);
};

if (Cookies.get('language')) {
    lang = Cookies.get('language');
}
else {
    $.getJSON("assets/commands.json", function (json) {
        for (key in json.settings.languages) {
            if (key == browserLang) {
                lang = browserLang;
            }
        }
    });
}

// init isotope
var qsRegex;
var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    filter: function () {
        return qsRegex ? $(this).attr('keywords').match(qsRegex) : true;
    }
});

refreshList();
var test;

function refreshList() {
    // clear grid first
    jQuery('.grid').html('');

    $grid.isotope('reloadItems')

    // read json data
    $.getJSON("assets/commands.json", function (json) {
        test = json;
        // gui localization
        $(".quicksearch").attr("placeholder", json.settings.search[hasTranslation(json.settings.search[lang])]).focus();

        $(".advanced-label").text(json.settings.advancedCommands[hasTranslation(json.settings.advancedCommands[lang])]);
        $(".settings-label").text(json.settings.settings[hasTranslation(json.settings.advancedCommands[lang])]);

        checkGUIFonts();

        jQuery('.languages').html('');
        for (key in json.settings.languages) {
            if (json.settings.languages.hasOwnProperty(key)) {
                var value = json.settings.languages[key];
                var checkedVal = lang == key ? "checked='checked'" : "";

                var $language = $(
                    "<label class='checkbox'>" + value +
                    "<input type='radio' name='lang' value='" + key + "' " + checkedVal + ">" +
                    "<span class='checkmark'></span>" +
                    "</label>"
                );

                $(".languages").append($language)
            }
        }

        $('input[name="lang"]').change(function () {
            lang = $('input[name=lang]:checked').val();
            Cookies.set('language', lang);

            refreshList();
        });

        console.log(json.commands)
        console.log(Object.keys(json.commands))
        var commandList = Object.keys(json.commands);

        for (let index = 0; index < commandList.length; index++) {
            var command = json.commands[commandList[index]];
            console.log(command)

            if (command.advanced == true && isAdvanced || command.advanced == false) {
                var $item = $(
                    "<div class='grid-item " + command.type + "' keywords='" + command.keywords + "'>" +
                    "<p class='title' onclick='copyLink(\"" + commandList[index] + "\")'>" + commandList[index] + "</p>" +
                    "<p class='category' " + checkFont() + ">" + command.category[hasTranslation(command.category[lang])] + "</p>" +
                    "<p class='main-desc' " + checkFont() + ">" + command.desc[hasTranslation(command.desc[lang])] + "</p>" +
                    "<p class='options-title' " + checkFont() + ">" + json.settings.options[lang] + ":</p>");

                // command options
                for (j = 0; j < command.options.length; j++) {
                    // if command option is advanced check ShowAdvanced
                    if (command.options[j].advanced == true && isAdvanced || command.options[j].advanced == false) {
                        $item.append("<p class='code'>" + command.options[j].code + "</p>");
                        $item.append("<p class='desc' " + checkFont() + ">" + command.options[j].desc[hasTranslation(command.options[j].desc[lang])] + "</p>");
                    }
                };

                // git-scm link for more info
                $item.append("<a href='" + command.url + "' " + checkFont() + ">(" + json.settings.readMore[hasTranslation(json.settings.readMore[lang])] + ")</a></div>");
                $grid.append($item)
                    .isotope('appended', $item);
            }
        }
    });

    $grid.isotope('updateSortData').isotope();
    $grid.isotope('reloadItems')
}

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
        if (timeout) {
            clearTimeout(timeout);
        }
        function delayed() {
            fn();
            timeout = null;
        }
        timeout = setTimeout(delayed, threshold || 100);
    }
}

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    $grid.isotope();
}, 200));

function hasTranslation(value) {
    return !value || value == undefined || value == "" || value.length == 0 ? "en" : lang;
}

function checkFont() {
    if (lang == "kli") {
        return "style='font-family: kli; font-size:20px;'";
    }
    else
        return "";
}

function checkGUIFonts() {
    if (lang == "kli") {
        $(".quicksearch").css("font-family", lang);
        $(".advanced-label").css("font-family", lang);
        $(".settings-label").css("font-family", lang);
    }
    else {
        $(".quicksearch").css("font-family", "Fira Sans");
        $(".advanced-label").css("font-family", "Fira Sans");
        $(".settings-label").css("font-family", "Fira Sans");
    }
}

$(".dropdown").hover(function () {
    $("#overlay").fadeIn("fast", function () { });
});

$("#overlay").hover(function () {
    $("#overlay").fadeOut("fast", function () { });
});

$('#ShowAdvanced').change(function () {
    isAdvanced = $('#ShowAdvanced').prop('checked');
    Cookies.set('showAdvanced', isAdvanced);
    refreshList();
});


function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function copyLink(value) {
    var link = "gitcheats.com/?c=" + value

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(link).select();
    document.execCommand("copy");
    $temp.remove();

    alert(value.charAt(0).toUpperCase() + value.slice(1) + " Link Copied!");
}

if (getURLParameter('c') != null) {
    isAdvanced = $('#ShowAdvanced').prop('checked', true);
    Cookies.set('showAdvanced', true);

    $('.quicksearch').focus();
    $('.quicksearch').val(getURLParameter('c'));

    qsRegex = new RegExp($quicksearch.val(), 'gi');
}