function createTextCode(data)
{
    let binary = [];
    
    for(i = 0; i < 800*800; i++)
    {
        if(data.data[i * 4 + 3] == 0)break;
        binary.push(data.data[i * 4]);
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