import express from 'express';
import  bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';//file storage
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';



// configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);//for type module these 2 are used
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));//Morgan is a HTTP request logger middleware for Node.js. It logs details about incoming HTTP requests, which can be useful for debugging and monitoring the performance of your application.
app.use(bodyParser.json({limit:"30mb",extended:true}));//Body-Parser is a middleware used to parse the incoming request bodies before your handlers, making the request data available in req.body.
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/assets',express.static(path.join(__dirname,'public/assets')));//set the directory of where we keep our assets(images), currently it is stored locally in public/assets


//file storage
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'public/assets');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({storage});//everytime for file uploading , we'll use this variable


// mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`));
}).catch((error)=>console.log(`${error} did not connect`));

//routes with files
app.post('/auth/register',upload.single("picture"),register)//upon registering will save picture into /public/assets

//routes
app.use('/auth',authRoutes);
app.use('/users',userRoutes);



