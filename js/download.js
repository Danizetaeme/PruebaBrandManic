document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.querySelector(".download-card");
    downloadButton.addEventListener("click", function () {
      html2canvas(document.body).then(function (canvas) {
        canvas.toBlob(function (blob) {
          saveAs(blob, "influCard.png");
        });
      });
    });
  });
  

