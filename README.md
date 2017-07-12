SFDC Canvas Java Template  
============================

Salesforce Canvas is a mashup framework for consuming third party applications within Salesforce. Its goal is to connect applications at a UI level instead of an API level. Platform Connect will provide third party applications with a JavaScript SDK along with Java classes so they can seamlessly integrate canvas style applications, while developing in the technology and platform of their choice. 

### How to Build The app locally

    mvn package
    
### First time keystore generation (for local SSL support)

      > keytool -keystore keystore -alias jetty -genkey -keyalg RSA
      Enter keystore password: 123456
      Re-enter new password: 123456
      What is your first and last name?
        [Unknown]:  
      What is the name of your organizational unit?
        [Unknown]:  <Your Org Unit>
      What is the name of your organization?
        [Unknown]:  <Your Org>
      What is the name of your City or Locality?
        [Unknown]:  <Your City>
      What is the name of your State or Province?
        [Unknown]: <Your State> 
      What is the two-letter country code for this unit?
        [Unknown]:  <Your Country>
      Is CN=<Your Name>, OU=<Your OU>, O=<Your O>, L=<Your Locality>, ST=<Your State>, C=<Your Country>?
        [no]:  yes

      Enter key password for <jetty>
	(RETURN if same as keystore password):  
      Re-enter new password: 

### How to Run Canvas locally

    sh target/bin/webapp

### How to invoke app locally

    https://localhost:8443
    
### Canvas URL

    https://localhost:8443/canvas.jsp
    or on Heroku
    https://<your-heroku-app>.herokuapp.com/canvas.jsp
    
### Canvas Callback URLs
    
    https://localhost:8443/sdk/callback.html
    or on Heroku
    https://<your-heroku-app>.herokuapp.com/sdk/callback.html

### How to push new changes to heroku

      git add -A
      git commit -m "My change comments"
      git push heroku master

### How to get Heroku logs
      
      heroku logs --tail



