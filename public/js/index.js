//Verificação de qual tela
let page = typeof localStorage['page'] == 'undefined' ? 1 : localStorage['page'];

var token;
// $("#items").scrollLeft((page - 1) * 486);
//VueJS
const App = new Vue({
    el: '#tudo',
    delimiters: ['[[', ']]'],
    data: {
        data: dados,
        textButton: 'Pagar Agora',
        page: page,
        meses: {
            '01': 'JAN', '02': 'FEV', '03': 'MAR', '04': 'ABR', '05': 'MAI', '06': 'JUN', '07': 'JUL', '08': 'AGO', '09': 'SET', '10': 'OUT', '11': 'NOV', '12': 'DEZ'
        },
        indexJogoAberto: -1
    },
    methods: {
        criaCobranca: function (){
            this.textButton = 'Gerando Link'
            $.post('/criaCobranca', {
                valor: parseFloat(dados.dadosUser.total)
            },
            function (data) {
                $('#codigoPix').val(data['link'])
                App.copiaCodigo()
                $.post('/salvaCobranca', {
                    id: App.data.dadosUser.id,
                    txid: data['txid'],
                    valor: parseFloat(dados.dadosUser.total),
                    dividas: JSON.stringify(App.data.dadosUser.dividas),
                    data_inicial: data['data_inicial'],
                    data_final: data['data_final'],
                })
            })
        },
        copiaCodigo: function () {
            let textoCopiado = document.getElementById("codigoPix");
            textoCopiado.select();
            textoCopiado.setSelectionRange(0, 99999)
            document.execCommand("copy");
            $("#codigoPix").trigger("blur");
            this.textButton = 'Link Copiado!'
            setTimeout(this.normal, 5000)
            $(".button-pagamento").css("background-color", "white");
        },
        normal: function () {
            this.textButton = 'Pagar Agora';
            $(".button-pagamento").css("background-color", "var(--color)");
        },
        submit: function (id, index) {
            key = this.data.dadosEventos[index].confirmados.indexOf(this.data.dadosUser.nome);

            if (key != -1) {
                this.data.dadosEventos[index].confirmados.splice(key, 1);
            } else {
                this.data.dadosEventos[index].confirmados.push(this.data.dadosUser.nome);
            }

            $.post('/presenca', {
                id: this.data.dadosEventos[index].id,
                array: JSON.stringify(this.data.dadosEventos[index].confirmados)
            },
                function (returnedData) {
                    console.log(returnedData);
                })
        },
        concluir: function (id, edit = false) {
            selector = "#" + id;
            if(edit){
                $(selector).attr('action', '/new')
            }
             $(selector).submit();
        },
        scroll: function(){
            scroll = $("#items").scrollLeft();

            if (scroll < 191){
                this.mudaPagina(1)
            } else if (scroll > 190 && scroll < 570){
                this.mudaPagina(2)
            } else if (scroll > 569 && scroll < 950){
                this.mudaPagina(3)
            } else if (scroll > 949){
                this.mudaPagina(4)
            }
        },
        calculaPagina(page, abrindo){
            scrollWidth = (document.querySelector('#items').scrollWidth)/4
            if(this.page == page && !abrindo){
                window.location.reload();
            }
            $("#items").scrollLeft((page - 1) * scrollWidth);
        },
        mudaPagina: function(page){
            localStorage['page'] = page;
            this.page = page;
        },
        abreOutroJogo: function(index){
            if (this.indexJogoAberto == index){
                this.indexJogoAberto = -1
            } else {
                this.indexJogoAberto = index
            }
            console.log(this.indexJogoAberto)
        },
        addDado: function(type, gols = 1){
            if(type == 'gol'){
               this.data.dadosUser.gols = parseInt(this.data.dadosUser.gols) + gols 
            } else if (type == 'assist'){
                this.data.dadosUser.assistencias = parseInt(this.data.dadosUser.assistencias) + gols
            }    
            $.post('/addGolAssist', {
                id: this.data.dadosUser.id,
                gols: parseInt(this.data.dadosUser.gols),
                assistencias: parseInt(this.data.dadosUser.assistencias),
            },
                function (returnedData) {
                    console.log(returnedData);
                })
        },
        newJogo: function(){
            if(this.data.dadosUser.codigo == 'm050f290m090?35'){
                window.location.href = '/newJogo';
            }
        }

    },
    mounted: function(){
        this.calculaPagina(this.page, true);
    }
})
// botoes addGol e add Asist
let timeOut;
let click = true;

$('.addDado').on('touchstart', function() {
    timeOut = setTimeout(() => {
        App.addDado($(this).data('tipo'), -1)
        click = false
    }, 200)
});

$('.addDado').on('touchend', function() {
    clearTimeout(timeOut);
    if(click){
        App.addDado($(this).data('tipo'))
    }
    click = true
})