let TextCodeInput = document.getElementById('TextCode');

TextCodeInput.addEventListener('change', function(e) {
	let files = e.target.files;
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		var reader = new FileReader();

		if(file.size == 0)return;

		if(file.size > 1920000)
		{
			alert("1.92mB以下のものを入力してください.");
			return;
		}
		reader.onload = function(evt)
		{
			var data = new Uint8Array(evt.target.result);
			createImageCode(data);
		};

		reader.readAsArrayBuffer(file);
	}
});

let ImageCodeInput = document.getElementById('ImageCode');

ImageCodeInput.addEventListener('change', function(e) {
	var file = e.target.files[0];
	//console.log(file);
	var reader = new FileReader();

	reader.onload = function(evt)
	{
		var src_data = evt.target.result;
		var img = new Image();
		img.onload = function(evt)
		{
			var cv = document.createElement('canvas');
			cv.width = 800;
			cv.height = 800;

			var ct = cv.getContext('2d');

			ct.drawImage(evt.target, 0, 0);

			var data = ct.getImageData(0, 0, cv.width, cv.height);

			createTextCode(data);
		};

		img.src = src_data;
	};

	reader.readAsDataURL(file);
});