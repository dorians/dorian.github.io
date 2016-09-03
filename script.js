var websocket;
var apiKey = document.getElementById('api-key');
var submit = document.getElementById('submit');
var lastUpdate = document.getElementById('lastUpdate');
var messages = document.getElementById('messages');

submit.onclick = function() {
    if (websocket != null) {
        websocket.close();
    }
    
    websocket = new WebSocket('wss://stream.pushbullet.com/websocket/' + apiKey.value);
    websocket.onopen = function(e) {
        messages.innerHTML += "<p>WebSocket onopen</p>";
    }
    websocket.onmessage = function(e) {
    	var date = new Date().toLocaleString();
        lastUpdate.innerHTML = "<p>Last update: " + date + "</p>";

        var data = JSON.parse(e.data);

        if (data.type == "push" && data.push.application_name == "Phone") {
        	var title = data.push.title;
        	alert(title);
        	messages.innerHTML += "<p>" + date + ": " + title + "</p>";
        }
    }
    websocket.onerror = function(e) {
        messages.innerHTML += "<p>WebSocket onerror</p>";
    }
    websocket.onclose = function(e) {
        messages.innerHTML += "<p>WebSocket onclose</p>";
    }
}
