<%--
Copyright (c) 2013, salesforce.com, inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided
that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
the following disclaimer in the documentation and/or other materials provided with the distribution.

Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
--%>
<script type="text/javascript">

if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}
var subscriptions = [];
var namespace = "${canvasRequest.context.appContext.namespace}";
var appName = "${canvasRequest.context.appContext.devName}";
var appEventName = Sfdc.canvas.isNil(namespace) ? appName : namespace+"_"+appName;

function eventHandler(eventName, payload){
	var data = Sfdc.canvas.isObject(payload) ? JSON.stringify(payload) : payload;
	writeToLog("Received '" + eventName + "': " + data);
}

function writeToLog(message){
	var data,logger = document.getElementById('event-log');
    if(logger){
        logger.value += message+'\n';
    }
}

Sfdc.canvas.onReady(function() {
	subscribe(appEventName);
});

function subscribe(eventName){
	var name,params={},streaming;
	if (eventName){
		if (eventName.startsWith("sfdc.streamingapi")){
			streaming = getStreaming(eventName);
			name = streaming.event;
			params = streaming.params;
		}
		else{
			name = eventName;
		}
		Sfdc.canvas.client.subscribe(sr.client, [{
			name: name,
			params:params,
			onData: function(payload){
				eventHandler(eventName,payload);
			},
			// This only fires when subscribing to streaming events as of Winter '14.
			onComplete: function(payload){
				if (!payload.success){
					writeToLog("** WARNING ** Unable to subscribe to event '"+eventName+"': " + payload.errorMessage);
					unsubscribe(eventName);
				}
				else{
					writeToLog("Successfully subscribed to streaming '"+eventName+"': " + JSON.stringify(payload));
				}
			}
		}]);
		if (Sfdc.canvas.indexOf(subscriptions,eventName) < 0){
			subscriptions[subscriptions.length] = eventName;
			subscriptions.sort();
		}
	}
	updateSubscriptions();
}

function fire(){
	var payload = document.getElementById('event-payload');
	if (payload){
		Sfdc.canvas.client.publish(sr.client,{
			name : appEventName,
			payload : payload.value
		});
		payload.value="";
	}
    return true;
}

function getStreaming(eventName){
	var streaming = eventName.split(":");
	return {
		event:streaming[0],
		params:streaming.length>1? {topic:streaming[1]}: null
	};


}

function unsubscribe(eventName) {
	var index,params={},streaming,name;
	if(eventName){
		if (eventName.startsWith("sfdc.streamingapi")){
			streaming = getStreaming(eventName);
			name = streaming.event;
			params = streaming.params;
		}
		else{
			name = eventName;
		}
	    Sfdc.canvas.client.unsubscribe(sr.client, {name:name,params:params});
	    index = Sfdc.canvas.indexOf(subscriptions,eventName);
	    if (index >= 0){
	    	subscriptions.splice(index,1);
	    }
	    updateSubscriptions();
	}
    return false;
}

function updateSubscriptions(){
	var subs = document.getElementById("subscriptions"),
	html="",name;
	if (subs){
		for (index in subscriptions){
			name = subscriptions[index];
			html+= "<span style='display:inline' title='" + name + "'>"+name.substring(0,25) + ((name.length > 25)?"...":"") + "</span> <a href=\"#\" onclick=\"unsubscribe('"+name+"');\">Remove</a><br/>"
		}
	}
	subs.innerHTML = html;
}

function clearLog(){
	document.getElementById('event-log').value="";
	return false;
}
</script>

<p>
Force.com Canvas supports cross-domain eventing between multiple canvas applications.  Give it a try... Type in some text and click "Fire!"
to see the event subscription in action!
</p>
<p>
You can also subscribe to custom or other Force.com Canvas events.  Enter the event name and click "Subscribe".
Streaming api event names should be in the form
<a href="#" onclick="var topic;document.getElementById('new-topic').value = (topic = window.prompt('Enter streaming API topic name to listen to?'))?'sfdc.streamingapi:/topic/'+topic:'';">sfdc.streamingapi:/topic/&lt;topic&nbsp;name&gt;</a>.
</p>
<table cellspacing="0" cellpadding="2px;" id="event-table">
    <tr>
      <td width="30%"><b>Enter event text to send:</b></td>
      <td width="55%"><span><input id="event-payload" type="text"/></span></td>
      <td width="*"><input class="event-button" onclick="fire();" type="submit" value="Fire!"></input></td>
    </tr>
    <tr>
      <td><b>Subscribe to event:</b></td>
      <td><span><input id="new-topic" type="text"/></span></td>
      <td><input class="event-button" onclick="subscribe(document.getElementById('new-topic').value);document.getElementById('new-topic').value='';" type="submit" value="Subscribe"></input></td>
    </tr>
    <tr>
      <td><b>Current subscriptions:</b></td>
      <td colspan="2"><span id="subscriptions"></span></td>
    </tr>
    <tr>
      <td><b>Event Log: </b>(<a href="#" onclick="clearLog();">Clear</a>)</td>
      <td colspan="2"><span><textarea wrap="off" rows="10" name="event-log" id="event-log" readonly="true"></textarea></span></td>
    </tr>
</table>
