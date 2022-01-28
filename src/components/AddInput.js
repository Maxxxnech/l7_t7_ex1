import React, { PureComponent } from "react";
import "./css/Products.css";

export default class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.priceRef = React.createRef();
  }
  
  render() {
    return (
            <tr>
              <td></td>
              <td>
                <input type="text" ref={this.nameRef} placeholder="Товар N" />
              </td>
              <td>
                <input type="number" ref={this.priceRef} placeholder="9000" />
              </td>
              <td>
                <button
                  className="products__btn add"
                  onClick={() => {
                    // Если поля не заполнены - фокус на них
                    if(!this.nameRef.current.value){
                        this.nameRef.current.focus();
                        return;
                    }
                    if(!this.priceRef.current.value){
                        this.priceRef.current.focus();
                        return;
                    }
                    // Если поля заполнены - обновляем состояние и сбраываем значение полей
                    this.props.action && this.props.action(this.nameRef.current.value, this.priceRef.current.value)
                    this.nameRef.current.value = this.priceRef.current.value = null
                  }}
                >
                  Добавить
                </button>
              </td>
            </tr>
    );
  }
}
