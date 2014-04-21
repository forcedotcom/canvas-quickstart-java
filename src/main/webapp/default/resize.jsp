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
    function displaySize() {
        var sizes = Sfdc.canvas.client.size();
        var sizeElem = document.getElementById('dimensions');
        sizeElem.innerHTML = "Width: " + sizes.widths.pageWidth + ", Height: " + sizes.heights.pageHeight;
    }

    function adjustHeight(inc) {
        var dim = Sfdc.canvas.client.size(sr.client);
        console.log("Dim ", dim.heights.pageHeight);
        Sfdc.canvas.client.resize(sr.client, {height : dim.heights.pageHeight + inc + "px"});
        displaySize();
    }
    function adjustWidth(inc) {
        var dim = Sfdc.canvas.client.size(sr.client);
        console.log("Dim ", dim.widths.pageWidth);
        Sfdc.canvas.client.resize(sr.client, {width : dim.widths.pageWidth + inc + "px"});
        displaySize();
    }

</script>
<p>
Force.com Canvas supports dynamic and automatic resizing so you can manage the size of the Canvas application yourself,
or let Force.com Canvas do all the work.
</p> 
<p>
<a href="#" onclick="subscribe('canvas.resize');">Subscribe</a> to the resize event and see the resize event
in action on the "Events" tab.
</p>
<table>
    <tr>
        <td></td>
        <td><input type='button' value='Decrease Height' onclick='adjustHeight(-10)'/></td>
        <td></td>
    </tr>
    <tr>
        <td><input type='button' value='Decrease Width' onclick='adjustWidth(-10)'/></td>
        <td><span id='dimensions'></span></td>
        <td><input type='button' value='Increase Width' onclick='adjustWidth(10)'/></td>
    </tr>
    <tr>
        <td></td>
        <td><input type='button' value='Increase Height' onclick='adjustHeight(10)'/></td>
        <td></td>
    </tr>
</table>
