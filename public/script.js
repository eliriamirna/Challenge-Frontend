let listaNumerica = []
let listaTextos = []

$(document).ready(function () {
    $("#ordenar").click(() => {
        let payload = {
            listas: {
                salaN: listaNumerica,
                salaS: listaTextos
            }
        }

        $.ajax({
            url: 'http://localhost:8080/ordenaLista',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data, status) {
                let salaN = data.listas.salaN
                let salaS = data.listas.salaS

                listaNumerica = salaN
                listaTextos = salaS

                const listaNumericaHtml = listaNumerica.map((n) => `<li>${n}</li>`).join(' ')
                $('#listaNumerica').html(listaNumericaHtml)

                const listaTextosHtml = listaTextos.map((t) => `<li>${t}</li>`).join(' ')
                $('#listaTextos').html(listaTextosHtml)
            }
        })
    })

    $('#analisarInterlace').click(() => {
        const intervaloA = [$('#min1').val(), $('#max1').val()]
        const intervaloB = [$('#min2').val(), $('#max2').val()]

        let intervals = {
            intervaloA,
            intervaloB
        }

        $.ajax({
            url: 'http://localhost:8080/interlace',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(intervals),
            success: function (data, status) {
                console.log(data)
                if (data == true) {
                    $('#respostaInterlace').text('Os intervalos se interlaçam.')
                } else {
                    $('#respostaInterlace').text('Os intervalos não se interlaçam.')
                }
            }
        })
    })

    function inserirNumero() {
        const numeros = $('#numero').val()
        const lista = numeros.split(',')
        if (lista.length > 0) {
            listaNumerica = [...listaNumerica, ...lista]
        } else {
            listaNumerica.push(numeros)
        }
        const listaNumericaHtml = listaNumerica.map((n) => `<li>${n}</li>`).join(' ')
        $('#listaNumerica').html(listaNumericaHtml)
        $('#numero').val('')
    }

    $('#adicionaNums').click(inserirNumero)
    $('#numero').keypress(function (event) {
        if (event.keyCode == '13') {
            inserirNumero()
        }
    })

    function inserirTexto() {
        const textos = $('#texto').val()
        const lista = textos.split(',')
        if (lista.length > 0) {
            listaTextos = [...listaTextos, ...lista]
        } else {
            listaTextos.push(textos)
        }
        const listaTextosHtml = listaTextos.map((t) => `<li>${t}</li>`).join(' ')
        $('#listaTextos').html(listaTextosHtml)
        $('#texto').val('')
    }

    $('#adicionaTextos').click(inserirTexto)
    $('#texto').keypress(function (event) {
        if (event.keyCode == '13') {
            inserirTexto()
        }
    })




})