var randomdigit = 0
var side = 20
var area = side * side
var volume = side * side * side
console.log(side + " " + area + " " + volume)

function submitform() {
    console.log("abc")
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(document.getElementById("message").value, document.getElementById("password").value).toString();

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, document.getElementById("password").value);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    //"encryptedmessage"
    document.getElementById("encryptedmessage").innerHTML = ciphertext
    var binaryciphertext = text2Binary(ciphertext)
    var messagelength = binaryciphertext.length
    console.log(binaryciphertext)
    console.log(binary2Text(binaryciphertext))
    console.log(messagelength)
    //padding 

    /*
    while (binaryciphertext.length < 3375) {
        randomdigit = Math.floor((Math.random() * 2)).toString();
        binaryciphertext = binaryciphertext.concat(randomdigit) 
    }

    console.log(binaryciphertext)
    console.log(binaryciphertext.length)

    */



    //make an array
    var numbers = new Array();
    for (let i = 0; i < volume; i++) {
        numbers[i] = i;
    }
    console.log("This is the numbers array " + numbers)

    //randomize the array
    var key = shuffle(numbers)

    var key = key.slice(0, messagelength)
    console.log("This is the key " + key)
    console.log("This is the key length " + key.length)

    //creating cube
    var cube = new Array();
    for (let i = 0; i < side; i++) {
        cube[i] = new Array();
        for (let j = 0; j < side; j++) {
            cube[i][j] = new Array();
        }
    }

    //put data in cube
    var addresscounter = 0
    let tempcounter = 0
    for (let k = 0; k < side; k++) {
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                if (key.includes(addresscounter) == true) {
                    //console.log(addresscounter+" Index :  "+key.indexOf(addresscounter)+" Actual data : "+binaryciphertext[key.indexOf(addresscounter)])
                    //input actual data based on the key
                    cube[i][j][k] = parseInt(binaryciphertext[key.indexOf(addresscounter)])
                    //this variable is just for testing purposes
                    tempcounter++
                } else {
                    //input random data
                    cube[i][j][k] = Math.floor((Math.random() * 2))

                }

                addresscounter++;
            }
        }
    }
    console.log(cube)

    //Plot Graph
    document.getElementById("plotgraph").style.display="block"
    document.getElementById("plotgraph").onclick= function() {plotGraph(cube)};
        //make an image





    //Perfectly balanced
}



//convert text to binary
function text2Binary(input) {
    /*
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('');

    */

   var result = "";
   for (var i = 0; i < input.length; i++) {
       var bin = input[i].charCodeAt().toString(2);
       result += Array(8 - bin.length + 1).join("0") + bin;
   } 
   return result;
}

//convert binay to text
function binary2Text(input) {

    var result = "";
    var arr = input.match(/.{1,8}/g);
    for (var i = 0; i < arr.length; i++) {
        result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    return result;
    }

//shuffle elements into an array
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//Plot Graph
function plotGraph(cube){
    //PLOT on graph

    //create arrays for axes
    var x_axis = new Array();
    var y_axis = new Array();
    var z_axis = new Array();
    var x_axis2 = new Array();
    var y_axis2 = new Array();
    var z_axis2 = new Array();
    //generate data 

    for (let k = 0; k < side; k++) {
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                if (cube[i][j][k] == 1) {
                    x_axis.push(i);
                    y_axis.push(j);
                    z_axis.push(k);

                } else {
                    x_axis2.push(i);
                    y_axis2.push(j);
                    z_axis2.push(k);

                }
            }
        }
    }

    //plot the graph using plot.ly


       

        var data = [{
            x: x_axis2,
            y: y_axis2,
            z: z_axis2,
            mode: 'markers',
            type: 'scatter3d',
            opacity: 0.5,
            marker: {
                color: 'rgb(23, 190, 207)',
                size: 2
            }
        },{
            x: x_axis,
            y: y_axis,
            z: z_axis,
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                color: 'red',
                size: 2
            }
        }];

        var layout = {
            autosize: true,
            height: 480,
            scene: {
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                camera: {
                    center: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    eye: {
                        x: 1.25,
                        y: 1.25,
                        z: 1.25
                    },
                    up: {
                        x: 0,
                        y: 0,
                        z: 1
                    }
                },
                xaxis: {
                    type: 'linear',
                    zeroline: false
                },
                yaxis: {
                    type: 'linear',
                    zeroline: false
                },
                zaxis: {
                    type: 'linear',
                    zeroline: false
                }
            },
            title: '3d point clustering',
            width: 477
        };

        Plotly.newPlot('myDiv', data, layout);

    }