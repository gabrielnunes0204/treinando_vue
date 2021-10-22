const vm = new Vue({
  el: "#app",
  data: {
    cursos: [],
    curso: [],
    itensCarrinho: [],
    carrinhoAtivo: false,
    nomeCurso: 'JS',
    alertaAtivo: false,
  },
  computed: {
    valorCursos() {
      let total = 0;
      if (this.itensCarrinho.length) {
        this.itensCarrinho.forEach((item) => {
          total += item.preco;
        });
      }
      return total;
    },
  },
  methods: {
    fetchCursos() {
      const url = "./api/dados.json";
      fetch(url).then((response) => {
        response.json().then((body) => {
          this.cursos = body;
        });
      });
    },
    fetchCurso(id) {
      const url = `./api/cursos/${id}/dados.json`;
      fetch(url).then((response) => {
        response.json().then((body) => {
          this.curso = body;
          const { id, nome, preco } = this.curso;
          this.itensCarrinho.push({ id, nome, preco });
        });
      });
    },
    adicionarCurso(id, nome) {
      this.fetchCurso(id);
      this.alerta(nome);
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
    removerCurso(index) {
      this.itensCarrinho.splice(index, 1);
    },
    finalizarCompra() {
      alert('Compra efetuada com sucesso');
      this.itensCarrinho = [];
    },
    alerta(nome) {
      this.nomeCurso = `O curso de ${nome} foi adicionado`;
    }
  },
  filters: {
    converterNumero(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  created() {
    this.fetchCursos();
  },
});
