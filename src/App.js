import React, {Component} from 'react';
import Buscador from './components/Buscador'
import Resultado from './components/Resultado'


class App extends Component{

  state ={
    termino : "",
    imagenes : [], 
    pagina:""
  }

  scroll=()=>{
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth", "end");

  }

  

  paginaAnterior = ()=>{
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
    //si la página es 1 no ir hacia atrás
    if(pagina ===1){
      return null;
    }

    //sumar 1 a la pagina actual
    pagina--;
    //agregar el cambio al state(setState siempre que se quieran realizar cambios al state)
    this.setState({
      pagina
    }, ()=>{
      this.consultarApi();
      this.scroll();
    });
    //console.log(pagina);
  }
  paginaSiguiente = ()=>{
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
    //sumar 1 a la pagina actual
    pagina++;
    //agregar el cambio al state(setState siempre que se quieran realizar cambios al state)
    this.setState({
      pagina
    },()=>{
      this.consultarApi();
      this.scroll();
    });
    //console.log(pagina);

  }



  consultarApi = ()=>{
    //const termino = this.state.termino;

    const pagina = this.state.pagina;

    const url = `https://pixabay.com/api/?key=17710691-062ada0a2424aa06b41df708a&q=${this.state.termino}&per_page=28&page=${pagina}`;

    //console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}));
  }

  datosBusqueda = (termino)=>{
    //console.log(termino);
    this.setState({
      termino : termino,
      pagina: 1
    }, ()=>{
      this.consultarApi();
    })
  }


render() {
  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center"><h2>Welcome to ImageSeeker</h2></p>
        <Buscador
          datosBusqueda={this.datosBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        
        <Resultado
          imagenes = {this.state.imagenes}
          paginaAnterior ={this.paginaAnterior}
          paginaSiguiente ={this.paginaSiguiente}
        />
      </div>
    </div>
  );
}
}

export default App;
