const multipart = require('parse-multipart');
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = 'TODO: ENV VARIABLE';

const parseMultipart = (multipartBody, boundary) => {
   let parts = multipartBody.split(boundary);
   parts = parts.slice(1, parts.length - 1);

   const formData = {};
   for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const regex = /Content-Disposition: form-data; name="(.*)"\r\n\r\n(.*)\r\n--/ms;
      const result = part.match(regex);
      formData[result[1]] = result[2];
   }
   return formData;
};

exports.handler = async (event) => {
   const body = event.isBase64Encoded ? atob(event.body) : event.body;
   const boundary = multipart.getBoundary(event.headers["Content-Type"] || event.headers['content-type']);
   const parts = parseMultipart(body, boundary);

   const msg = {
      to: 'yentl.storms@itenium.be',
      from: 'contact-us@itenium.be',
      subject: parts['subject'],
      html: `
         <p>${parts['name']} (${parts['email']}) zei het volgende:</p>
         <blockquote><pre>${parts['message']}</pre></blockquote>
      `,
   };
   try {
      sgMail.setApiKey(SENDGRID_API_KEY);
      await sgMail.send(msg);
   } catch (e) {
      console.error(e);
   }

   return {
      statusCode: 202,
      body: msg,
   };
};

// const testEvent = {
//    "resource": "/itenium-contact-us",
//    "path": "/itenium-contact-us",
//    "httpMethod": "POST",
//    "headers": {
//       "Accept": "*/*",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Content-Type": "multipart/form-data; boundary=--------------------------895301024522019112356675",
//       "Host": "855mifztwi.execute-api.us-east-2.amazonaws.com",
//       "Postman-Token": "5b96de72-90cf-4e8f-8c8d-39dbf28715d2",
//       "User-Agent": "PostmanRuntime/7.28.4",
//       "X-Amzn-Trace-Id": "Root=1-61688747-2acd0237602b04374768b4fb",
//       "X-Forwarded-For": "81.83.82.72",
//       "X-Forwarded-Port": "443",
//       "X-Forwarded-Proto": "https"
//    },
//    "multiValueHeaders": {
//       "Accept": [
//          "*/*"
//       ],
//       "Accept-Encoding": [
//          "gzip, deflate, br"
//       ],
//       "Content-Type": [
//          "multipart/form-data; boundary=--------------------------895301024522019112356675"
//       ],
//       "Host": [
//          "855mifztwi.execute-api.us-east-2.amazonaws.com"
//       ],
//       "Postman-Token": [
//          "5b96de72-90cf-4e8f-8c8d-39dbf28715d2"
//       ],
//       "User-Agent": [
//          "PostmanRuntime/7.28.4"
//       ],
//       "X-Amzn-Trace-Id": [
//          "Root=1-61688747-2acd0237602b04374768b4fb"
//       ],
//       "X-Forwarded-For": [
//          "81.83.82.72"
//       ],
//       "X-Forwarded-Port": [
//          "443"
//       ],
//       "X-Forwarded-Proto": [
//          "https"
//       ]
//    },
//    "queryStringParameters": null,
//    "multiValueQueryStringParameters": null,
//    "pathParameters": null,
//    "stageVariables": null,
//    "requestContext": {
//       "resourceId": "mn5dzq",
//       "resourcePath": "/itenium-contact-us",
//       "httpMethod": "POST",
//       "extendedRequestId": "HNoTNG5kiYcF4ug=",
//       "requestTime": "14/Oct/2021:19:38:47 +0000",
//       "path": "/default/itenium-contact-us",
//       "accountId": "342694874578",
//       "protocol": "HTTP/1.1",
//       "stage": "default",
//       "domainPrefix": "855mifztwi",
//       "requestTimeEpoch": 1634240327586,
//       "requestId": "5972fc32-c2fb-455f-b9fc-e39a90c8e0fa",
//       "identity": {
//          "cognitoIdentityPoolId": null,
//          "accountId": null,
//          "cognitoIdentityId": null,
//          "caller": null,
//          "sourceIp": "81.83.82.72",
//          "principalOrgId": null,
//          "accessKey": null,
//          "cognitoAuthenticationType": null,
//          "cognitoAuthenticationProvider": null,
//          "userArn": null,
//          "userAgent": "PostmanRuntime/7.28.4",
//          "user": null
//       },
//       "domainName": "855mifztwi.execute-api.us-east-2.amazonaws.com",
//       "apiId": "855mifztwi"
//    },
//    "body": "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTg5NTMwMTAyNDUyMjAxOTExMjM1NjY3NQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJuYW1lIg0KDQpOYWFtDQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tODk1MzAxMDI0NTIyMDE5MTEyMzU2Njc1DQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImVtYWlsIg0KDQpZZW50bC5TdG9ybXNAaXRlbml1bS5iZQ0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTg5NTMwMTAyNDUyMjAxOTExMjM1NjY3NQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJzdWJqZWN0Ig0KDQpTdWJqZWN0DQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tODk1MzAxMDI0NTIyMDE5MTEyMzU2Njc1DQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9Im1lc3NhZ2UiDQoNCk1lc3NhZ2UKCkJsYWJsYQoKCgpNZWVyZGVyZSBsaWpuZW4NCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS04OTUzMDEwMjQ1MjIwMTkxMTIzNTY2NzUtLQ0K",
//    "isBase64Encoded": true
// };

// exports.handler(testEvent);
