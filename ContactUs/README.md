ContactUs
=========

Email us from our website using AWS Lambda & SendGrid.


Installation
------------

```bat
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```


Hints & Tips
------------

The form is available at:  
https://itenium.be/contact-us

Or using Postman:  
https://855mifztwi.execute-api.us-east-2.amazonaws.com/default/itenium-contact-us  
With body "form-data" and fields: name, email, subject & message


Multipart:  
https://www.npmjs.com/package/parse-multipart

SendGrid:  
https://codeburst.io/serverless-user-engagement-with-aws-lambda-sendgrid-badgeup-and-node-js-53cdc4fa1ddd
API Key: See gitignored file

Lambda Gateway URL:  
https://855mifztwi.execute-api.us-east-2.amazonaws.com/default/itenium-contact-us
