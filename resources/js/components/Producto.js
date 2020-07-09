import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

const baseUrl="http://proyecto-laravel.test/"

export default class Producto extends Component{

    constructor(props){
        super(props);
        this.state={
            producto:[],
            productoBackup:[],
            textBuscar:'',
            formNombre:'',
            formDescripcion:'',
            formPrecio:'',
            idProducto:0,
            edit:false
        }
//Funciones onChange en los campos del formulario
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeDescp  = this.handleChangeDescp.bind(this);
        this.handleChangePreci  = this.handleChangePreci.bind(this);
    }

    handleChangeNombre(event) {
        this.setState({formNombre: event.target.value});
      }
  
      handleChangeDescp(event) {
        this.setState({formDescripcion: event.target.value});
      }
  
      handleChangePreci(event) {
        this.setState({formPrecio: event.target.value});
      }

    componentDidMount(){
        this.loadDataProduct();
    }

    loadDataProduct(){
        Axios.get(baseUrl+'api/producto/list').then(response=>{
            this.setState({
                producto:response.data,
                productoBackup:response.data
            })

        }).catch(error=>{
            alert('Error '+error);
        })
    }

    filter(event){
        // console.log(text.target.value)
        var text=event.target.value
        const data = this.state.productoBackup

        const newData=data.filter(function(item){
            const itemDataTitulo =item.titulo.toUpperCase()
            const itemDataDesc=item.descripcion.toUpperCase()
            const itemData =itemDataTitulo+" "+itemDataDesc
            const textData  = text.toUpperCase()

            return itemData.indexOf(textData)>-1
        })

        this.setState({
            producto:newData,
            textBuscar:text,
        })
    }

    render(){
        return(
            <div className="container">
                <h3>Laravel y React APIRest</h3>
            <hr/>
            {/* <p>Buscar</p> */}
            <div className="row">
            <input className="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text)=>this.filter(text)}></input>
            <button type="button" className="btn btn-primary col-md-3" onClick={()=>this.showModalCreate()}>
                Crear producto
              </button>
              </div>
            <br/>
            <table className="table table-bordered order-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="bodytable">
                  {this.renderList()}
                </tbody>

            </table>


            <form>
                <div  className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Formulario de producto</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Nombre de producto </label>
                        <input type="text" className="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Descripcion de producto</label>
                        <textarea className="form-control" rows="3" value={this.state.formDescripcion} onChange={this.handleChangeDescp}></textarea>
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Precio</label>
                        <input type="number" className="form-control" value={this.state.formPrecio} onChange={this.handleChangePreci} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        {
                            this.state.edit?
                            <button type="button" className="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                            :
                        <button type="button" className="btn btn-primary" onClick={()=>this.sendNetworkProduct()}>Guardar</button>


                        }
                    </div>
                    </div>
                </div>
                </div>
            </form>
            
            <div class="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">

                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Esta seguro desea de eliminar un regsitro?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>

              </div>
            </div>
            </div>
        );
    }

    showModalEdit(data){
        // alert("Mostrar info: "+JSON.stringify(data))
        // $("#exampleModal").modal("show");
        this.setState({
            idProducto:data.id,
            formNombre:data.titulo,
            formDescripcion:data.descripcion,
            formPrecio:data.precio,
            edit:true
        })

        $("#exampleModal").modal("show");


    }

    showModalCreate(){
        // alert("Mostrar info: "+JSON.stringify(data))
        // $("#exampleModal").modal("show");
        this.setState({
            idProducto:" ",
            formNombre:" ",
            formDescripcion:" ",
            formPrecio:" ",
            edit:false
        })

        $("#exampleModal").modal("show");


    }

    showModalDelete(data){ 
        // id seleccionado para eliminar
        this.setState({ idProducto:data.id })
        $("#exampleModalDelete").modal("show");
      }

    renderList(){

        return this.state.producto.map((data)=>{

            return(
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.titulo}</td>
                    <td>{data.descripcion}</td>
                     <td>{data.precio}</td>
                     <td><button className="btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button></td>
                     <td><button className="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button></td>

                </tr>
            )
        })
    }

    sendNetworkProduct(){

        const formData = new FormData()
        formData.append('nombre',this.state.formNombre)
        formData.append('descripcion',this.state.formDescripcion)
        formData.append('precio',this.state.formPrecio)
  
        axios.post(baseUrl+'api/producto/create',formData).then(response=>{
  
             if (response.data.success==true) {
               alert(response.data.message)
               // cargar datos de nuevo
               this.loadDataProduct()
               $("#exampleModal").modal("hide");
             }
  
         }).catch(error=>{
           alert("Error "+error)
         })
  
      }

    sendNetworkUpdate(){
        const formData = new FormData()
        formData.append('id',this.state.idProducto)
        formData.append('nombre',this.state.formNombre)
        formData.append('descripcion',this.state.formDescripcion)
        formData.append('precio',this.state.formPrecio)
        axios.post(baseUrl+'api/producto/update',formData).then(response=>{
  
            if (response.data.success==true) {
                // cargar datos de nuevo
              this.loadDataProduct()
              alert(response.data.message)
              
              $("#exampleModal").modal("hide");
            }
 
        }).catch(error=>{
          alert("Error "+error)
        })

    }


    sendNetworkDelete(){

        const formData = new FormData()
        formData.append('id',this.state.idProducto)
  
        axios.post(baseUrl+'api/producto/delete',formData).then(response=>{
  
             if (response.data.success==true) {
               alert(response.data.message)
               // para cargar datos de nuevo
               this.loadDataProduct()
               // para cerrar el modal
               $("#exampleModalDelete").modal("hide");
             }
  
         }).catch(error=>{
           alert("Error "+error)
         })
  
      }
}

if(document.getElementById('producto')){
    ReactDOM.render(<Producto/>,document.getElementById('producto'));
}