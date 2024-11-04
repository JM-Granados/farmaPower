import './New_Request.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css';
import gradient from '../../assets/new_request.png'; // Corrected path
import folder from '../../assets/folder.png';


const NewRequest = () => {

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setErrorMessage('');

  //     const formData = new FormData();
  //     formData.append('firstName', FirstName !== undefined ? FirstName : "");
  //     formData.append('secondName', SecondName !== undefined ? SecondName : "");
  //     formData.append('firstLastName', FirstLastName !== undefined ? FirstLastName : "");
  //     formData.append('secondLastName', SecondLastName !== undefined ? SecondLastName : "");
  //     formData.append('username', username !== undefined ? username : "");
  //     formData.append('email', email !== undefined ? email : "");
  //     formData.append('password', password !== undefined ? password : "");
  //     formData.append('birthdate', birthdate !== undefined ? birthdate : "");
  //     formData.append('avatar', avatar !== undefined ? avatar : "");

  //     try {
  //         const result = await axios.post('http://localhost:4000/api/users/', formData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data'
  //             }
  //         });

  //         console.log(result);
  //         if (result.data.message === "User created") {

  //             navigate('/')
  //         } else {
  //             setErrorMessage('Unexpected response from the server.');
  //         }

  //     } catch (err) {
  //         setErrorMessage(err.response.data.error || 'An error ocurred while creating the user.')
  //     }
  // }



  return (
    <div className="nueva-solicitud">
      <div className="row principal">
        {/* Paritmos la pantalla en 2
                Primer pedazo
                Las proporciones se ajustan con porcentajes en el css o se puede -N donde N es la cantidad de pedazos */}
        <div className="div">
          <SideBar />
        </div>

        {/* Segundo pedazo
                Este pedazo se divide en 3. Esta el titulo, el filtro y las solicitudes */}
        <div className="col div2">
          {/* Pedazo del titulo */}
          <div className="row div3">
            <div className="div-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
              <img className='imagen' src={gradient} alt="Logo" id="gradient" />
            </div>
          </div>

          {/* Pedazo de las solicitudes */}
          <div className="row div5">
            <div className="col div6 input-group-column">


              <div className="row mt-4 align-items-center">
                <div className="col-md-3">
                  <p className="form-label text-white">Fecha de compra</p>
                </div>
                <div className="col-md-6">
                  <input type="date" className="form-control" />
                </div>
              </div>

              <div className="row mt-4 align-items-center">
                <div className="col-md-3">
                  <p className="form-label text-white">Número de factura</p>
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row mt-4 align-items-center">
                <div className="col-md-3">
                  <p className="form-label text-white">Farmacia</p>
                </div>
                <div class="dropdown">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>

                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
              </div>




            </div>

            <div className="col-3 div7">
              <div className="div-folder d-flex justify-content-start align-items-end">
                <img className='imagen-folder' src={folder} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


export default NewRequest;
