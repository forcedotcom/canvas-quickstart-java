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
<%@taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Force.com Canvas Java Quick Start</title>
        <link rel="stylesheet" type="text/css" href="/Publisher/publisher${ua.device.mobile ? '-mobile':'-desktop'}.css"/>
        <script type="text/javascript" src="/scripts/json2.js"></script>
        <script type="text/javascript" src="/sdk/js/canvas-all.js"></script>
        <script type="text/javascript" src="/Publisher/publisher.js"></script>
        <script>
            if (self === top) { alert("This canvas app must be included within an iframe"); }

            Sfdc.canvas(function() {
                var sr = JSON.parse('${canvasRequestJson}');
                myPublisher.init(sr, ${ua.device.mobile});
                var handlers = myPublisher.handlers();
                Sfdc.canvas.client.subscribe(sr.client, handlers.subscriptions);
                myPublisher.updateContent();
            });
        </script>
    </head>
    <body>
    <%--<div id="publisher" style="height:${canvasRequest.context.environmentContext.dimensions.clientHeight}">--%>
    <div id="publisher">
        <div id="publisher-content">
            <div id="publisher-canvas-content">

                <c:if test="${!ua.device.mobile}" >
                <table width='100%'>
                    <tr>
                        <td><b>Name: </b><span id='name'></span></td>
                        <td><b>Location: </b><span id='location'></span></td>
                        <td><b>Subject: </b><span id='subject-type'></span></td>
                        <td><b>Header: </b><span id='header-enabled'></span></td>
                        <td><b>Share: </b><span id='share-enabled'></span></td>
                    </tr>
                </table>
                </c:if>

                <label class='left-label' for='events'>Events:</label>
                <span class="right-input"><input id='events' class="input" type='text' readonly/></span>

                <label for='auxText'>Aux Text:</label>
                <input id='auxText' class='input' type='text' value='Some Text'/>
                <label for='description'>Description:</label>
                <textarea id='description' class='input' onmouseup='myPublisher.resize()'></textarea>
                <label for='parameters'>Parameters:</label>
                <textarea id='parameters' class='input' onmouseup='myPublisher.resize()'>{"any":"valid","json":"object"}</textarea>

                <span class="input-grouping">
                    <label for='thumbnail'>Thumbnail:</label>
                    <select id='thumbnail' class="select input input-iphone" onchange='myPublisher.selectThumbnail(this.value)'>
                    <option value="none">None</option>
                    <option value="/images/canvaslogo.png">Canvas Logo</option>
                    <option value="/images/salesforce.png">Salesforce</option>
                </select>
                </span>
                <span class="input-grouping">
                    <label for='height'>Height:</label>
                    <input id='height' class='input input-iphone' type='text' value="100px"/>
                </span>
                <span class="input-grouping">
                    <label for='title'>Title:</label>
                    <input id='title' class='input input-iphone' type='text' value="Activate Canvas"/>
                </span>
                <br/>
                <span class="radio-grouping"><input id="textPost" class='postType' name='postType' type='radio' value='Text' onclick='myPublisher.selectPostType(this.value)'/><label for='textPost'>Text Post</label></span>
                <span class="radio-grouping"><input id="linkPost" class='postType' name='postType' type='radio' value='Link' onclick='myPublisher.selectPostType(this.value)'/><label for='linkPost'>Link Post</label></span>
                <span class="radio-grouping"><input id="canvasPost" class='postType' name='postType' type='radio' value='Canvas' onclick='myPublisher.selectPostType(this.value)'/><label for='canvasPost'>Canvas Post</label></span>
            </div>
        </div>
    </div>
    </body>
 </html>
