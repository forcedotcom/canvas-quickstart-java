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

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Force.com Canvas Java Quick Start</title>
        <link rel="stylesheet" type="text/css" href="/sdk/css/canvas.css" />
        <script type="text/javascript" src="/sdk/js/canvas-all.js"></script>
        <script type="text/javascript">
        function clickHandler(e) {
            var loginUrl,
            	consumerKey = "${consumerKey}";
            if (!Sfdc.canvas.oauth.loggedin()) {
            	// First, we retrieve the login url that is passed to the app in 
            	// the query string of the app.
                loginUrl = Sfdc.canvas.oauth.loginUrl();
            	if (Sfdc.canvas.isNil(loginUrl)){
            		alert("Unable to retrieve login url passed by the canvas framework.");
            		return false;
            	}
            	
            	// We need the consumer key to perform the oauth flow.
            	if (Sfdc.canvas.isNil(consumerKey)){
            		alert("Consumer key not specified in request.  Please provide the consumer key before trying to approve this application.");
            		return false;
            	}
            	
                // This uri is the outer parent window.
                Sfdc.canvas.oauth.login(
                        {uri : loginUrl,
                        params: {
                            response_type : "token",
                            client_id : consumerKey,
                            display : "${ua.device.mobile?'touch':'popup'}",
                            redirect_uri : encodeURIComponent("/callback")
                        }});
            }
            return false;
        }

        Sfdc.canvas(function() {
            if (!Sfdc.canvas.oauth.loggedin()) {
                var login    = Sfdc.canvas.byId("login");
                login.onclick=clickHandler;
            }
            else{
            	Sfdc.canvas.client.repost(true);
            }
        });
        </script>
    </head>
    <body>
      <div id="page">
        <div id="content">
          <div id="header">
            <h1>Application Approval Required</h1>
          </div>
          <div id="canvas-content">
              <h2>
                  <br/>
                  It appears that you have not yet approved this application for use within 
                  Salesforce.com.
                  <p/>
                  If you are seeing this message, it is because you have either not yet approved this
                  application, or an administrator has temporarily revoked the ability for this application
                  to act on your behalf. Click on the "Approve" link below to begin the approval process.
                  <p>
                  <a id="login" href="#">Approve</a>
              </h2>
          </div>
        </div>
      `
        <div id="footer">&nbsp;</div>
      </div>
    </body>
 </html>
