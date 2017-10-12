import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "Lodash/map"; //to use map in a object
import { personal_documents, gender, countries, privileges }  from '../../../../../constants/data_types';
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations
//import { signUpRequest } from './../../../../../actions'; //for use the Rest_API
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  usersAddRequest,
  usersUpdateRequest
} from '../../../../../actions';
import ListElements from './ListElements'
/* Validators */
import { validateCreateUserForm } from './../../../../../utils/validators';

let self;
class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.userData.id)?true:false,
      firstName: this.props.userData.firstName || '' ,
      secondName: this.props.userData.secondName || '' ,
      firstLastName: this.props.userData.firstLastName || '',
      secondLastName: this.props.userData.secondLastName || '' ,
      privilege: this.props.userData.privilege || '' ,
      bornDate: this.props.userData.bornDate || '',
      documentType: this.props.userData.documentType || '' ,
      documentValue: this.props.userData.documentValue || '' ,
      nationality: this.props.userData.nationality || '' ,
      department : this.props.userData.department || '' ,
      municipality: this.props.userData.municipality || '' ,
      community: this.props.userData.community || '' ,
      profession: this.props.userData.profession || '' ,
      address: this.props.userData.address || '' ,
      phone: this.props.userData.phone || '' ,
      cellphone: this.props.userData.cellphone || '' ,
      email: this.props.userData.email ||  '',
      password: this.props.userData.password || '' ,
      confirm_password: this.props.userData.confirm_password || '' ,
      cemproCode: this.props.userData.cemproCode || '' ,
      gender: this.props.userData.gender || '',
      id: this.props.userData.id || '',
      errors: {},
      isLoading: false
    };
    this.onAddSumbit=this.onAddSumbit.bind(this);
    this.onChange = this.onChange.bind(this);

    self = this;
  }

  isValid(){
    //local validation

    console.log("this.state: ", this.state);

    const { errors, isValid } = validateCreateUserForm(this.state)
    if(!isValid){
      this.setState({ errors });
      return false;
    }

    console.log("this.state: ", validateCreateUserForm(this.state));

    return true;
  }


  onAddSumbit(e){
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });
      // this.context.router.history.push('/');

      let data = {
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        firstLastName: this.state.firstLastName,
        secondLastName: this.state.secondLastName,
        privilege: this.state.privilege,
        bornDate: this.state.bornDate,
        documentType: this.state.documentType || 'sometype',
        documentValue: this.state.documentValue,
        nationality: this.state.nationality,
        department : this.state.department,
        municipality: this.state.municipality,
        comunity: this.state.community,
        profession: this.state.profession,
        address: this.state.address,
        phone: this.state.phone,
        cellphone: this.state.cellphone,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
        cemproCode: this.state.cemproCode,
        gender: this.state.gender,
        // remaining items
        appCode: '1',
        phon: 1
      };
      if(this.state.isEditing){
        data.id = this.state.id;
      }

      console.log("data: ", data);
      console.log(this.state.isEditing);


      //we store  a function in the props
      this.state.isEditing ?
        this.props.actions.usersUpdateRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if(response){
            self.props.changeView('VIEW_ELEMENT');
          }
        },
        (error) => {
          console.log("An Error occur with the Rest API");
          self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
        })
      :
      this.props.actions.usersAddRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if(response){
            self.props.changeView('VIEW_ELEMENT');
          }
        },
        (error) => {
          alert('fail');
          console.log("An Error occur with the Rest API");
          self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
        });

    } else {
      console.log(this.state.errors);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { errors } = this.state;
    // privileges types
    const privilegeTypes = map(privileges, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    // Document identification types
    const documentType = map(personal_documents, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //Defaul gender
    const genders = map(gender, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //countries
    const nationality = map(countries, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return (
      <article className="article padding-lg-v article-bordered">
          <div className="container-fluid with-maxwidth">
            <div className="row">
              <div className="col-xl-9">

                <div className="box box-default">
                  <div className="box-body padding-md">
                    <p className="text-info">Ingresa la siguiente información: </p>
                    <form onSubmit={this.onAddSumbit} role="form">
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer nombre</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            placeholder="eje: Diego"/>
                          {errors.firstName && <span className="help-block text-danger">{errors.firstName}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo nombre</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="secondName"
                            name="secondName"
                            value={this.state.secondName}
                            onChange={this.onChange}
                            placeholder="eje: Arturo"/>
                          {errors.secondName && <span className="help-block text-danger">{errors.secondName}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer apellido</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="firstLastName"
                            name="firstLastName"
                            value={this.state.firstLastName}
                            onChange={this.onChange}
                            placeholder="eje: Perez"/>
                          {errors.firstLastName &&
                          <span className="help-block text-danger">{errors.firstLastName}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo apellido</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="secondLastName"
                            name="secondLastName"
                            value={this.state.secondLastName}
                            onChange={this.onChange}
                            placeholder="eje: Durán"/>
                          {errors.secondLastName &&
                          <span className="help-block text-danger">{errors.secondLastName}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Correo
                          electronico</label>
                        <div className="col-md-9">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder="eje: juan@gmail.com"/>
                          {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Contraseña</label>
                        <div className="col-md-9">
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder="******"/>
                          {errors.password && <span className="help-block text-danger">{errors.password}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Confirmar
                          contraseña</label>
                        <div className="col-md-9">
                          <input
                            type="password"
                            className="form-control"
                            id="confirm_password"
                            name="confirm_password"
                            value={this.state.confirm_password}
                            onChange={this.onChange}
                            placeholder="******"/>
                          {errors.confirm_password &&
                          <span className="help-block text-danger">{errors.confirm_password}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Privelgio del
                          usuario</label>
                        <div className="col-md-9">
                          <select
                            name="privilege"
                            id="privilege"
                            onChange={this.onChange}
                            value={this.state.privilege}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona el privilegio</option>
                            {privilegeTypes}
                          </select>
                          {errors.privilege && <span className="help-block text-danger">{errors.privilege}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de nacimiento</label>
                        <div className="col-md-9">
                          <input
                            type="date"
                            className="form-control"
                            id="bornDate"
                            name="bornDate"
                            value={this.state.bornDate}
                            onChange={this.onChange}
                            placeholder="eje: Durán"/>
                          {errors.bornDate && <span className="help-block text-danger">{errors.bornDate}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                        <div className="col-md-9">
                          <select
                            name="dataType"
                            onChange={this.onChange}
                            value={this.state.documentType}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona el tipo de documento</option>
                            {documentType}
                          </select>
                          {errors.documentType && <span className="help-block text-danger">{errors.documentType}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Valor del documento</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="documentValue"
                            name="documentValue"
                            value={this.state.documentValue}
                            onChange={this.onChange}
                            placeholder="eje: 999499812"/>
                          {errors.documentValue &&
                          <span className="help-block text-danger">{errors.documentValue}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Pais de nacionalidad</label>
                        <div className="col-md-9">
                          <select
                            name="nationality"
                            id="nationality"
                            onChange={this.onChange}
                            value={this.state.nationality}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona el pais</option>
                            {nationality}
                          </select>
                          {errors.nationality && <span className="help-block text-danger">{errors.nationality}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-success">Departamento</label>
                        <div className="col-md-9">
                          <select
                            name="department"
                            id="department"
                            onChange={this.onChange}
                            value={this.state.department}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona el departamento</option>
                            {documentType}
                          </select>
                          {errors.department && <span className="help-block text-danger">{errors.department}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-success">Municipalidad</label>
                        <div className="col-md-9">
                          <select
                            name="municipality"
                            id="municipality"
                            onChange={this.onChange}
                            value={this.state.municipality}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona la municipalidad</option>
                            {documentType}
                          </select>
                          {errors.municipality && <span className="help-block text-danger">{errors.municipality}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label text-success">Comunidad</label>
                        <div className="col-md-9">
                          <select
                            name="community"
                            id="community"
                            onChange={this.onChange}
                            value={this.state.community}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona el tipo de documento</option>
                            {documentType}
                          </select>
                          {errors.community && <span className="help-block text-danger">{errors.community}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Profesión</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="profession"
                            name="profession"
                            value={this.state.profession}
                            onChange={this.onChange}
                            placeholder="eje: Profesor"/>
                          {errors.profession && <span className="help-block text-danger">{errors.profession}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Dirección</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            placeholder="eje: Km 18. Carretera a El Salvador"/>
                          {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Telefono</label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                            placeholder="eje: 24245757"/>
                          {errors.phone && <span className="help-block text-danger">{errors.phone}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Celular</label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            id="cellphone"
                            name="cellphone"
                            value={this.state.cellphone}
                            onChange={this.onChange}
                            placeholder="eje: 55329090"/>
                          {errors.cellphone && <span className="help-block text-danger">{errors.cellphone}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Genero</label>
                        <div className="col-md-9">
                          <select
                            name="gender"
                            id="gender"
                            onChange={this.onChange}
                            value={this.state.gender}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona el genero</option>
                            {genders}
                          </select>
                          {errors.gender && <span className="help-block text-danger">{errors.gender}</span>}
                        </div>
                      </div>


                      <div className="form-group row">
                        <div className="offset-md-3 col-md-10">
                          <RaisedButton disabled={this.state.isLoading}
                                        type="submit"
                                        label={this.state.isEditing?'Update':'Add'} secondary
                                        className="btn-w-md"> </RaisedButton>
                        </div>
                      </div>
                    </form>

                  </div>
                </div>

              </div>

              <div className="col-xl-3 col-lg-6">
                <div className="card bg-color-white">
                  <div className="card-content">
                    <span className="card-title">Uso de catalogos</span>
                    <p>El siguiente foromulario hace uso de catalogos, para agregar nuevos catalogos deveras editarlos
                      previamente
                      en la sección de la página.</p>
                  </div>
                  <div className="card-action">
                    <a href="#/app/catalog">Ver catalogos</a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </article>
  );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return {
    // auth: state.auth
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
  //    signUpRequest
        usersAddRequest,
        usersUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(EditForm);