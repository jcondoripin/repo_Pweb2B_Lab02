const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Ruta para agregar un nuevo archivo Markdown
app.post('/markdown/add', (req, res) => {
  const { title, content } = req.body;
  const filename = title.replace(/\s/g, '-').toLowerCase() + '.md';

  fs.writeFile(path.resolve(__dirname, `private/${filename}`), content, (error) => {
    if (error) {
      console.log('Error al agregar el archivo Markdown:', error);
      res.sendStatus(500);
    } else {
      console.log('Archivo Markdown agregado:', filename);
      res.sendStatus(200);
    }
  });
});

// Ruta para cargar la lista de archivos Markdown
app.get('/markdown/list', (req, res) => {
  fs.readdir('./private', (error, files) => {
    if (error) {
      console.log('Error al leer el directorio:', error);
      res.sendStatus(500);
    } else {
      const markdownFiles = files.filter((file) => file.endsWith('.md'));
      const fileList = markdownFiles.map((file) => {
        return {
          title: file.replace('.md', ''),
          filename: file
        };
      });

      res.json(fileList);
    }
  });
});

// Ruta para obtener el contenido de un archivo Markdown
app.get('/markdown/file/:filename', (req, res) => {
  const { filename } = req.params;

  fs.readFile(path.resolve(__dirname, `private/${filename}`), 'utf8', (error, data) => {
    if (error) {
      console.log('Error al leer el archivo:', error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// Ruta principal para cargar el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
