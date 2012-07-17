var socket;

$(function() {
    socket = io.connect("http://" + window.location.hostname + ':7890')
    socket.on('extradata', function(extradata) {
        $.each(extradata, function(key, value) {
            $('.data tbody').append('<tr><td>'+key+'</td><td>'+value+'</td></tr>')
        });
    });
});

var sendInfo = function() {
    var data = {};
    data.resolution = window.screen.width + "x" + window.screen.height;
    data.userAgent = window.navigator.userAgent;
    data.os = ''
    if (data.userAgent.indexOf('NT 5.1') > -1) {
        data.os = 'Windows XP'
    } else if (data.userAgent.indexOf('NT 6.0') > -1) {
        data.os = 'Windows Vista'
    } else if  (data.userAgent.indexOf('NT 6.1') > -1) {
        data.os = 'Windows 7'
    }

    $.each(data, function(key, value) {
        $('.data tbody').append('<tr><td>'+key+'</td><td>'+value+'</td></tr>')
    });

    socket.emit('data', data);
}

var getTime = function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return hours + ":" + minutes + ":" + seconds
}

var viewInfo = function(element) {
    socket.on('data', function(data) {
        var div = $('<div><table class="table table-bordered">\
                    <tr class="header">\
                      <th>Nøkkel</th>\
                      <th>Verdi</th>\
                    </tr></table></div>');
        div.addClass("info-bolk");
        $.each(data, function(key, value) {
            div.find('table').append('<tr><td>'+key+'</td><td>'+value+'</td></tr>')
        });
        div.prepend("<strong>Mottatt " + getTime() +"</strong>");
        div.css("background-color")
        $('.data').prepend(div);
        div.effect("highlight", {}, 3000);
    });
}