
<script>
window.onload = function() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
	  	if (this.readyState == 4 && this.status == 200) {
			var jsonData = JSON.parse(this.responseText);
			
			var countrycode = jsonData.countryCode;
			var mycity = jsonData.city;
			var isp = jsonData.isp;
			var country = jsonData.country;
			
			if(countrycode==""){countrycode="Unknown"; }
			if(mycity==""){mycity="Unknown"; }
			if(isp==""){isp="Unknown"; }
			if(country==""){country="Unknown"; }
			
			var flag=countrycode.toLowerCase();
			var flaggif = "flagiconsall/"+flag+".png";
			
			document.getElementById("countrycode").innerHTML = countrycode;
			document.getElementById("mycity").innerHTML = mycity;
			document.getElementById("isp").innerHTML = isp;
			document.getElementById("country").innerHTML = country;
			
			document.getElementById("flaggif").src = flaggif;
			document.getElementById("flaggif").style.display = "inline";
	  	}
	};
	xhttp.open("GET", "data.php", true);
	xhttp.send();
}

document.oncontextmenu = new Function("return false");

var cursor = new window['Image'];
cursor['setAttribute']('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAGQCAMAAABCs48LAAABg1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAEBATX19dQUFBNTU3Q0ND6+vr+/v78/PwTExP29vbw8PAXFxcPDw8JCQkHBwcMDAwsLCwnJyfs7Ozf399+fn4iIiIeHh6bm5s4ODgbGxvy8vLq6uro6Oi5ubmRkZFwcHBra2tfX18+Pj40NDTZ2dnT09PCwsK9vb2ioqJISEgGBgbLy8uCgoJ4eHhmZmZZWVlBQUEwMDDk5OTb29u2traIiIhFRUWysrLh4eGurq6np6d0dHRjY2NVVVXFxcWqqqqenp6Xl5fNzc1SUlLHx8eOjo4qY7QNAAAAOXRSTlMA6PEQAv2S+gYJL/bt1PTa5cWaVgzfGhcTpMugZk41HUM6wLBIKLN+Wz4jIIPQuY2pYYh5a5Vvc3UFjX1nAAAP5UlEQVR42uyd91cTQRDHL2iMEoqCqAhWELCANJVZ2t0RSoAEQif0ELqhCNIs+Kdb3vPlbvYOUu7I7t1+f+Px+OXzhtvZme/OSEJCQkJCQkJCQkJCQkJCQkJCQkJCQkJuUu3T25KQgQrL829KQrSKisqfCjIGKiD+xueCDK27XuJreHJHEkLyEEJ890pvSEI0GOJ73PpQEqLBEG9hmyBjBIZ4y2qfSUI0GOK9+/6VJESDIcTzIV8SMgBD8sqfSkIGYIi/6rlIaGgw/xKauvuSUBJMUvVNImYMwZDCj48kIQMwpKxFkDEEQ0SqZwKGeG6JhMYQDMkrEbUrQzCkqPG56yvBhmCIr8b1tSsPMSbzstTlZEzAEK/bk2APMSPzuNLVtSsPMVWxqxMaDzHXn9qVew8nDZhgX2SQ6FRQ8cK1ZDRgBuMjB+1EryrXJjRaMFvhvZ0gJlPtUjIaMO2nYZiJB/Gx7dJUTwumswNgpXMQH9vuTGgwGFg/6Sd6PW595MI7JQUGlrd6qITmjfs+NDQYWIpOIDIF7/NdR8YADCT2h9Gxnfch322fYCMwMD07hMlUvHAZGUMwEBpbxGQaX7uLjDEY6P26gMj4a6pdRcYEDAS+HLTj2lXdDRcd22ZgIDDTNYCbca0P3EPGFAzIK/NUQtPyxjVkzMGAsjTXh64Hd9+9cguZS8CAEo5GEJmC924hg8AgMonZUUymxCVtSgQGk5meHcbXA5f4rjAYTGZqbBE3cN1Ru0JgaE1+XaCacU9cQAaDoRXYiw8Q4jpHGg2GJrOy3Y/IFFY6/vFBCmBAXo6iVM9b/MnpvqtUwIC6dEwnwQ5v4JqCQUnwZgTHzDtnW+xNweAkeH8YkfE4O9VDYMw19X0IJzTlLxx8PUgZDPSu7qBju8jJtavUwcDkTOcgTmic67tKAwzIF9tUm7LJqakeAnOFurdwm7L+o0OP7fTAwFKUblM+kJyoNMFAeHMC+66a30gOVLpgYBonNMSZtau0wUBo7DPBzTgHWuzTBwOBc6oZ1/jacWQyAAMy3YyrcVztKhMwoMx0BXFVz2njITICA+rKKU6CnWYkzwwMqGfzKNXzFrY4ykieIRhQuinfVVmzk5pxCEwa2t0YxQnNBwc50jIBY+q7Kip3jrsoCzAwuTqOyHgbqp1y284GDMjnO2tEr4ZSh7QPsgID6kwck7nX5Awy2YEBeaVrEPuunDHvKkswoK5v0S0nJzjSEJgMtBztwxWad2/5J5M9GNgdwQmNxwG+KwvAQIiqXeWVcJ/qWQEGQrPDuEJTzvtrSkvAKFNUVa+ohvPRpghMpppapap6DXzXriwCo4SOuiiLPde+KwQmc03GTvtxm5Jn35VlYEDtpozkxW38NuOsAwPq7iYmU1bL7eMDC8GAcjiCjm3v3Vu8zmrPFgw2kg9hi30Fp0ZyBCZbTX//7BCLvcVglND5Dq53Vj2XOJRlYJIv4zqDTkj1LAcD8tn2AOVI4y/Vsx4MyD9wM85Xz1+qZwMYUDvm+nGq18IbGQTGInUcD+I25TvOKsH2gIGlkQgmw9kUe5vAKAnqzSBnFnsExjr1fqMcaVxV9WwDA5N0qlfzhJ9j22owaAgCTmj4ObZtBAPqCmWxL/zIS4UGgbFYdJuyrJYTu7S9YGB5s49TI7nNYCBMJTScrOWxGwxM/6LblDxUaOwAgy32QwRXaF6zn9DYDwYmv44jMr4G9hMae8Bgiz1O9cjjJtYTGgTGJs3QvqtKxh1p1wNGPcPjIUhxK9tkrgcMyMsnVKrHtsUegbFPS8c41fMwndBcGxg43OfKYm8rGGyx/4wHeDK8fMZeMLh2NR7ERnJmhyBcJxgIfOnC7YOXrLacrhUMKCun1ETyOjZTPQTGdp3N9/ORBF83GHV5roeq6j1k0ENjPxi6GddHjYdg0GJ//WAgvIHt0h4GfVc5AANTs4u4sVLB3BCEXICBwNjCAOsW+5yAAfVoIYhrV4xZ7HMDBuSZHcpiXy2xpOsDg8l0YTIv61iKmVyBATm2TY2HaGUo1csZGFDXcarnK25hp4GbOzCgho8nqCn2zLQpcwgGlMT+EFW7YiXVyyUYUHrpeVesWOyvHQyuXS1SFns25l3lGAyEVhcwGTZWSucaDEwexREZPxOz2nMO5u/jgwH8ZpCBZlzuwYB8cULPas95QsMAGFA7oj3UeIg0yTgSDEB4pI/awJjea0qHgoHEfgSTSa925VQwQK/l8Ve9kFKXY8FAiJpi76tJYy2Pc8H828DI0Ms4dsBAIIYTGlKfcjPOyWAA1qk2ZWGqs9qdDQa65wyacVIqcjgYWDKY1Z6S78rpYGB3JEKYaFOyBgYO6UlgFSksn3E+GJj6Pr6GZ7VfbbF3ARjoPae26V29lscNYECO/cSOtCtrV64AA7B+0odTvcrL3UUuAQPh4wi9Ulq6RByAUaaW1390Z6eOBLX5gHgu3abHARg1drIQ7+zKTqfbCxgMybt1yWhTDsDAepyQtfbstDaADqarRpvyACa00UcsUupDEHgAAxfxdmKPfFVmjw+4AGNfyBDfnyn2hh8aLsBAbIdYKLxn0LBCwweY0EgPsUve+lajmOEDjLq3SGyTt7DNIAnmAwwcRvuJbfKWvXt2E6PhBIx8NERsVEHFa9z1Zw2MopgU4ua1iavXn2elirx55dgUzBiYQEeHavyLr591dszy5ve3rNOHipJSSS+2wMixuZFpk6/MVlDXObt554aFevQM9w6YAqNedLYv7ilgJGV1SHcztvhjyfTHV43Fg6RnMwSG6thu106cZ+wJhZ1g5C8La4S0L5yZ/Hq2TxsyzSwYDu0Cgx9R/wuJiX2TkDk70D0j5mpsYhZgpv6vO1k7WDexY270aBuKHzkLmQzBJJKDGvrGAmColUVdB4TlCReWgTnUtJgHtpdNgmpTGzKeSsbe9tkBZkm3hCtiEjJqTBcyVXx9ZTIB0z2nsyQET0z+LjGnKdx6PU0ST0ofjHKBu2HDq7LJk1DdvaDkgcSR0gYj7+H+KRnYCpuEzJaujlIqcaR0wQTOD+jGxuKRYhwyq6MkKX8JQ08erQbTu7q4Rij1RxMmX+l5Xcg84ehekB6YqVnDAlT7+B4YSl6NaEOmgsWxH1aAmd4YJYbqGek1uUpuDWob88wOXsoOzO5mhBirfScGJgWrYV33mcF5KNmD+bFl3hSZGJHBUMs/17SrPtidYpYxGAUNAEchE/9hcpWc1X1larnZ35sqGJkeGV/g9yZ/Gt0PmHgfDnSWMW5CJkUwgSN6yUDzPQ2YYLxDTaEr6W/L/WvHLMHg7fmEmhH0oNZPkhodmzSZwa9rZFe94OR/KSUwBqtmK/IlqbqYJDX4M2zmfdCGTEHbDT7IpAIm/IsawfBvwcuzEm3ITBwFTC5X47qQYW4aVcZgdjdHjQfO3n5SqD2Y5pcUY65R7We7rJWB1+YZgsFvfyfwiOL/OxeeVfi0Batz2STJ0wact5yVeR/ZgZHP5nsoG8b/NuCdumKi0dyhcch0nKxp7wV1XJzYCMzVyw19j5uSJ+7bci9JaugolZDxl3BxL7gcTO+XA4K3WJdqLoJ3Ku8SjaJmXcl5olFhKQ9XycvAKIlvOH3x11Tf1LaQ8xuJRuMx45DpHYtwFzK/qbsWpiSiKOyuuy4KrgtGaeKDRxgCBipiSLWgOVKN2cNqEk0zpdfoqFNRPqaf3jQ10zncexjArQ7nBzDLN999fN8595w6wBSOBffFTI11oOieVaFh9VlOmcLWl7ajDA1MYUXofm4O1qZAtFhIh5T5SlEG7uBqpg1scRKYovhu0+MTT9qBrAcaVkS5jL1XnYdSso2HwhS33tU+prJkw7S0EUSZjb0iQRn4a8p/b4LSMjD2WVkYv5aVVh5fSSiQMo/lHmfhbAO5D/ylpBwYe7taqq3IDsiv8q6YF1KmelaU69CHkDKeLPsBrFJg7BdvcjgML9khdCADD6alEzllbFT7kAuxN6xkwCwebQjXOjoldOl6ElLmXZ7YZdDcXjXLPfkmAWbtpLZztV6vC7EW95lQF3xaIyo80WUxxV1KisDcFTvcpMbq3ci601hK7hNu1zpS6GnmlzwBmOeiK5UJ1v0T2gRyHzYJw2pxB/UmGGLTh7UxYI4rq+JcRynroZT0w3KZl8fyE3u/rXQBBKa6L05T0BuYpqCNhJEuOLCJRDb8bZ15uQwAplReedXa/I2BOQtKSUIXFFBNdC4ZYb39AmDu3dqplQFGb6ARU98Vm8yB+PDaJmproPoyM+0yw215dXNBuNY1dt24nDBhvuA7oQv2UXeuXl799mlgcru7tU9WIxgXmjKRUA7ErT2i7Oh0FVKGtZRUcmS4Uw0//9ZGE3oDlCnmb5dQIruDb9DAeJppGOAaRrrgfItIgVceQUZOM9YFJDDWFHF9IXTBlBsWuJ4sEu4Dml8RZew+KBQuieYqWbqH+wBllsuELrDRI35lji9lCGD8000aJtq1IXgwfTwqypE5gOUkepRvIlsOTO9M00bSpX4LOnmfV4iDCZXLWFm25TJSYJLp5r9Xi0cNRJmb8jiC7oMeZvtYRwKMHmppdKMLScnlt8+JMvqXC0hKcnXyRGCMaKS1Qo142EBSkqDM9uE8zEpydR8EYMxwq0kfbdaCBxNZE10uIcow3X4VoW1C692OepD7cPi1IGt5tv0QzTA2u5hKSaW2VuoC79Bccyo8mCoCZexXB5XDJazIkkx3GQyM/2KDn3CK6c0dDMva1qf1zSVh6XbxlJIKbkR9sY/sHFfJt5J375y+v78g6600zJIyClS7gYve0IOQMrtASj57XTl/MC8X8Tx3GcXRmdwDCQ+kzIn9e1jb0dtDSBZsEo7zBsY96cS8p9hVQJn59/mfayj/bf3jPcrbSA6lJ1gvJXPQkZqVTp8Ky+h37LX86fkDAhbD452KxJlmURRnZ8pp/ZAypfLBaXWV6sFlRafH+BY9/ALG6nLoGb12BVHm6RMEC+7ONBNkSpY/wFhTznU2CgDDigy1b/B6vIN1WD+vdeOjzgmWnpSZqx+6kvT1jzKVSIAxeh+41jlCmbqwuJXJbGyU8yL6FYaeDDjroo2EDZosbn84G2Tr2sFQvWmHn8l0z/qpDVf1Ds2MtMernI7MMPGhjlPGsEI3+if4r6Hf8RfK+junLck55J8cj7VRB4O/EmMhHaOim/7UTJBvDulfxeUbHgSLetUX6GEpiH6wYycpCANBFEA3aRClsxAVognRjagg6EIE738wCRnICTKQ947w+UVRNbCkOIZ+LJ+iXC18iBplW5lQ3Ynng7Z0lXnWsexf3/s0P5cjeWzTX0hjlq9ns56HsbvFTTy9J/maG1Vyya65WAAAAAAAAAAAAACAf3twSAAAAAAg6P9rV9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYBYIrDh/1TKvrAAAAABJRU5ErkJggg==');
var canvas = document['createElement']('canvas');

