/**
 * Copyright (c) 2013 salesforce.com, inc.
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
package util;
import java.util.EnumSet;
import java.util.Set;

/**
 * Copyright (c) 2013 salesforce.com, inc.
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

/**
 * Simple enum to determine what kind of device is hitting this app.
 */
public enum Device{
	IPHONE{
		boolean matches(String ua){ return ua.contains("iphone");}
	},
	IPAD{
		boolean matches(String ua){ return ua.contains("ipad");}
	},
	ANDROID_PHONE{
		boolean matches(String ua){ 
			return ua.contains("android") &&
				ua.contains("mobile");
		}
	},
	ANDROID_TABLET{
		boolean matches(String ua){ 
			return ua.contains("android") &&
				!ua.contains("mobile");
		}
	},
	WINDOWS_PHONE{
		boolean matches(String ua){ return ua.contains("windows phone");}
	},
	DESKTOP_MAC{
		boolean matches(String ua){ return ua.contains("macintosh");}
	},
	DESKTOP_WINDOWS{
		boolean matches(String ua){ return ua.contains("windows");}
	},
	DESKTOP_LINUX{
		boolean matches(String ua){ return ua.contains("linux");}
	},
	UNKNOWN{ // Make sure this is the last value in the enum.
		boolean matches(String ua){ return true;}
	};
	
	private static final Set<Device> MOBILE_DEVICES = 
			EnumSet.<Device>of(ANDROID_PHONE,IPHONE,WINDOWS_PHONE);
	
	public static Device get(String ua){
		if (null == ua){
			return Device.UNKNOWN;
		}
		Device rv = null;
		String uaLower = ua.toLowerCase();
		for(Device device: Device.values()){
			if (device.matches(uaLower)){
				rv = device;
				break;
			}
		}
		return rv;
	}
	
	public boolean isMobile(){
		return MOBILE_DEVICES.contains(this);
	}

	abstract boolean matches(String ua);
}
