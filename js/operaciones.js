

var  Dd = [
    2.00, 1.50, 1.30, 1.20, 1.15, 1.10, 1.07, 1.05, 1.02, 1.01
];

var matriz = [
    [2.00, 1.01470, -0.30035],
    [1.50, 0.99957, -0.28221],
    [1.30, 0.99682, -0.25751],
    [1.20, 0.96272, -0.25527],
    [1.15, 0.98084, -0.22485],
    [1.10, 0.98450, -0.20818],
    [1.07, 0.98498, -0.19548],
    [1.05, 1.00480, -0.17076],
    [1.02, 1.01220, -0.12474],
    [1.01, 0.98413, -0.10474]
];

function obtener() {
    var D = $('#valorD').val();
    var d = $('#valord').val();
    var r = $('#valorR').val();
    
    var div = D / d;
    div = 1.187;
    if (buscaDd(div)) {
        var arreglo = flujoNormal(div);
        alert(calculaKt(arreglo[0], r, d, arreglo[1]));
    } else {
        var arreglo = obtieneMayorMenor(div);
        var map = obtieneAyB(arreglo);
        var a = interpolacion(div, arreglo[1], arreglo[0], map.get(2), map.get(0));
        var b = interpolacion(div, arreglo[1], arreglo[0], map.get(3), map.get(1));
        alert(a + "\n" + b + "\n" + div);
        alert("Kt = " + calculaKt(a, r, d, b));
    }
}


function interpolacion( x, x1,  x2,  y1,  y2) {
    var Y = 0;
    var rest1, rest2, rest3, div;
    rest1 = y2 - y1;
    rest2 = x2 - x1;
    rest3 = x - x1;
    div = rest1 / rest2;
    Y = y1 + (div * rest3);
    return Y;
}

function calculaKt( A,  r,  d,  b) {
   
    var div, potencia;
    div = r / d;
    potencia = Math.pow(div, b);
    var  K = A * potencia;
    return K;
}

 function obtieneMayorMenor( divRes) {
    var arreglo = [];

    var a= agregaDiv(divRes);
    for (let i = 0; i < a.length; i++) {
        if (divRes == a[i]) {
            arreglo[0] = a[i - 1];
            arreglo[1] = a[i + 1];
            break;
        }

    }

    return arreglo;
}

function flujoNormal( div) {
    var arreglo = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
            if (div != matriz[i][j]) {// si lo que tiene el resultado de la divisio es diferente con lo que esta en la tabla en el campo D/d
                break;//ya no sigue buscando en la fila
            } else {
                //si es igual el resultado con lo que hay en D/d asigna los valores de A y B                    
                arreglo[0] = matriz[i][(j + 1)];
                arreglo[1] = matriz[i][(j + 2)];

            }
        }

    }

    return arreglo;
}

function obtieneAyB(arreglo) {
    arr = new Map();
    var pos = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 3; k++) {
                if (arreglo[i] != matriz[j][k]) {
                    break;
                } else {
                    arr.set(pos, matriz[j][k + 1]);
                    pos++;
                    arr.set(pos, matriz[j][k + 2]);
                    pos++;
                    break;
                }
            }

        }
    }
    return arr;
}

function agregaDiv( div) {
    var miArrayList = [];

    for (let  i = 0; i < 10; i++) {
        miArrayList.push(Dd[i]);
    }
    miArrayList.push(div);

   var  nuevoDd = BubbleSort(miArrayList);

    return nuevoDd;
}


 function BubbleSort( nuevoDd) {
    var n = nuevoDd.length;
    var temp = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < (n - i); j++) {
            if (nuevoDd[j - 1] > nuevoDd[j]) {

                temp = nuevoDd[j - 1];
                nuevoDd[j - 1] = nuevoDd[j];
                nuevoDd[j] = temp;
            }

        }
    }

    return nuevoDd;
}

 function buscaDd( div){
    var a = false;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
            if (div != matriz[i][j]) {// si lo que tiene el resultado de la divisio es diferente con lo que esta en la tabla en el campo D/d
                break;//ya no sigue buscando en la fila
            } else {
                a = true;
                break;
            }
        }

    }

    return a;
}




 