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

import java.util.ArrayList;
import java.util.List;

/**
 * Describes meta-data about the canvas connected app
 */
@org.codehaus.jackson.annotate.JsonIgnoreProperties(ignoreUnknown=true)
public class CanvasApplicationContext {

    private String namespace;
    private String developerName;
    private String name;
    private String canvasUrl;
    private String applicationId;
    private String version;
    private String authType;
    private String referenceId;
    private List<String> options;
    private String samlInitiationMethod;

    /**
     * Developer org's unique namespace. Can be null.
     * @return namespace
     */
    @org.codehaus.jackson.annotate.JsonProperty("namespace")
    public String getNamespace() {
        return namespace;
    }

    @org.codehaus.jackson.annotate.JsonProperty("namespace")
    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    /**
     * Developer name of the app. Note this is not the same as the application name.
     * @return developerName
     */
    @org.codehaus.jackson.annotate.JsonProperty("developerName")
    public String getDevName() {
        return developerName;
    }

    @org.codehaus.jackson.annotate.JsonProperty("developerName")
    public void setDevName(String devName) {
        this.developerName = devName;
    }

    /**
     * Name of the application.  
     * @return name
     */
    @org.codehaus.jackson.annotate.JsonProperty("name")
    public String getName() {
        return this.name;
    }

    @org.codehaus.jackson.annotate.JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Fully qualified canvas URL. Example: https://somedomain.com/canvas.html
     * @return canvasUrl
     */
    @org.codehaus.jackson.annotate.JsonProperty("canvasUrl")
    public String getCanvasUrl() {
        return canvasUrl;
    }

    @org.codehaus.jackson.annotate.JsonProperty("canvasUrl")
    public void setCanvasUrl(String canvasUrl) {
        this.canvasUrl = canvasUrl;
    }

    /**
     * The connected app's application Id.
     * @return applicationId
     */
    @org.codehaus.jackson.annotate.JsonProperty("applicationId")
    public String getApplicationId() {
        return applicationId;
    }

    @org.codehaus.jackson.annotate.JsonProperty("applicationId")
    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    /**
     * The version of the connected app
     * @return version information example: "1.0"
     */
    @org.codehaus.jackson.annotate.JsonProperty("version")
    public String getVersion() {
        return version;
    }

    @org.codehaus.jackson.annotate.JsonProperty("version")
    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * The authType of connected app. Valid values "signed_request" or "oauth".
     * @return authType
     */
    @org.codehaus.jackson.annotate.JsonProperty("authType")
    public String getAuthType() {
        return authType;
    }

    @org.codehaus.jackson.annotate.JsonProperty("authType")
    public void setAuthType(String authType) {
        this.authType = authType;
    }

    /**
     * The customer facing identifier for this canvas application.
     */
    @org.codehaus.jackson.annotate.JsonProperty("referenceId")
    public String getReferenceId() {
        return this.referenceId;
    }

    @org.codehaus.jackson.annotate.JsonProperty("referenceId")
    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    /**
     * Returns a list of options that have been selected. Example: HideHeader, HideShare
     * these are used to suppress the header and footer in the publisher.
     */
    @org.codehaus.jackson.annotate.JsonProperty("options")
    public List<String> getOptions() {
        if (null == this.options){
            this.options = new ArrayList<String>(0);
        }
        return this.options;
    }

    @org.codehaus.jackson.annotate.JsonProperty("options")
    public void setOptions(List<String> options) {
        this.options = options;
    }

    /**
     * Property indicating what SAML initiation method was selected if any.
     * @return null, "IdpInitiated" or "SpInitiated"
     */
    @org.codehaus.jackson.annotate.JsonProperty("samlInitiationMethod")
    public String getSamlInitiationMethod() {
        return samlInitiationMethod;
    }

    @org.codehaus.jackson.annotate.JsonProperty("samlInitiationMethod")
    public void setSamlInitiationMethod(String samlInitiationMethod) {
        this.samlInitiationMethod = samlInitiationMethod;
    }


    @Override
    public String toString()
    {
        return namespace+ ","+
               developerName+ ","+
               applicationId+ ","+
               version+ ","+
               authType+ ","+
               referenceId + "," +
               canvasUrl + "," +
               samlInitiationMethod;
    }
}
