# AgileDocument
This project aims to expedite the registration of fiches, registers, documentation, etc., through a ration and dynamics
creation of document templates.
 
Requirements for the server:
 
DualCore processor or higher
1GB of RAM
20GB + (varies with use)
local connection
 
Requirements for your smartphone
 
Android 6+
2GB of RAM
20mb free
Camera Access
Access to files
Local Wifi connection

Application URLs
 
 Entering http://<<ipAddressServerAgileDocument>>
 it is possible to perform the registration of document templates.
 
 Entering http://<<ipAddressServerAgileDocument>>/newDocument/<<idModelDocument>>
 it will respond to a QRCode image, being it identifier of the same.
 
 Entering http://<<ipAddressServerAgileDocument>>/newDocumentString/<<idModelDocument>>
 it will respond to the hash QRcode, being it identifier of the same one.
 
 Entering http://<<ipAddressServerAgileDocument>>/getFields/<<idModelDocument>>
 you have returned the fields of these documents in JSON.
 
Example:

Response JSON: 
[{"identificador":"9a3584e91385084e0b02f04c6be","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"RG"},
{"identificador":"9d0f53fd502ebd4016e3bdf0548","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CPF"},
{"identificador":"5e89eb071a882c8ae1b6795be6","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CARTEIRA DE HABILITAÇÂO"},
{"identificador":"dae6f63114d291506cbb0719d49","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"COMPROVANTE DE RESIDENCIA"},
{"identificador":"8629387cad8318b6bc279f55dd3","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CERTIDÂO DE NASCIMENTO"}]
 
 if "arquivo" is null, there is no image attached to this record, it can be used
http://<<ipAddressServerAgileDocument >>/sendFile/<<DocumentReaderDocument>> POST IMAGE
so it will make the link, for image visualization use http://<< ipAddressServerAgileDocument>>/getFile/<< DocumentID_Document >> GET


How to Configure AgileDocument

start a database in docker
https://hub.docker.com/_/mariadb/

docker run --name agileDB \
 -e MYSQL_USER=agileuser \
 -e MYSQL_PASSWORD=agilepassword \
 -e MYSQL_DATABASE=agileDataBase \
 -e MYSQL_ROOT_PASSWORD=agilerootz \
 -e MYSQL_RANDOM_ROOT_PASSWORD=no \
 -e MYSQL_ALLOW_EMPTY_PASSWORD=no \
 -p 3306:3306 -d mariadb
 
  or on a local machine! remember to change the database settings in the model/abs.js folder
  
 
 Enter folder the project AgileDocument 
 Look if the settings of "/model/abs.js" match the created database configuration!
 
 Example setup abs.js
const sequelize = new Sequelize('<<nameDataBase>>', '<<user>>', '<<password>>', {	//configuracao do banco de dados
    host: '<<host>>',
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
});

After that, start creating the application's Docker image
 
 docker build -t agileapp .

docker run --name agileapplication --link agileDB:agileDB -p 5000:3000 -d agileapp
//the name of the docker should be the same as that declared in abs.js [host]
//agileDB will be the host that will also be present in the abs.js settings


To use AgileDocument, download the app
Entering http://<<ipAddressServerAgileDocument>>/install

 or create and change the project as desired.

What was it used

NodeJS >>
https://github.com/expressjs/connect-multiparty
http://expressjs.com
https://www.npmjs.com/package/qrcode-npm
http://docs.sequelizejs.com/
 
 DataBase >>
 https://mariadb.org/
 
Android >>
 https://github.com/square/okhttp
 https://github.com/google/gson
 https://github.com/dm77/barcodescanner
 https://github.com/Yalantis/uCrop
 http://loopj.com/android-async-http/
 https://github.com/hkk595/Resizer

 
 This project is free , Thanks for use.