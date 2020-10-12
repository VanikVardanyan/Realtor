import React, { Component } from 'react';
import './style.scss';
import elipse from '../../../assect/image/elipse.png'


class  MultiInpNumber extends Component {
  
    state = {
        countries: []
    }

   handleChange = (e, index) => {
    if (!isNaN(+e.target.value)) {
      this.state.countries[index] = e.target.value;
      this.setState({countries: this.state.countries})
    }
  }

  
   handleClick = (e) => {
    this.setState( { countries :[...this.state.countries, '']})
  }
render() {
  return (
    <div className="addFloatForm_body-col addFloatForm_data-col">
  <div >

   {
     this.state.countries.map((phone, index) =>{ 
       
        return (
        <div> 
          <input onChange={(e)=>this.handleChange(e, index)} type="text" value={phone} className="addNumberDoc" />
        </div>)
        })
   }
   <div className="addFloatForm_AddData-container_number">
     <button
      type="button"
      className="addFloatForm_data-container_btn-all"
      >
      <img src={elipse} alt="elipse" />
      </button>
   <button type="button" className="addFloatForm_data-container_btn-add" onClick={(e) => this.handleClick(e)} >
   Добавить
   </button>
   </div>
  </div>
  </div>
  );
}
}

export default MultiInpNumber;