/**
 * Copyright (c) 2011-2013, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 *    Redistributions of source code must retain the above copyright notice, this list of conditions and the
 *    following disclaimer.
 *
 *    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 *    the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *    Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 *    promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
package canvas;

/**
 * Describes contextual information about the current canvas client (third party app). This Object,
 * in JS literal notation, needs to ba passed on all Sfdc.canvas.client requests.
 */
@org.codehaus.jackson.annotate.JsonIgnoreProperties(ignoreUnknown=true)
public class CanvasClient
{
    private String OAuthToken;
    private String refreshToken;
    private String instanceId;
    private String targetOrigin;
    private String instanceUrl;

    /**
     * The scoped OAuth token to be used to subsequent REST calls
     */
    @org.codehaus.jackson.annotate.JsonProperty("oauthToken")
    public String getOAuthToken() {
        return OAuthToken;
    }

    /**
     * @return The scoped OAuth token to be usd for subsequent REST calls.
     */
    @org.codehaus.jackson.annotate.JsonProperty("oauthToken")
    public void setOAuthToken(String OAuthToken) {
        this.OAuthToken = OAuthToken;
    }

    /**
     * Gets the refresh token for this user that can be used to 
     * retrieve a new oauth token. The connected application must
     * have the Refresh Token oauth scope set before this will have 
     * a valid refresh token.
     */
    @org.codehaus.jackson.annotate.JsonProperty("refreshToken")
    public String getRefreshToken() {
        return refreshToken;
    }

    /**
     * Sets the refresh token for this user that can be used to 
     * retrieve a new oauth token.
     */
    @org.codehaus.jackson.annotate.JsonProperty("refreshToken")
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    /**
     * Unique identifier for this canvas app. This value will be different for each instance of a canvas app, even if
     * the same canvas app is placed on a page more than once.
     * @return Unique identifier for this canvas app
     */
    @org.codehaus.jackson.annotate.JsonProperty("instanceId")
    public String getInstanceId() {
        return instanceId;
    }

    @org.codehaus.jackson.annotate.JsonProperty("instanceId")
    public void setInstanceId(String instanceId) {
        this.instanceId = instanceId;
    }

    /**
     * @returns the origin (http://somesalesforcedomain:port) of the parent to the canvas app. This is used so
     * the in browser proxy knows where to post the request to.
     */
    @org.codehaus.jackson.annotate.JsonProperty("targetOrigin")
    public String getTargetOrigin() {
        return this.targetOrigin;
    }

    @org.codehaus.jackson.annotate.JsonProperty("targetOrigin")
    public void setTargetOrigin(String targetOrigin) {
        this.targetOrigin = targetOrigin;
    }

    /**
     * The base url for all subsequent REST call, this has the correct
     * Salesforce instance this organization is pinned to.
     */
    @org.codehaus.jackson.annotate.JsonProperty("instanceUrl")
    public String getInstanceUrl() {
        return instanceUrl;
    }

    @org.codehaus.jackson.annotate.JsonProperty("instanceUrl")
    public void setInstanceUrl(String instanceUrl) {
        this.instanceUrl = instanceUrl;
    }

}
