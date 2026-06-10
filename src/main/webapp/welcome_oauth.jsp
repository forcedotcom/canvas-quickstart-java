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
<%
    String consumerKey = "Enter your consumer key here";
    String callbackUrl = ("https://localhost:8443/sdk/callback.html");
    String appname = "localcanvasapp";
    String method = request.getMethod();
%>
<!DOCTYPE html>
<html>
<head>
    <title>Force.com Canvas Java Quick Start</title>
    <link rel="stylesheet" type="text/css" href="/sdk/css/canvas.css" />
</head>
<link rel="stylesheet" type="text/css" href="/sdk/css/canvas.css" />
<script type="text/javascript" src="/sdk/js/canvas-all.js"></script>
<script>
    function loginHandler(e) {

        var uri;

        if (! Sfdc.canvas.oauth.loggedin()) {
            uri = Sfdc.canvas.oauth.loginUrl();
            Sfdc.canvas.oauth.login(
                {uri : uri,
                    params: {
                        response_type : "token",
                        client_id : "<%=consumerKey%>",
                        redirect_uri : encodeURIComponent("<%=callbackUrl%>")
                    }});
        }
        else {
            Sfdc.canvas.oauth.logout();
        }
        return false;
    }
    function verifyContext(context) {
        console.log("Context : " + JSON.stringify(context));
    }

    function callback(msg) {

        var html;
        console.log("TRACE:  Begin Ajax callback");
        if (msg.status !== 200) {
            Sfdc.canvas.byId("error").innerHTML = msg.statusText;
            if (console!=undefined) {
                console.log("AJAX STATUS ERROR:  " + msg.statusText);
            }
            return;
        }
        Sfdc.canvas.byId("error").innerHTML = "";

        verifyContext(msg.payload);

        if (console!=undefined) {
            console.log("TRACE:  End Ajax callback");
        }
    }

    function getContext(e) {
        if (console!=undefined) {
            console.log("TRACE: App Name: " + "<%=appname%>");
            console.log("TRACE Consumer Key: " + "<%=consumerKey%>");
            console.log("TRACE: Begin context ajax call");
            console.log("TRACE: The parent url is: " + document.location.hash);
        }
        Sfdc.canvas.client.ctx(callback,  Sfdc.canvas.oauth.client());
        return false;
    }
    // Bootstrap the page once the DOM is ready.
    Sfdc.canvas(function() {
        if (console!=undefined) {
            console.log("BROWSER UA:  " + navigator.userAgent);
        }
        // On Ready...
        var login    = Sfdc.canvas.byId("login"),
            loggedIn = Sfdc.canvas.oauth.loggedin(),
            token = Sfdc.canvas.oauth.token();
        login.innerHTML = (loggedIn) ? "Logout" : "login";
        if (loggedIn) {
            // Only displaying part of the oauth token as it formats better.
            Sfdc.canvas.byId("oauth").innerHTML = Sfdc.canvas.oauth.token().substring(1,40) + "...";
        }
        login.onclick=loginHandler;
        getContext();
    });
</script>
<body>
<div id="page">
    <div id="content">
        <div id="header">
            <h1>Congratulations!</h1>
        </div>
        <div id="canvas-content">
            <h2>
                <br/>
                Your Heroku Java application is up and running.
                To see Force.com Canvas Framework specific functionality, please use this app in a Force.com Canvas
                enabled organization.
                <p/>If you are seeing this page inside of an app within Salesforce,
                you must be using GET (OAUTH) based authentication access method. Click login to start the OAUTH flow.

                <div>
                    method = <%= method %><br/>
                    access_token = <span id="oauth"></span>
                </div>
                <div>
                    <a id="login" href="#">Login</a><br/>
                </div>
                <div>
                    <div id="report"></div>
                    <div id="error"></div>
                </div>
            </h2>
        </div>
    </div>
    `
    <div id="footer">&nbsp;</div>
</div>
</body>
</html>
