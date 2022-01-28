import React, { PureComponent } from "react";
import "./css/Products.css";
import AddInput from "./AddInput";
import UpdateInput from "./UpdateInput";

export default class Products extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    //this.nameRef = React.createRef();
    //this.priceRef = React.createRef();
  }
  componentDidMount() {
    this.setState(prevState => ({
      products: [
        { id: '1', name: "Товар 1", price: 1000 },
        { id: '2', name: "Товар 2", price: 2000 },
        { id: '3', name: "Товар 3", price: 3000 },
        { id: '4', name: "Товар 4", price: 4000 },
        { id: '5', name: "Товар 5", price: 5000 },
      ],
    }));
  }
  render() {
    const { products } = this.state;
    return (
      <>
        <table className="products">
          <thead>
            <tr>
              <th className="products__th">#</th>
              <th className="products__th">Название</th>
              <th className="products__th">Цена </th>
              <th className="products__th">Действие</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, price }, i) => (
              <tr key={id} onClick={this.changer}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                  <button
                    className="products__btn delete"
                    onClick={() => this.deleteProduct(id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            <AddInput action={this.addProduct} />
            <UpdateInput products={products} name="" price="" action={this.updateProduct} />
          </tbody>
        </table>
      </>
    );
  }
  deleteProduct(id) {
    this.setState((prevState) => ({
      products: prevState.products.filter((el) => el.id !== id),
    }));
  }

  addProduct(/*id,*/ name, price) {
    if (!name || !price) {
      return;
    }
    this.setState((prevState) => ({
      products: [
        ...prevState.products,
        {
          id: +prevState.products[prevState.products.length - 1].id + 1,
          name,
          price,
        },
      ],
    }));
  }

  updateProduct(id, name, price) {
      console.log(id, name, price);
    this.setState((prevState) => ({
      products: prevState.products.map((el) =>
        el.id == id ? { id, name, price } : el
      ),
    }));
  }

  changer(e){
     e.target.value = 'dwgh'
  }
}
