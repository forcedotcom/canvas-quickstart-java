// Copyright (c) 2013, salesforce.com, inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are permitted provided
// that the following conditions are met:
//
//     Redistributions of source code must retain the above copyright notice, this list of conditions and the
//     following disclaimer.
//
//     Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
//     the following disclaimer in the documentation and/or other materials provided with the distribution.
//
//     Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
//     promote products derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
// PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
// TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
(function ($$){

    var sr, mobile, postType, thumbnailUrl;

    myPublisher = {

        init : function(signedRequest, isMobile) {
            sr = signedRequest;
            mobile = isMobile;
        },

        // Auto resize the iframe to fit the current content.
        resize : function() {
            $$.client.resize(sr.client);
        },

        // Simply display incoming events in order
        logEvent : function(name) {
            var elem = $$.byId("events");
            var sep =  ($$.isNil(elem.value)) ? "" : ",";
            elem.value += sep + name
        },

        selectPostType : function(e) {
            console.log("got click", e);
            postType = e;
            // Enable the share button
            $$.client.publish(sr.client, {name : "publisher.setValidForSubmit", payload : true});
        },

        clearPostTypes : function() {
            var i, elements = $$.byClass('postType');
            for (i = 0; i < elements.length; i+=1) {
                elements[i].checked=false;
            }
        },

        canvasOptions : function(elem, option) {
            var bool = Sfdc.canvas.indexOf(sr.context.application.options, option) == -1;
            elem.innerHTML = (bool) ? "&#x2713;" : "&#x2717;";
            elem.style.color = (bool) ? "green" : "red";
        },

        updateContent : function() {
            if (!mobile) {
                $$.byId('name').innerHTML = sr.context.user.firstName + " " + sr.context.user.lastName;
                $$.byId('location').innerHTML = sr.context.environment.displayLocation;
                $$.byId('subject-type').innerHTML = null != sr.context.environment.record.attributes ? 
                		sr.context.environment.record.attributes.type : 
            			"Unknown";
                myPublisher.canvasOptions($$.byId('header-enabled'), "HideHeader");
                myPublisher.canvasOptions($$.byId('share-enabled'), "HideShare");
            }
        },

        selectThumbnail: function(e) {
            thumbnailUrl =  (e === "none") ? null :  window.location.origin + e;
            console.log("Thumbnail URL " + thumbnailUrl);
        },

        handlers : function() {

            var handlers = {
                onSetupPanel : function (payload) {
                    myPublisher.resize();   // Do I want to do this on iphone?
                    myPublisher.logEvent("setupPanel");
                },
                onShowPanel : function(payload) {
                    myPublisher.logEvent("showPanel");
                },
                onClearPanelState : function(payload) {
                    myPublisher.logEvent("clearPanelState");
                    myPublisher.clearPostTypes();
                    // Clear all the text fields and reset radio buttons
                },
                onSuccess : function() {
                    myPublisher.logEvent("success");
                },
                onFailure : function (payload) {
                    myPublisher.logEvent("failure");
                    myPublisher.clearPostTypes();
                    if (payload && payload.errors && payload.errors.message) {
                        alert("Error: " + payload.errors.message);
                    }
                },
                onGetPayload : function() {
                    myPublisher.logEvent("getPayload");
                    var p = {};
                    if (postType === 'Text') {
                        // Example of a Text Post
                        p.feedItemType = "TextPost";
                        p.auxText = $$.byId('auxText').value;
                    }
                    else if (postType === 'Link') {
                        // Example of a Link Post
                        p.feedItemType = "LinkPost";
                        p.auxText = $$.byId('auxText').value;
                        p.url = "http://www.salesforce.com";
                        p.urlName = $$.byId('title').value;
                    }
                    else if (postType === 'Canvas') {
                        // Example of a Canvas Post
                        p.feedItemType = "CanvasPost";
                        p.auxText = $$.byId('auxText').value;
                        p.namespace =  sr.context.application.namespace;
                        p.developerName =  sr.context.application.developerName;
                        p.height = $$.byId('height').value;
                        p.title = $$.byId('title').value;
                        p.description = $$.byId('description').value;
                        p.parameters = $$.byId('parameters').value;
                        p.thumbnailUrl = thumbnailUrl;
                    }
                    $$.client.publish(sr.client, {name : 'publisher.setPayload', payload : p});
                }
            };

            return {
                subscriptions : [
                    {name : 'publisher.setupPanel', onData : handlers.onSetupPanel},
                    {name : 'publisher.showPanel', onData : handlers.onShowPanel},
                    {name : 'publisher.clearPanelState',  onData : handlers.onClearPanelState},
                    {name : 'publisher.failure', onData : handlers.onFailure},
                    {name : 'publisher.success', onData : handlers.onSuccess},
                    {name : 'publisher.getPayload', onData : handlers.onGetPayload}
                ]
            };
        }
    };
}(Sfdc.canvas));
