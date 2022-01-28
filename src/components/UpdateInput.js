import React, { PureComponent } from "react";
import "./css/Products.css";

//Statless change of ref values
export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.selectRef = React.createRef();
    this.nameRef = React.createRef();
    this.priceRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let product = this.props.products[0];
    if (product) {
      this.selectRef.current.value = product.id;
      this.nameRef.current.value = product.name;
      this.priceRef.current.value = product.price;
    }
  }

  // Костыль: Необходим для корректного обновления при получении пропсов
  // родительским компонентом Products.js в его componentDidMount
  componentDidUpdate(prevProps) {
   // if (!prevProps.products.length) {
      let product = this.props.products.find(
        (el) => el.id == this.selectRef.current.value
      );
      if (product) {
        this.selectRef.current.value = product.id;
        this.nameRef.current.value = product.name;
        this.priceRef.current.value = product.price;
      }
    //}
  }
  render() {
    const { products } = this.props;

    return (
      <tr>
        <td>
          <select ref={this.selectRef} onChange={this.handleChange}>
            {products.map((el, i) => (
              <option key={el.id}>{el.id}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="text"
            ref={
              this.nameRef
            } 
          />
        </td>
        <td>
          <input
            type="number"
            ref={
              this.priceRef
            } 
          />
        </td>
        <td>
          <button
            className="products__btn change"
            onClick={() => {
              // Если поля не заполнены - фокус на них
              if (!this.nameRef.current.value) {
                this.nameRef.current.focus();
                return;
              }
              if (!this.priceRef.current.value) {
                this.priceRef.current.focus();
                return;
              }
              // Если поля заполнены - обновляем состояние и сбраываем значение полей
              this.props.action &&
                this.props.action(
                  this.selectRef.current.value,
                  this.nameRef.current.value,
                  this.priceRef.current.value
                );
            }}
          >
            Изменить
          </button>
        </td>
      </tr>
    );
  }

  handleChange() {
    let product = this.props.products.find(
      (el) => el.id == this.selectRef.current.value
    );
    this.nameRef.current.value = product.name;
    this.priceRef.current.value = product.price;
  }
}
