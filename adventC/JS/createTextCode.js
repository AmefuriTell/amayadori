function createTextCode(data)
{
    document.getElementById("resultText").innerText = "";
    let binary = [];
    
    for(i = 0; i < 800*800; i++)
    {
        if(data.data[i * 4 + 3] == 0)break;
        if(data.data[i * 4 + 3] == 255)
        {
            binary.push(data.data[i * 4 + 0]);
            binary.push(data.data[i * 4 + 1]);
            binary.push(data.data[i * 4 + 2]);
        }else if(data.data[i * 4 + 3] == 254)
        {
            binary.push(data.data[i * 4 + 0]);
            binary.push(data.data[i * 4 + 1]);
        }
        else if(data.data[i * 4 + 3] == 253)
        {
            binary.push(data.data[i * 4 + 0]);
        }
    }

    var str = "";
    for (var i=0; i<binary.length ; i++){
        str += String.fromCharCode(binary[i]);
    }

    const blob = new Blob([new Uint8Array(binary)],{type:"application/octet-binary"});
    document.getElementById('downloadText').href = window.URL.createObjectURL(blob);
    document.getElementById("resultText").innerText = str;

    return;
}