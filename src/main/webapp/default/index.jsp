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
<html>
<!DOCTYPE html>
<html>
<head>
    <title>Force.com Canvas Java Quick Start</title>

    <link rel="stylesheet" type="text/css" href="/default/default${ua.device.mobile ? '-mobile':''}.css "/>
    <link rel="stylesheet" type="text/css" href="/default/tabs${ua.device.mobile ? '-mobile':''}.css" />

    <script type="text/javascript" src="/scripts/json2.js"></script>
    <script type="text/javascript" src="/sdk/js/canvas-all.js"></script>
    <script type="text/javascript" src="/default/tabs.js"></script>
    <script type="text/javascript" src="/scripts/chatter-talk.js"></script>

    <script>
        function resetSize(newDimensions) {
        	var options = newDimensions ? newDimensions : {};
            console.log("resize.");
            Sfdc.canvas.client.resize(sr.client,  {
            	width : options.width?options.width:"600px", 
      			height : options.height?options.height:"600px"
			});
        }

        var sr = JSON.parse('${canvasRequestJson}');
        Sfdc.canvas(function() {
            var photoUri = sr.context.user.profileThumbnailUrl +  "?oauth_token=" + sr.client.oauthToken;
            Sfdc.canvas.byId('header').style.backgroundImage =  "url('"+(photoUri.indexOf("http")==0 ? "" :sr.client.instanceUrl) + photoUri+"')";
            resetSize();
            initTabs();
        });
    </script>

</head>
<body>
    <div id="content">
        <div id="header">
            <h1>Hello <span id='fullname'>${canvasRequest.context.userContext.fullName}</span>!</h1>
            <h2>Welcome to the Force.com Canvas Java Quick Start Template!</h2>
        </div>

        <div class="tab-box">
            <a href="javascript:;" onclick="resetSize()" class="tabLink activeLink" id="context">Context</a>
            <a href="javascript:;" onclick="resetSize()" class="tabLink " id="resize">Resize</a>
            <a href="javascript:;" onclick="resetSize()" class="tabLink " id="events">Events</a>
            <a href="javascript:;" onclick="resetSize()" class="tabLink " id="scroll">Scrolling</a>
            <a href="javascript:;" onclick="resetSize()" class="tabLink " id="api">Api</a>
        </div>

        <div class="tabcontent paddingAll" id="context-1">
            <jsp:include page="context.jsp"/>
        </div>

        <div class="tabcontent paddingAll hide" id="resize-1">
            <jsp:include page="resize.jsp"/>
        </div>

        <div class="tabcontent paddingAll hide" id="events-1">
            <jsp:include page="events.jsp"/>
        </div>
        <div class="tabcontent paddingAll hide" id="scroll-1">
            <jsp:include page="scroll.jsp"/>
        </div>
        <div class="tabcontent paddingAll hide" id="api-1">
            <jsp:include page="api.jsp"/>
        </div>
        <div id="footercont">
            <div id="footerleft">
                <p>Powered By: <a title="Heroku" href="#" onclick="window.top.location.href='http://www.heroku.com'"><strong>Heroku</strong></a>
                </p>
            </div>
            <div id="footerright">
                <p>Salesforce: <a title="Safe Harbor" href="http://www.salesforce.com/company/investor/safe_harbor.jsp"><strong>SafeHarbor</strong></a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
