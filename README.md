# cis550
Author: Matthew Ablonczy, Laurel Lee, Jinlu Ma, Zhongyu Shi

## Build the Application locally: 
1. Check whether you already have node installed. Open the termial and type <pre>node -v; npm-v</pre> If the commands cannot be recognnized, go to https://nodejs.org/en/download/ and download the newest Node.js for your system.
2. Check whether the folder "cis550-master" is in the zip file and uncompress it.
3. Open a terminal and type <pre>cd #/cis550-master/Server</pre> Where "#" is the directory where the folder "cis550-master" locates
4. Type the following in the terminal: <pre>npm install</pre> When downloading finished, type <pre>npm start</pre> If everything works fine, you will see the following script in the terminal:<pre>Server listening on PORT 8081</pre>
5. Open another terminal and type <pre>cd #/cis550-master/Client</pre> Where "#" is the directory where the folder "cis550-master" locates
6. Type the following in the terminal: <pre>npm install</pre> When downloading finished, type <pre>npm start</pre> If everything works fine, a new webpage will automatcailly appear in your default browser and the following script in the terminal:<pre>Compiled with warnings</pre>
7. Now you can use the webpage
8. You can also open the webpage by typing the following address into the browser:<pre>http://localhost:3000</pre>

## Depedecies Used:
In Server:
|  | dependency | version | 
| --- | --- | --- |
|1 | body-parser | ^1.19.0 | 
|2| cors| ^2.8.5 |
|3 | express | ^4.17.1 | 
|4 | mysql | ^2.17.1 | 

In Client:
|  | dependency | version | 
| --- | --- | --- |
|1 |bootstrap | ^4.4.1 | 
|2|google-maps-react| ^2.0.6 |
|4 | react | 16.12.0 | 
|4 | react-bootstrap | ^1.0.0-beta.16 | 
|4 | react-dom | ^16.12.0 |
|4 | react-dropdown | ^1.6.4 | 
|4 | react-router-dom | ^5.1.2 | 
|4 | react-scripts | 3.3.0 | 
|4 | react-select | ^3.1.0 | 

For details, please see the file "package.json" file in "Server"/"Client" folder


