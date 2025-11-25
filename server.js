const express=require('express');const bodyParser=require('body-parser');const cors=require('cors');const helmet=require('helmet');const path=require('path');
const fields=require('./routes/fields');const inv=require('./routes/inventory');const ops=require('./routes/operations');
const app=express();app.use(helmet());app.use(cors());app.use(bodyParser.json());
app.use('/api/fields',fields);app.use('/api/inventory',inv);app.use('/api/operations',ops);
app.use(express.static(path.join(__dirname,'public')));
app.listen(4000,()=>console.log('Backend running'));