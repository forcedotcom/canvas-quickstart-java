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
<p>
Force.com Canvas delivers user context information directly to your application, complete
with a scoped authentication token to allow your application to communicate with Salesforce.com.
</p>
<p>
Below is a sample of that information:
</p>
<table border="0" width="100%">
    <tr>
      <td width="30%"><b>First Name: </b></td>
      <td><span id='firstname'>${canvasRequest.context.userContext.firstName}</span></td>
    </tr>
    <tr>
      <td><b>Last Name: </b></td>
      <td><span id='lastname'>${canvasRequest.context.userContext.lastName}</span></td>
    </tr>
    <tr>
      <td><b>Username: </b></td>
      <td><span id='username'>${canvasRequest.context.userContext.userName}</span></td>
    </tr>
    <tr>
      <td><b>Email Address: </b></td>
      <td><span id='email'>${canvasRequest.context.userContext.email}</span></td>
    </tr>
    <tr>
      <td><b>Company: </b></td>
      <td><span id='company'>${canvasRequest.context.organizationContext.name}</span></td>
    </tr>
    <c:if test="${!empty canvasRequest.context.environmentContext.record.Id}" >
      <tr>
        <td colspan="2">You are currently viewing <b>${canvasRequest.context.environmentContext.record.attributes.type} ${canvasRequest.context.environmentContext.record.Id}</b></td>
      </tr>
    </c:if>
    
</table>
