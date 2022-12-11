function createImageCode(data)
{
    var canvas = document.getElementById('resultCanvas');
    var ctx = canvas.getContext('2d');

    var imageData = ctx.createImageData(800, 800);

    for(i = 0; i < data.length; i++)
    {
        //console.log(data[i]);

        var r = data[i];
        var g = data[(i + 1) % data.length];
        var b = data[(i + 2) % data.length];
        var a = 255;

        imageData.data[(i * 4) + 0] = r;
        imageData.data[(i * 4) + 1] = g;
        imageData.data[(i * 4) + 2] = b;
        imageData.data[(i * 4) + 3] = a;
    }
    ctx.putImageData(imageData, 0, 0);
    //console.log("END");

    canvas.toBlob(blob => {
        document.getElementById('downloadPng').href = window.URL.createObjectURL(blob);
    });
    return;
}