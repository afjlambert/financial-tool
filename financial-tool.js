(function(){
    "use strict";

    var loadTool = function() {
        var options = {
            inleg: 10000,
            rendement: 7,
            inlegpermaand: 500,
            investeringsduur: 20,
            wachtmetinstappen: 10
        };
        var YEARINMILLI = 1000 * 60 * 60 * 24 * 365;
        var MONTHINMILLI = YEARINMILLI / 12;
        var WEEKINMILLI = YEARINMILLI / 52;
        var DAGINMILLI = YEARINMILLI / 365;
        var interval = 0;
        var tool = $('.tool');

        var st = document.createElement('style');
        st.innerHTML = '.ui-slider-handle.ui-state-default { background-color:#c00 !important; }' +
            '.ui-dialog .ui-dialog-titlebar-close { display:none; }' +
            '.tool .oak3 {position:absolute; width:1px; height:1px; overflow:hidden; margin:0;padding:0}';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(st, s);

        /* functions */

        var animateTag = function() {
            $('.ui-dialog').animate({
                'left': '+=30px'
            }, 1000, function() {
                $('.ui-dialog').animate({
                    'left': '-=30px'
                }, 'slow', animateTag);
            });
        };

        var format_currency = function(val) {
            val = Math.round(val).toString();
            var len = val.length;
            if (len > 3) val = (len > 6 ? (val.substring(len - 9, len - 6) + '.') : '') + val.substring(len - 6, len - 3) + '.' + val.substring(len - 3, len);
            return '&euro; ' + val + ',-';
        };

        var format_percentage = function(val) {
            val = val.toString().replace('.', ',');
            return (val.indexOf(',') == -1 ? val + ',0' : val) + '%';
        };

        var updateGraph = function(firstRun) {
            if (!firstRun) {
                $('.ui-dialog').fadeOut();
                clearInterval(interval);
                $.cookie('hideTooltip', 'true');
            }
            var now = new Date();
            var till = new Date(now.getTime() + (options.investeringsduur) * YEARINMILLI);
            var wait = new Date(now.getTime() + (options.wachtmetinstappen) * YEARINMILLI);

            var result = options.inleg + options.inlegpermaand;
            var waitresult = result;
            var rendementperjaar = (options.rendement + 100) / 100;
            var rendementpermaand = Math.pow(rendementperjaar, 1 / 12) - 1;
            var rendementperweek = Math.pow(rendementperjaar, 1 / 52) - 1;
            var rendementperdag = Math.pow(rendementperjaar, 1 / 365) - 1;
            for (var i = now.getTime(); i < till.getTime(); i += DAGINMILLI) {
                result = ((options.inlegpermaand * 12) / 365 + result) * (1 + rendementperdag);
                if (i > wait.getTime()) waitresult = ((options.inlegpermaand * 12) / 365 + waitresult) * (1 + rendementperdag);
            }
            $('.resultaat', tool).html('<p>Als je <b>morgen</b> begint met beleggen heb je over ' + options.investeringsduur + ' jaar ' + format_currency(Math.round(result)) + '.</p> ' +
                '<p>Als je over <b>' + options.wachtmetinstappen + ' jaar</b> begint met beleggen heb je over ' + options.investeringsduur + ' jaar ' + format_currency(Math.round(waitresult)) + '</p>' +
                '<p><b>Wachten met beleggen</b> kost je <span class="diff">' + format_currency((Math.round(result) - Math.round(waitresult))) + '</span></p>');
        };

        /* start the tool */

        updateGraph(true);

        $('.dialog', tool).dialog({
            'draggable': false,
            'buttons': [],
            'title': 'Beweeg de sliders',
            'position': {
                'my': 'left top',
                'at': '50% bottom',
                'of': $('.inleg_slider', tool)
            }
        });

        $('.inleg_slider', tool).slider({
            range: 'min',
            value: options.inleg,
            step: 200,
            min: 0,
            max: 100000,
            slide: function(event, ui) {
                $('.inleg').html(format_currency(ui.value));
                options.inleg = ui.value;
                updateGraph();
            },
            change: function(event, ui) {
                $('.inleg').html(format_currency(ui.value));
                options.inleg = ui.value;
                updateGraph(true);
            }
        });
        $('.rendement_slider', tool).slider({
            range: 'min',
            value: options.rendement,
            step: 0.1,
            min: 1,
            max: 15,
            slide: function(event, ui) {
                $('.rendement').html(format_percentage(ui.value));
                options.rendement = ui.value;
                updateGraph();
            },
            change: function(event, ui) {
                $('.rendement').html(format_percentage(ui.value));
                options.rendement = ui.value;
                updateGraph(true);
            }
        });
        $('.inlegpermaand_slider', tool).slider({
            range: 'min',
            value: options.inlegpermaand,
            step: 10,
            min: 0,
            max: 1000,
            slide: function(event, ui) {
                $('.inlegpermaand').html(format_currency(ui.value));
                options.inlegpermaand = ui.value;
                updateGraph();
            },
            change: function(event, ui) {
                $('.inlegpermaand').html(format_currency(ui.value));
                options.inlegpermaand = ui.value;
                updateGraph(true);
            }
        });
        $('.investeringsduur_slider', tool).slider({
            range: 'min',
            value: options.investeringsduur,
            step: 1,
            min: 1,
            max: 40,
            slide: function(event, ui) {
                $('.investeringsduur').html(ui.value + ' jaar');
                options.investeringsduur = ui.value;
                updateGraph();
            },
            change: function(event, ui) {
                $('.investeringsduur').html(ui.value + ' jaar');
                options.investeringsduur = ui.value;
                updateGraph(true);
            }
        });
        $('.wachtmetinstappen_slider', tool).slider({
            range: 'min',
            value: options.wachtmetinstappen,
            step: 1,
            min: 1,
            max: 40,
            slide: function(event, ui) {
                $('.wachtmetinstappen').html(ui.value + ' jaar');
                options.wachtmetinstappen = ui.value;
                updateGraph();
            },
            change: function(event, ui) {
                $('.wachtmetinstappen').html(ui.value + ' jaar');
                options.wachtmetinstappen = ui.value;
                updateGraph(true);
            }
        });
        if ($.cookie('hideTooltip') != 'true') {
            animateTag();
            var direction = 'plus';
            interval = setInterval(function() {
                direction = options.inleg >= 35000 ? 'min' : (options.inleg == 10000 ? 'plus' : direction);
                $('.inleg_slider', tool).slider('option', 'value', options.inleg + (direction == 'plus' ? 400 : -400));
            }, 20);
            setTimeout(function() {
                clearInterval(interval);
            }, 10000);
        }

    };

    jQuery.cachedScript = function(url, options) {

      // allow user to set any option except for dataType, cache, and url
      options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
      });

      // Use $.ajax() since it is more flexible than $.getScript
      // Return the jqXHR object so we can chain callbacks
      return jQuery.ajax(options);
    };
    document.write('<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/themes/blitzer/jquery-ui.css" media="all" />');
    $.cachedScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
        { success: loadTool });
})();
