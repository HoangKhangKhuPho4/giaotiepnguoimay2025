// URL của file PDF
var url = 'https://drive.google.com/file/d/0B4uhr3CNeoJRalZWLVQ0aTFJd2M/view?resourcekey=0-nf3BfnKODzuLR80i6hTrhg';

// Tải và render file PDF
pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
    pdfDoc.getPage(1).then(function(page) {
        var viewport = page.getViewport({ scale: 1.5 });
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Gắn canvas vào viewer
        document.getElementById('pdfViewer').appendChild(canvas);

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
});