canvas['width'] = canvas['height'] = 128;
var ctx = canvas['getContext']('2d');
ctx['fillStyle'] = 'rgba(255,0,100,0.8)';
ctx['strokeStyle'] = 'rgba(255,0,100,0.5)';

var maxImageX = 110;
var maxImageY = 110;
var maxCursorX = 128;
var maxCursorY = 128;
var clientX;
var clientY;
var windowX = window['innerWidth'];
var windowY = window['innerHeight'];
var animation;
var fs = false;

document['body']['addEventListener']('mousemove', function (recursive) {
	clientX = recursive['clientX'];
	clientY = recursive['clientY'];

	if (!animation) {
		animation = requestAnimationFrame(animate);
	}
});

animation = requestAnimationFrame(animate);

var countineBtn = false;
function animate(prop) 
{
	animation = null;
	ctx['clearRect'](0, 0, 128, 128);
	ctx['save']();
	
	var percentX = Math.round((clientX * 100) / windowX);
	var imageX = Math.round((maxImageX * percentX) / 100);
	var cursorX = Math.round((maxCursorX * percentX) / 100);
	cursorX = Math.abs(cursorX - maxCursorX);
	var percentY = Math.round((clientY * 100) / windowY);
	var imageY = Math.round((maxImageY * percentY) / 100);
	var cursorY = Math.round((maxCursorY * percentY) / 100);
	cursorY = Math.abs(cursorY - maxCursorY);
	
	ctx['drawImage'](cursor, 0, 0, 280, 400, imageX, imageY, 17.5, 30);
	ctx['restore']();
	var url = canvas['toDataURL']();
	
	if( clientX < 550 && clientX > 275 && clientY < 215 && clientY > 65 )	{
		document['body']['style']['cursor'] = 'default';
	}	else if (clientY >= 200 && clientY <= 500) {
		document['body']['style']['cursor'] = 'default';
	} else {
		document['body']['style']['cursor'] = 'url(' + url + ') ' + cursorX + ' ' + cursorY + ', crosshair   ';
	}
}

document['body']['addEventListener']('click', function () {
	if( countineBtn )  {
		window.location='welcome.php';
	}	else	{
		document.getElementById("cs_arrow").style.display = "block"; 
	}
});
</script>
