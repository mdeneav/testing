$(document).ready(function() {

    if (!(window.File && window.FileList && window.FileReader && window.Blob)) {
        alert('The File APIs are not fully supported in this browser. The Drag and Drop feature is disabled.');
    }

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
        document.getElementById('dropzone').addEventListener('dragover', csvtools.upload.dragOverHandler, false);
        document.getElementById('dropzone').addEventListener('dragleave', csvtools.upload.dragOverHandler, false);
        document.getElementById('dropzone').addEventListener('drop', FileSelectHandler, false)
    }

    var fileJson = { headers: [], objects: [] };
    function makeFileJson(array, rowNumber) {
        if (rowNumber == 0) {
            fileJson.headers = array;
        } else {
            var obj = {};
            for (var i=0; i<array.length; i++) {
                obj[fileJson.headers[i]] = array[i];
            }
            fileJson.objects.push(obj);
        }
        $('#fileContent').html(JSON.stringify(fileJson));
    }

    function FileSelectHandler(e) {
        csvtools.upload.dragOverHandler(e);
        var files = e.target.files || e.dataTransfer.files; // fetch File object
        csvtools.upload.readFile(files[0], makeFileJson)
        csvtools.upload.nameFile(files[0], '#fileInfo');
    }

});