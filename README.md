
<div align="center">
<table>
    <theader>
        <tr>
            <td><img src="https://github.com/rescobedoq/pw2/blob/main/epis.png?raw=true" alt="EPIS" style="width:50%; height:auto"/></td>
            <th>
                <span style="font-weight:bold;">UNIVERSIDAD NACIONAL DE SAN AGUSTIN</span><br />
                <span style="font-weight:bold;">FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS</span><br />
                <span style="font-weight:bold;">DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS E INFORMÁTICA</span><br />
                <span style="font-weight:bold;">ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS</span>
            </th>
            <td><img src="https://github.com/rescobedoq/pw2/blob/main/abet.png?raw=true" alt="ABET" style="width:50%; height:auto"/></td>
        </tr>
    </theader>
    <tbody>
        <tr><td colspan="3"><span style="font-weight:bold;">Formato</span>: Guía de Práctica de Laboratorio</td></tr>
        <tr><td><span style="font-weight:bold;">Aprobación</span>:  2022/03/01</td><td><span style="font-weight:bold;">Código</span>: GUIA-PRLD-001</td><td><span style="font-weight:bold;">Página</span>: 1</td></tr>
    </tbody>
</table>
</div>

<div align="center">
<span style="font-weight:bold;">GUÍA DE LABORATORIO</span><br />
</div>


<table>
<theader>
<tr><th colspan="6">INFORMACIÓN BÁSICA</th></tr>
</theader>
<tbody>
<tr><td>ASIGNATURA:</td><td colspan="5">Programación Web 2</td></tr>
<tr><td>TÍTULO DE LA PRÁCTICA:</td><td colspan="5">Ajax y NodeJS</td></tr>
<tr>
<td>NÚMERO DE PRÁCTICA:</td><td>03</td><td>AÑO LECTIVO:</td><td>2022 A</td><td>NRO. SEMESTRE:</td><td>III</td>
</tr>
<tr>
<td>FECHA INICIO::</td><td>09-May-2022</td><td>FECHA FIN:</td><td>13-May-2022</td><td>DURACIÓN:</td><td>04 horas</td>
</tr>
<tr><td colspan="6">RECURSOS:
    <ul>
        <li>https://www.w3schools.com/nodejs/nodejs_intro.asp</li>
        <li>https://nodejs.org/en/docs/guides/getting-started-guide/</li>
        <li>https://nodejs.dev/learn</li>
        <li>https://www.w3schools.com/js/js_api_fetch.asp</li>
        <li>https://expressjs.com/es/</li>
        <li>https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch</li>
        <li>https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction</li>
    </ul>
</td>
</<tr>
<tr><td colspan="6">DOCENTES:
<ul>
<li>Richart Smith Escobedo Quispe - rescobedoq@unsa.edu.pe</li>
</ul>
<tr><td colspan="6">ALUMNOS:
<ul>
  <li>Condori Pinto Juan José</li>
  <li>Flores Sucapuca Ervin</li>
  <li>Mejia Ramos Piero Douglas</li>
  <li>Muñoz Romani Aroldo Guillermo</li>
  <li>Vizcarra Gallegos Elias Eduardo</li>
 </td>
</<tr>

  </tdbody>
</table>

# Ajax y NodeJS

[![License][license]][license-file]
[![Downloads][downloads]][releases]
[![Last Commit][last-commit]][releases]

[![Debian][Debian]][debian-site]
[![Git][Git]][git-site]
[![GitHub][GitHub]][github-site]
[![Vim][Vim]][vim-site]
[![Java][Java]][java-site]

#

## OBJETIVOS TEMAS Y COMPETENCIAS

### OBJETIVOS

-   Aprender peticiones asíncronas en JavaScript usando JSON para la comunicación.
-   Programar en BackEnd usando JavaScript.
-   Entender el concepto de promises y los objetos no bloqueantes

### TEMAS
- Objetos asíncronos
- Comunicación con POST y GET
- Programación en el backend 

<details>
<summary>COMPETENCIAS</summary>

