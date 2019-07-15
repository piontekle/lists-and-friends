import React, { Component } from 'react';
import '../styles/App.css';
import Octicon, { Plus, Pencil, X } from '@primer/octicons-react';

import { withFirebase } from '../../utils/Firebase';

const INTITIAL_STATE = {
  loading: false,
  items: [],
  newItemName: '',
  error: null
}

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INTITIAL_STATE };

    this.itemsRef = this.props.firebase.items();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.itemsRef.on('child_added', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;

      this.setState({
        items: this.state.items.concat( item ),
        loading: false
      });
    })
  }

  handleChange(e) {
    this.setState({ newItemName: e.target.value });
  }

  createItem(e) {
    e.preventDefault();
    const { newItemName } = this.state;

    if(!newItemName) return;

    this.itemsRef.push({
      item: newItemName,
      listId: this.props.list.key,
      userId: this.props.user.uid
    });

    this.setState({ newItemName: '' });
  }

  deleteItem(itemKey) {
    var filteredItems = this.state.items.filter( item => {
      return item.key !== itemKey;
    })

    this.setState({ items: filteredItems });

    this.itemsRef.child(itemKey).remove();
  }

  componentWillUnmount() {
    this.itemsRef.off();
  }

  render() {
    const { items, newItemName, loading } = this.state;

    return (
      <div className="container">
        {loading && <div>Loading...</div>}
        <ItemsList
          list={this.props.list}
          items={items}
          deleteItem={(itemKey) => this.deleteItem(itemKey)}
        />
        <div className="row">
          <div className="col-4" id="lists">
            <form className="form-group" onSubmit={(e) => this.createItem(e)}>
              <input
                type="text"
                className="form-control"
                value={ newItemName }
                aria-describedby="newListHelp"
                placeholder="New item..."
                onChange={(e) => this.handleChange(e)}
              />
              <button type="submit" className="btn btn-outline-primary">
                <Octicon icon={ Plus }/>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const ItemsList = ({ items, list, deleteItem }) => (
  <ul className="list-group">
    {
      items.filter(item => item.listId === list.key).map((item, index) =>
        <li
          className="list-group-item"
          key={item.key}
        >
          <Octicon icon={ Pencil } />
          {' '}{item.item}
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteItem(item.key)}
          >
            <Octicon icon={ X } />
          </button>
        </li>
      )
    }
  </ul>
)


export default withFirebase(Items);
