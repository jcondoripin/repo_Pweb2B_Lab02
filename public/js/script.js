// Función para cargar la lista de archivos Markdown
function loadFileList() {
    $.ajax({
      url: '/markdown/list',
      type: 'GET',
      success: function(data) {
        var fileList = $('#file-list');
  
        // Vaciar la lista antes de agregar los nuevos elementos
        fileList.empty();
  
        // Agregar los títulos de los archivos como elementos de la lista
        data.forEach(function(file) {
          var listItem = $('<li></li>').text(file.title);
  
          // Agregar evento clic para cargar el contenido del archivo
          listItem.on('click', function() {
            loadMarkdownContent(file.filename);
          });
  
          fileList.append(listItem);
        });
      },
      error: function(error) {
        console.log('Error al cargar la lista de archivos Markdown:', error);
      }
    });
  }
  
  // Función para agregar un nuevo archivo Markdown
  function addFile() {
    var fileTitle = $('#file-title').val();
    var fileContent = $('#file-content').val();
  
    $.ajax({
      url: '/markdown/add',
      type: 'POST',
      data: {
        title: fileTitle,
        content: fileContent
      },
      success: function() {
        loadFileList();
        $('#file-title').val('');
        $('#file-content').val('');
      },
      error: function(error) {
        console.log('Error al agregar el archivo Markdown:', error);
      }
    });
  }
  
  // Función para cargar el contenido de un archivo Markdown
  function loadMarkdownContent(filename) {
    $.ajax({
      url: '/markdown/file/' + filename,
      type: 'GET',
      success: function(data) {
        var converter = new showdown.Converter();
        var htmlContent = converter.makeHtml(data);
  
        $('#output-title').text(filename);
        $('#output-content').html(htmlContent);
      },
      error: function
      (error) {
        console.log('Error al cargar el contenido del archivo Markdown:', error);
      }
    });
  }
  