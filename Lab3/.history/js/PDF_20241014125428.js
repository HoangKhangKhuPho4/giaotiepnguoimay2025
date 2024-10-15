// URL của file PDF
var url = 'URL_tai_lieu_PDF_cua_ban.pdf';

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
