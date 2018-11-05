const express = require('express');
const { Prisma } = require('prisma-binding')
const filedir = '../public'
const multer = require('multer');
const {getAttchFileName,getFileForfileType} = require('../src/server/deployservice/getAttchment.js')
const upload = multer({
  dest: filedir+'/uploads/' // this saves your file into a directory called "uploads"
}); 

const pdb = new Prisma({
    typeDefs: '../gdb/src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
    endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
    debug: true, // log all GraphQL queries & mutations sent to the Prisma API
    // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
  });
  
  
const app = express();
const port = process.env.PORT || 5000;
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/upload', upload.single('file-to-upload'), (req, res) => {
    var file = req.file;
    res.send({ret_code: '0'});
    pdb.mutation.createFile(
        {
          data: {title:file.originalname,size:file.size,
            contentType:file.mimetype,url:'/uploads/'+file.filename}
        }
      )    
  });
  
  app.get('/download/:attchmentid', function (req, res) {
    getAttchFileName(req, res, pdb,filedir);
  });

  app.get('/getFile/:filetype/:attchmentid', function (req, res) {
    getFileForfileType(req, res, pdb,filedir);
  });


app.listen(port, () => console.log(`Listening on port ${port}`));