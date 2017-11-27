<h1>This project aims to expedite the registration of fiches, registers, documentation, etc., through a ration and dynamics
creation of document templates.</h1>
 
 <h3>Requirements for the server:</h3>
 
DualCore processor or higher <br>
1GB of RAM <br>
20GB + (varies with use) <br>
local connection <br>
 
<h3>Requirements for your smartphone</h3>
 
Android 6+ <br>
2GB of RAM <br>
20mb free <br>
Camera Access <br>
Access to files <br>
Local Wifi connection <br>

<h4>Application URLs</h4>
 
 Entering http://#ipAddressServerAgileDocument <br>
 it is possible to perform the registration of document templates.
 
 Entering http://#ipAddressServerAgileDocument/newDocument/#idModelDocument <br>
 it will respond to a QRCode image, being it identifier of the same.
 
 Entering http://#ipAddressServerAgileDocument/newDocumentString/#idModelDocument? <br>
 it will respond to the hash QRcode, being it identifier of the same one.
 
 Entering http://#ipAddressServerAgileDocument/getFields/#idModelDocument <br>
 you have returned the fields of these documents in JSON.
 
<h5>Example</h5>

Response JSON: 
[{"identificador":"9a3584e91385084e0b02f04c6be","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"RG"},
{"identificador":"9d0f53fd502ebd4016e3bdf0548","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CPF"},
{"identificador":"5e89eb071a882c8ae1b6795be6","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CARTEIRA DE HABILITAÇÂO"},
{"identificador":"dae6f63114d291506cbb0719d49","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"COMPROVANTE DE RESIDENCIA"},
{"identificador":"8629387cad8318b6bc279f55dd3","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CERTIDÂO DE NASCIMENTO"}]
 
 if "arquivo" is null, there is no image attached to this record, it can be used
http://<<ipAddressServerAgileDocument >>/sendFile/<<DocumentReaderDocument>> POST IMAGE
so it will make the link, for image visualization use http://<< ipAddressServerAgileDocument>>/getFile/<< DocumentID_Document >> GET


<h2>How to Configure AgileDocument</h2>

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

<h4>After that, start creating the application's Docker image</h4>
 
 docker build -t agileapp .

docker run --name agileapplication --link agileDB:agileDB -p 5000:3000 -d agileapp
//the name of the docker should be the same as that declared in abs.js [host]
//agileDB will be the host that will also be present in the abs.js settings


To use AgileDocument, download the app
Entering http://<<ipAddressServerAgileDocument>>/install

 or create and change the project as desired.

<h3>What was it used</h3>

NodeJS >>
https://github.com/expressjs/connect-multiparty <br>
http://expressjs.com <br>
https://www.npmjs.com/package/qrcode-npm <br>
http://docs.sequelizejs.com/ <br>
 
 DataBase >> <br>
 https://mariadb.org/ <br>
 
Android >> <br>
 https://github.com/square/okhttp <br>
 https://github.com/google/gson <br>
 https://github.com/dm77/barcodescanner <br>
 https://github.com/Yalantis/uCrop <br>
 http://loopj.com/android-async-http/ <br>
 https://github.com/hkk595/Resizer <br>

 
 <h1>This project is free , Thanks for use.</h1>