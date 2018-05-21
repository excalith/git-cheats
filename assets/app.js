
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
        for (key in json[0].languages) {
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

function refreshList() {
    // clear grid first
    jQuery('.grid').html('');

    $grid.isotope('reloadItems')

    // read json data
    $.getJSON("assets/commands.json", function (json) {
        // gui localization
        $(".quicksearch").attr("placeholder", json[0].search[hasTranslation(json[0].search[lang])]).focus();

        $(".advanced-label").text(json[0].advancedCommands[hasTranslation(json[0].advancedCommands[lang])]);
        $(".settings-label").text(json[0].settings[hasTranslation(json[0].advancedCommands[lang])]);

        checkGUIFonts();

        jQuery('.languages').html('');
        for (key in json[0].languages) {
            if (json[0].languages.hasOwnProperty(key)) {
                var value = json[0].languages[key];
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

        // commands (skip first index for ui localization)
        for (i = 1; i < json.length; i++) {
            // if command is advanced check ShowAdvanced
            if (json[i].advanced == true && isAdvanced || json[i].advanced == false) {
                var $item = $(
                    "<div class='grid-item " + json[i].type + "' keywords='" + json[i].keywords + "'>" +
                    "<p class='title'>" + json[i].title + "</p>" +
                    "<p class='category' " + checkFont() + ">" + json[i].category[hasTranslation(json[i].category[lang])] + "</p>" +
                    "<p class='main-desc' " + checkFont() + ">" + json[i].desc[hasTranslation(json[i].desc[lang])] + "</p>" +
                    "<p class='options-title' " + checkFont() + ">" + json[0].options[lang] + ":</p>");

                // command options
                for (j = 0; j < json[i].options.length; j++) {
                    // if command option is advanced check ShowAdvanced
                    if (json[i].options[j].advanced == true && isAdvanced || json[i].options[j].advanced == false) {
                        $item.append("<p class='code'>" + json[i].options[j].code + "</p>");
                        $item.append("<p class='desc' " + checkFont() + ">" + json[i].options[j].desc[hasTranslation(json[i].options[j].desc[lang])] + "</p>");
                    }
                };

                // git-scm link for more info
                $item.append("<a href='" + json[i].url + "' " + checkFont() + ">(" + json[0].readMore[hasTranslation(json[0].readMore[lang])] + ")</a></div>");
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

function checkFont()
{
    if (lang == "kli")
    {
        return "style='font-family: kli; font-size:20px;'";
    }
    else
        return "";
}

function checkGUIFonts()
{
    if (lang == "kli")
    {
        $(".quicksearch").css("font-family", lang);
        $(".advanced-label").css("font-family", lang);
        $(".settings-label").css("font-family", lang);
    }
    else
    {
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

if (getURLParameter('c') != null)
{
    isAdvanced = $('#ShowAdvanced').prop('checked', true);
    Cookies.set('showAdvanced', true);

    $('.quicksearch').focus();
    $('.quicksearch').val(getURLParameter('c'));

    qsRegex = new RegExp($quicksearch.val(), 'gi');
}
