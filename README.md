<h1>AgileDocument</h1>
<br>
<h3>This project aims to expedite the registration of fiches, registers, documentation, etc., through a ration and dynamics
creation of document templates.</h3>
<br>
<h5>Project Android: <a href="https://github.com/crosskpixel/AgileDocumentAndroid"> AgileDocumentAndroid </a> <h5>

 
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

<h3>Application URLs</h3>
 
 Entering http://#ipAddressServerAgileDocument <br>
 it is possible to perform the registration of document templates.
 
 Entering http://#ipAddressServerAgileDocument/newDocument/#idModelDocument <br>
 it will respond to a QRCode image, being it identifier of the same.
 
 Entering http://#ipAddressServerAgileDocument/newDocumentString/#idModelDocument? <br>
 it will respond to the hash QRcode, being it identifier of the same one.
 
 Entering http://#ipAddressServerAgileDocument/getFields/#idModelDocument <br>
 you have returned the fields of these documents in JSON.
 
<h4>Example</h4>

Response JSON: 
[{"identificador":"9a3584e91385084e0b02f04c6be","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"RG"},
{"identificador":"9d0f53fd502ebd4016e3bdf0548","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CPF"},
{"identificador":"5e89eb071a882c8ae1b6795be6","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CARTEIRA DE HABILITAÇÂO"},
{"identificador":"dae6f63114d291506cbb0719d49","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"COMPROVANTE DE RESIDENCIA"},
{"identificador":"8629387cad8318b6bc279f55dd3","arquivo":null,"qrCode":"8e4e309fd1d14893ddbeebe2e038","nome":"CERTIDÂO DE NASCIMENTO"}]
 
 if "arquivo" is null, there is no image attached to this record, it can be used
http://#ipAddressServerAgileDocument/sendFile/#DocumentReaderDocument POST IMAGE
so it will make the link, for image visualization use http://#ipAddressServerAgileDocument/getFile/#DocumentID_Document >> GET


<h2>How to Configure AgileDocument</h2>

start a database in docker
https://hub.docker.com/_/mariadb/

<code>
docker run --name agileDB \ <br>
 -e MYSQL_USER=agileuser \ <br>
 -e MYSQL_PASSWORD=agilepassword \ <br>
 -e MYSQL_DATABASE=agileDataBase \ <br>
 -e MYSQL_ROOT_PASSWORD=agilerootz \ <br>
 -e MYSQL_RANDOM_ROOT_PASSWORD=no \ <br>
 -e MYSQL_ALLOW_EMPTY_PASSWORD=no \ <br>
 -p 3306:3306 -d mariadb <br>
 
 </code>
 
  or on a local machine! remember to change the database settings in the configdb.json folder
  
 
 Enter folder the project AgileDocument 
 Look if the settings of "/configdb.json" match the created database configuration!
 
 Example setup configdb.json <br>
 <code>
{
    "database":"yourDatabase",
    "user":"yourUser",
    "password":"yourPass",
    "host":"yourHost",
    "dialect":"mysql"  ,
    "__comment":"// dialect = 'mysql'|'sqlite'|'postgres'|'mssql'"
}
</code>

<h4>After that, start creating the application's Docker image</h4>
 <code>
 docker build -t agileapp .
 </code>
<br>
 <code>
docker run --name agileapplication --link agileDB:agileDB -p 5000:3000 -d agileapp
</code>

the name of the docker should be the same as that declared in abs.js [host] <br>
agileDB will be the host that will also be present in the abs.js settings


To use AgileDocument, download the app
Entering http://#ipAddressServerAgileDocument/install
Android Project: <a href="https://github.com/crosskpixel/AgileDocumentAndroid" > AgileDocumentAndroid </a>

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
 <code>developed by Igor Pancheski  </code><br>
 <code>igorpancheskilinux@icloud.com</code>