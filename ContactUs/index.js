const multipart = require('parse-multipart');

exports.handler = async (event) => {
   // console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));

   const body = event.body;
   var boundary = event.headers["Content-Type"]; // ex: "----WebKitFormBoundaryDtbT5UpPj83kllfw";
   boundary = boundary.substring(boundary.indexOf('boundary=') + 9);
   const parts = multipart.Parse(body, boundary);

   // for(var i = 0; i < parts.length; i++){
   //    var part = parts[i];
   //    // will be:
   //    // { filename: 'A.txt', type: 'text/plain',
   //    //		data: <Buffer 41 41 41 41 42 42 42 42> }
   //  }

   const response = {
      statusCode: 202,
      body: JSON.stringify(parts),
   };
   return response;
};
