const fs=require('fs');
//const url=require('url');
const {format}=require('date-fns');
const { v4: uuid}=require('uuid');
const fsPromises=require('fs').promises;
const path=require('path');
const PORT=process.env.PORT||3500;
const express=require('express');
const app=express();
const bodyParser=require('body-parser');




const allRoutes=require("./routers/allRoute");
app.use(bodyParser.urlencoded({extended:false}));
//app.set('view engine','ejs');

//app.use(tracker);
app.use(dateLog);
app.use(allRoutes);
app.use('/frontScripts',express.static(path.join(__dirname, 'frontScripts')));

app.listen(PORT, () => {console.log(`server running on port ${PORT}`);});


async function dateLog(req,res,next){
    const url=req.url;
    const dateTime=`${format(new Date(),'ddMMyyyy\tHH:mm:ss')}`;
    const logItem=`${dateTime}\t${uuid()}\t${url}\t${req.method}\n`;
    //console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname,'logs'))){ 
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'logs','eventLog.txt'),logItem);
    } catch (err) {
        console.log(err);
    }
    
    next();
}


















/* Web server code without express integration
const http=require('http');
const fs=require('fs');
const fsPromises=require('fs').promises;
const express=require('express');
const app=express();

const logEvents=require('./logEvents');
const EventEmitter=require('events');
class Emitter extends EventEmitter{};
const myEmitter=new Emitter();

var counter=0;
app.get("/login.html",(req,res)=>{
    console.log('Here');

    counter++;
    console.log(counter);
    if(counter>2){
        res.send('tekrardan merhaba!');
    }else{
        res.send('merhaba!');
    }
});

myEmitter.on('log',(msg,fileName)=>logEvents(msg));//,fileName));


const serveFile= async(filePath,contentType,response) =>{// bu fonksiyon, istemcinin talep ettiği dosya içeriğini uygun bir şekilde döndürmeye yarar
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image')?'utf8': ''
        );
        const data=contentType==='application/json'? JSON.parse(rawData):rawData;
        response.writeHead(
            filePath.includes('404.html')?404:200, 
            {'Content-Type': contentType}
        );
        response.end(
            contentType==='application/json'?JSON.stringify(data):data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log',`${err.name}: ${req.message}`, 'errLog.txt');
        response.statusCode=500;
        response.end();
    }
}


const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);
    myEmitter.emit('log',`${req.url}\t${req.method}`, 'reqLog.txt');
    const extension=path.extname(req.url);
    let contentType;    
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
    contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'view', 'first.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'view', req.url, 'first.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'view', req.url)
                : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if(fileExists){
        serveFile(filePath,contentType,res);
    }else{
        switch(path.parse(filePath)){
            case 'old-page.html':
                res.writeHead(301,{'Location': '/new-page.html'});
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location': '/'});
                res.end()
                break;
            default:
                serveFile(path.join(__dirname, 'view', '404.html'),contentType,res);
        };
    }
})*/


