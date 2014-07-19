<%--
Copyright (c) 2011, salesforce.com, inc.
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
<%
    if (request.getAttribute("canvasRequest") == null) {%>
        This App must be invoked via a signed request!<%
        return;
    }
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Force.com Canvas Java Quick Start</title>

        <link rel="stylesheet" type="text/css" href="/ChatterFeed/chatterfeed${ua.device.mobile ? '-mobile':''}.css"/>

        <script type="text/javascript" src="/sdk/js/canvas-all.js"></script>
        <script type="text/javascript" src="/scripts/json2.js"></script>
        <script type="text/javascript" src="/scripts/chatter-talk.js"></script>

        <script>
            if (self === top) { alert("This canvas app must be included within an iframe"); }

            Sfdc.canvas(function() {
                var sr = JSON.parse('${canvasRequestJson}');
                var photoUri = sr.context.user.profileThumbnailUrl +  "?oauth_token=" + sr.client.oauthToken;
                Sfdc.canvas.byId('profile-pic').src =  photoUri.indexOf("http")==0 ? photoUri :sr.client.instanceUrl + photoUri;
                Sfdc.canvas.byId('profile-pic').alt = sr.context.user.firstName + " " + sr.context.user.lastName;
                Sfdc.canvas.byId('parameters').innerHTML = JSON.stringify(sr.context.environment.parameters);
            });

        </script>
    </head>
    <body>
    <%--<div id="publisher" style="height:${canvasRequest.context.environmentContext.dimensions.clientHeight}">--%>
    <div id="feed">
        <div id="feed-content">
            <img id="profile-pic" src="" alt="">
            <span class="right-just"><h3>Welcome to Canvas in the Chatter Feed!</h3></span>
            <h4>With Force.com Canvas in the feed, you can:</h4>
            <ul>
                <li>Act on parameters: <span id='parameters'></span></li>
                <li>Display your 'Live' content.</li>
                <li>Use the Canvas SDK to enhance your app</li>
            </ul>
            </div>
        </div>
    </body>
 </html>
