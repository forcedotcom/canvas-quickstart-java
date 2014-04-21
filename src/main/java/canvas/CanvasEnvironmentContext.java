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

import java.util.HashMap;
import java.util.Map;

/**
 * Environmental information about the canvas application.
 */
@org.codehaus.jackson.annotate.JsonIgnoreProperties(ignoreUnknown=true)
public class CanvasEnvironmentContext {

    private String locationUrl;
    private String displayLocation;
    private String sublocation;
    private String uiTheme;
    private Dimensions dimensions;
    private SystemVersion version;
    private Map<String,Object> parameters;
    private Map<String,Object> record;

    /**
     * Returns the url of the current location.
     */
    @org.codehaus.jackson.annotate.JsonProperty("locationUrl")
    public String getLocationUrl() {
        return this.locationUrl;
    }

    @org.codehaus.jackson.annotate.JsonProperty("locationUrl")
    public void setLocationUrl(String referrerUrl) {
        this.locationUrl = referrerUrl;
    }

    /**
     * Returns the location where the app is being displayed. Valid locations are selected when
     * the app is created.
     */
    @org.codehaus.jackson.annotate.JsonProperty("displayLocation")
    public String getDisplayLocation() {
        return displayLocation;
    }

    @org.codehaus.jackson.annotate.JsonProperty("displayLocation")
    public void setDisplayLocation(String displayLocation) {
        this.displayLocation = displayLocation;
    }

    /**
     * Returns the sublocation where the app is being displayed. Usually only applies to 
     * mobile devices.
     */
    @org.codehaus.jackson.annotate.JsonProperty("sublocation")
    public String getSublocation() {
        return sublocation;
    }

    @org.codehaus.jackson.annotate.JsonProperty("sublocation")
    public void setSublocation(String sublocation) {
        this.sublocation = sublocation;
    }

    /**
     * Returns the value Theme2 if the user is using the newer user interface theme of the online application, labeled
     * \u201cSalesforce.\u201d Returns Theme1 if the user is using the older user interface theme, labeled
     * \u201cSalesforce Classic.\u201d
     * 
     * @see common.html.styles.UiSkin
     */
    @org.codehaus.jackson.annotate.JsonProperty("uiTheme")
    public String getUiTheme() {
        return this.uiTheme;
    }

    @org.codehaus.jackson.annotate.JsonProperty("uiTheme")
    public void setUiTheme(String uiTheme) {
        this.uiTheme = uiTheme;
    }

    @org.codehaus.jackson.annotate.JsonProperty("dimensions")
    public Dimensions getDimensions() {
        return this.dimensions;
    }

    @org.codehaus.jackson.annotate.JsonProperty("dimensions")
    public void setDimensions(Dimensions dimensions) {
        this.dimensions = dimensions;
    }

    @org.codehaus.jackson.annotate.JsonProperty("version")
    public SystemVersion getSystemVersion() {
        return this.version;
    }

    @org.codehaus.jackson.annotate.JsonProperty("version")
    public void setSystemVersion(SystemVersion systemVersion) {
        this.version = systemVersion;
    }

    @org.codehaus.jackson.annotate.JsonProperty("parameters")
    public Map<String, Object> getParameters() {
        if (null == this.parameters){
            this.parameters = new HashMap<String, Object>();
        }
        return this.parameters;
    }

    @org.codehaus.jackson.annotate.JsonProperty("parameters")
    public void setParameters(Map<String, Object> parameters) {
        this.parameters = parameters;
    }
    
    @org.codehaus.jackson.annotate.JsonProperty("record")
    public Map<String, Object> getRecord() {
        if (null == this.record){
            this.record = new HashMap<String, Object>();
        }
        return this.record;
    }

    @org.codehaus.jackson.annotate.JsonProperty("record")
    public void setRecord(Map<String, Object> record) {
        this.record = record;
    }

    @Override
    public String toString()
    {
        return locationUrl + ", " +
               displayLocation + ", " +
               uiTheme + "," +
               dimensions.toString() + "," + 
               getParameters().toString() + "," +
               version.toString();
    }

    @org.codehaus.jackson.annotate.JsonIgnoreProperties(ignoreUnknown=true)
    public static class Dimensions{
        /**
         * The width of the iframe
         */
        private String width;
        /**
         * The height of the iframe.
         */
        private String height;

        /**
         * The max width of the iframe
         */
        private String maxWidth;
        /**
         * The max height of the iframe.
         */
        private String maxHeight;

        /**
         * The width of the iframe's container element.
         * For example, the div element's HTMLElement.clientWidth.
         */
        private String clientWidth;
        /**
         * The height of the iframe's container element.
         * For example, the div element's HTMLElement.clientHeight.
         */
        private String clientHeight;


        @org.codehaus.jackson.annotate.JsonProperty("width")
        public String getWidth() {
            return this.width;
        }
        @org.codehaus.jackson.annotate.JsonProperty("width")
        public void setWidth(String width) {
            this.width = width;
        }

        @org.codehaus.jackson.annotate.JsonProperty("height")
        public String getHeight() {
            return this.height;
        }
        @org.codehaus.jackson.annotate.JsonProperty("height")
        public void setHeight(String height) {
            this.height = height;
        }

        @org.codehaus.jackson.annotate.JsonProperty("maxWidth")
        public String getMaxWidth() {
            return maxWidth;
        }

        @org.codehaus.jackson.annotate.JsonProperty("maxWidth")
        public void setMaxWidth(String maxWidth) {
            this.maxWidth = maxWidth;
        }

        @org.codehaus.jackson.annotate.JsonProperty("maxHeight")
        public String getMaxHeight() {
            return maxHeight;
        }

        @org.codehaus.jackson.annotate.JsonProperty("maxHeight")
        public void setMaxHeight(String maxHeight) {
            this.maxHeight = maxHeight;
        }

        @org.codehaus.jackson.annotate.JsonProperty("clientWidth")
        public String getClientWidth() {
            return clientWidth;
        }

        @org.codehaus.jackson.annotate.JsonProperty("clientWidth")
        public void setClientWidth(String clientWidth) {
            this.clientWidth = clientWidth;
        }

        @org.codehaus.jackson.annotate.JsonProperty("clientHeight")
        public String getClientHeight() {
            return clientHeight;
        }

        @org.codehaus.jackson.annotate.JsonProperty("clientHeight")
        public void setClientHeight(String clientHeight) {
            this.clientHeight = clientHeight;
        }

        @Override
        public String toString(){
            return String.format("(w:%s,h:%s,mw:%s,mh:%s,cw:%s,ch:%s)",width,height,maxWidth,maxHeight,clientWidth,clientHeight);
        }
    }
    
    @org.codehaus.jackson.annotate.JsonIgnoreProperties(ignoreUnknown=true)
    public static class SystemVersion{
        
        private String api;
        private String season;
        
        // Needs default ctor for Jackson to construct.
        public SystemVersion(){
        }

        @org.codehaus.jackson.annotate.JsonProperty("api")
        public String getApiVersion() {
            return this.api;
        }

        @org.codehaus.jackson.annotate.JsonProperty("api")
        public void setApiVersion(String apiVersion) {
            this.api = apiVersion;
        }
        
        @org.codehaus.jackson.annotate.JsonProperty("season")
        public String getSeason() {
            return this.season;
        }
        
        @org.codehaus.jackson.annotate.JsonProperty("season")
        public void setSeason(String season) {
            this.season = season;
        }
        
        @Override
        public String toString(){
            return String.format("%s - %s",api,season);
        }
    }
}
