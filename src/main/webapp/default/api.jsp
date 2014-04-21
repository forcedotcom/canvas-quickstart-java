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
<script>
  Sfdc.canvas(function() {
      chatterTalk.init(sr, "chatter-submit", "speech-input-field", function(data) {
          Sfdc.canvas.byId('status').innerHTML = data.statusText;
          Sfdc.canvas.byId("speech-input-field").value = "";
      });
  });
</script>

<p>
With the Force.com Canvas software development toolkit, working with the Salesforce.com public
Api is easy.
</p> 
<p>
For example, you can interact natively with the Chatter Api to create posts and work directly 
with the feed.
</p>

<div id="canvas-chatter">
  <table width="100%">
    <tr>
      <td width="20%"><b>Post to Chatter:&nbsp</b></td>
      <td width="50%"><input id="speech-input-field" type="text" x-webkit-speech/></td>
      <td width="5%"><button id="chatter-submit" type="submit"/></td>
      <td width="10%"><span id="status" style="color:green"></span></td>
    </tr>
  </table>
</div>
