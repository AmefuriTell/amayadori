function createImageCode(data)
{
    var canvas = document.getElementById('resultCanvas');
    var ctx = canvas.getContext('2d');

    var imageData = ctx.createImageData(800, 800);

    for(i = 0; i < data.length; i+=3)
    {
        var r = data[i];
        var g = data[(i + 1) % data.length];
        var b = data[(i + 2) % data.length];
        var a = 255;

        if(i + 1 >= data.length)a--;
        if(i + 2 >= data.length)a--;

        imageData.data[((i / 3) * 4) + 0] = r;
        imageData.data[((i / 3) * 4) + 1] = g;
        imageData.data[((i / 3) * 4) + 2] = b;
        imageData.data[((i / 3) * 4) + 3] = a;
    }
    console.log(imageData.data);
    
    ctx.putImageData(imageData, 0, 0);
    //console.log("END");

    canvas.toBlob(blob => {
        document.getElementById('downloadPng').href = window.URL.createObjectURL(blob);
    });
    return;
}