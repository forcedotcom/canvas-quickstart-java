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

<%@ page import="canvas.SignedRequest" %>
<%@ page import="java.util.Map" %>
<%
    // Pull the signed request out of the request body and verify/decode it.
    Map<String, String[]> parameters = request.getParameterMap();
    String[] signedRequest = parameters.get("signed_request");
    if (signedRequest == null) {%>
        This App must be invoked via a signed request!<%
        return;
    }
    String yourConsumerSecret=System.getenv("CANVAS_CONSUMER_SECRET");
    String signedRequestJson = SignedRequest.verifyAndDecodeAsJson(signedRequest[0], yourConsumerSecret);
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Force.com Canvas Java Quick Start</title>

        <link rel="stylesheet" type="text/css" href="/sdk/css/canvas.css" />

        <script type="text/javascript" src="/sdk/js/canvas-all.js"></script>
        <script type="text/javascript" src="/scripts/json2.js"></script>
        <script type="text/javascript" src="/scripts/chatter-talk.js"></script>

        <script>
            if (self === top) {
                // Not in Iframe
                alert("This canvas app must be included within an iframe");
            }

            Sfdc.canvas(function() {
                var sr = JSON.parse('<%=signedRequestJson%>');
                var photoUri = sr.context.user.profileThumbnailUrl +  "?oauth_token=" + sr.client.oauthToken;
                /**
                 * Check if we are in sites/communities.  If so, derive the url accordingly.
                 */
                var isSites=null != sr.context.user.networkId;
                var siteHost = isSites ? sr.context.user.siteUrl : sr.client.instanceUrl;
                if (siteHost.lastIndexOf("/") == siteHost.length-1){
                	siteHost = siteHost.substring(0,siteHost.length-1);
                }
                Sfdc.canvas.byId('fullname').innerHTML = sr.context.user.fullName;
                Sfdc.canvas.byId('profile').src = (photoUri.indexOf("http")==0 ? "" :siteHost) + photoUri;
                Sfdc.canvas.byId('firstname').innerHTML = sr.context.user.firstName;
                Sfdc.canvas.byId('lastname').innerHTML = sr.context.user.lastName;
                Sfdc.canvas.byId('username').innerHTML = sr.context.user.userName;
                Sfdc.canvas.byId('email').innerHTML = sr.context.user.email;
                Sfdc.canvas.byId('company').innerHTML = sr.context.organization.name;

                chatterTalk.init(sr, "chatter-submit", "speech-input-field", function(data) {
                    Sfdc.canvas.byId('status').innerHTML = data.statusText;
                    Sfdc.canvas.byId("speech-input-field").value = "";
                });
            });

        </script>
    </head>
    <body>
    <div id="page">
        <div id="content">
            <div id="header">
                <h1 >Hello <span id='fullname'></span>!</h1>
                <h2>Welcome to the Force.com Canvas Java Quick Start Template!</h2>
            </div>

            <div id="canvas-content">
                <h1>Canvas Request</h1>
                <h2>Below is some information received in the Canvas Request:</h2>
                <div id="canvas-request">
                    <table border="0" width="100%">
                        <tr>
                            <td></td>
                            <td><b>First Name: </b><span id='firstname'></span></td>
                            <td><b>Last Name: </b><span id='lastname'></span></td>
                        </tr>
                        <tr>
                            <td><img id='profile' border="0" src="" /></td>
                            <td><b>Username: </b><span id='username'></span></td>
                            <td colspan="2"><b>Email Address: </b><span id='email'></span></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colspan="3"><b>Company: </b><span id='company'></span></td>
                        </tr>
                    </table>
                </div>
                <div id="canvas-chatter">
                    <table border="0" width="100%">
                        <tr>
                            <td width="15%"><b>Post to Chatter:&nbsp</b></td>
                            <td width="65%"><input id="speech-input-field" type="text" x-webkit-speech/></td>
                            <td width="6%"><button id="chatter-submit" type="submit"/></td>
                            <td width="10%"><span id="status" style="color:green"></span></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div id="footercont">
            <div id="footerleft">
                <p>Powered By: <a title="Heroku" href="#" onclick="window.top.location.href='http://www.heroku.com'"><strong>Heroku</strong></a></p>
            </div>
            <div id="footerright">
                <p>Salesforce: <a title="Safe Harbor" href="http://www.salesforce.com/company/investor/safe_harbor.jsp"><strong>SafeHarbor</strong></a></p>
            </div>
        </div>
    </div>
    </body>
 </html>