- C.c Diseña responsablemente sistemas, componentes o procesos para satisfacer necesidades dentro de restricciones realistas: económicas, medio ambientales, sociales, políticas, éticas, de salud, de seguridad, manufacturación y sostenibilidad.
- C.m Construye responsablemente soluciones siguiendo un proceso adecuado llevando a cabo las pruebas ajustada a los recursos disponibles del cliente.
- C.p Aplica de forma flexible técnicas, métodos, principios, normas, estándares y herramientas de ingeniería necesarias para la construcción de software e implementación de sistemas de información.

</details>

## SOLUCION Y RESULTADOS
-   En grupos de 3 a 5 personas implemente una aplicación web que navegue sobre archivos Markdown y permita:
    1. Listas los archivos Markdown disponibles
	```
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
    ```
	 	
    2. Ver el contenido de un archivo Markdown traducido a HTML
	
	```
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
    ```
	
    3. Crear nuevos archivos MarkDown y almacenarlos en el servidor
	
	```
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
    ``` 
	
	Anexo:https://github.com/jcondoripin/repo_Pweb2B_Lab02/blob/main/public/js/script.js

    <img src="./img_index.PNG" style="width:50%; height:auto"/>

La comunicación entre el cliente y el servidor es JSON sólamente.
El cliente usa AJAX para sus peticiones.
El servidor usar NodeJS.
La aplicación es una página única.
	
Anexo: https://github.com/jcondoripin/repo_Pweb2B_Lab02/blob/main/public/index.html



#

## CUESTIONARIO
- En el Ejemplo "Hola Mundo" con NodeJS. ¿Qué pasó con la línea: "Content type ….."?

Se omitio la linea Content Type, esto podria llevar a problemas de interpretación del contenido y algunas incompatibilidades en ciertos clientes. 
Es una buena practica establecer el "Content Type" apropiado en la respuesta HTTP para asegurarse de que el cliente interprete correctamente el contenido.

- En los ejercicios. ¿En qué lugar debería estar el archivo poema.txt?

El archivo "poema.txt" debería estar ubicado dentro de una carpeta llamada "priv" en el mismo directorio que el archivo JavaScript principal.

- ¿Entiende la expresión regular en el código y se da cuenta de para qué es útil?
- Note que la respuesta del servidor está en formato JSON, ¿Habrá alguna forma de verla directamente?
Se puede ver los archivos JSON desde el inspector del navegador.

#

## REFERENCIAS
-   JavaScript code using the latest ECMAScript. Packt Publishing Ltd, 2018.
-   Greg Lim. Beginning Node.js, Express & MongoDB Development. Amazon, 2019.
-   https://www.w3schools.com/nodejs/nodejs_intro.asp
-   https://nodejs.org/en/docs/guides/getting-started-guide/
-   https://nodejs.dev/learn
-   https://www.w3schools.com/js/js_api_fetch.asp
-   https://expressjs.com/es/
-   https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
-   https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction
-   https://github.com/github/gitignore/blob/main/Node.gitignore

#

[license]: https://img.shields.io/github/license/rescobedoq/pw2?label=rescobedoq
[license-file]: https://github.com/rescobedoq/pw2/blob/main/LICENSE

[downloads]: https://img.shields.io/github/downloads/rescobedoq/pw2/total?label=Downloads
[releases]: https://github.com/rescobedoq/pw2/releases/

[last-commit]: https://img.shields.io/github/last-commit/rescobedoq/pw2?label=Last%20Commit

[Debian]: https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white
[debian-site]: https://www.debian.org/index.es.html

[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[git-site]: https://git-scm.com/

[GitHub]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[github-site]: https://github.com/

[Vim]: https://img.shields.io/badge/VIM-%2311AB00.svg?style=for-the-badge&logo=vim&logoColor=white
[vim-site]: https://www.vim.org/

[Java]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white
[java-site]: https://docs.oracle.com/javase/tutorial/


[![Debian][Debian]][debian-site]
[![Git][Git]][git-site]
[![GitHub][GitHub]][github-site]
[![Vim][Vim]][vim-site]
[![Java][Java]][java-site]


[![License][license]][license-file]
[![Downloads][downloads]][releases]
[![Last Commit][last-commit]][releases]
