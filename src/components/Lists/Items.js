import React, { Component } from 'react';
import '../styles/App.css';
import Popup from 'reactjs-popup';
import Octicon, { Plus, Pencil, X } from '@primer/octicons-react';

import { withFirebase } from '../../utils/Firebase';

const INTITIAL_STATE = {
  loading: false,
  items: [],
  newItemName: '',
  editItemName: '',
  itemToEdit: '',
  editing: false,
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

    this.itemsRef.on('child_changed', snapshot => {
      const editedItem = snapshot.val()
      editedItem.key = snapshot.key;

      this.state.items.forEach( item => {
        if (item.key === editedItem.key) {
          item.item = editedItem.item;
        }
      });

      this.setState({
        editItemTitle: "",
        editing: false
      });
    });

    this.itemsRef.on('child_removed', snapshot => {
      const deletedItem = snapshot.val();
      deletedItem.key = snapshot.key;

      var filteredItems = this.state.items.filter( item => {
        return item.key !== deletedItem.key;
      })

      this.setState({ items: filteredItems });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createItem(e) {
    e.preventDefault();
    const { newItemName } = this.state;

    if(!newItemName) return;

    this.itemsRef.push({
      item: newItemName,
      listId: this.props.list,
      userId: this.props.user.uid
    });

    this.setState({ newItemName: '' });
  }

  toggleEditing(itemKey) {
    if (itemKey === "") return;

    const item = this.state.items.find(item => {
       return item.key === itemKey;
     })

    this.setState({
      editing: !this.state.editing,
      itemToEdit: item
    });
  }

  editItem(itemKey) {
    const { editItemTitle } = this.state;

    if (itemKey === undefined || editItemTitle === "") return;

    this.itemsRef.child(itemKey).update({ "item": editItemTitle });
  }

  deleteItem(itemKey) {
    this.itemsRef.child(itemKey).remove();
  }

  componentWillUnmount() {
    this.itemsRef.off();
  }

  render() {
    const { items, newItemName, itemToEdit, editing, loading } = this.state;

    return (
      <div>
        <div className="list-row">
          {items.length ?
            <>
            <p>{loading && <div>Loading...</div>}</p>
            <ItemsList
              list={this.props.list}
              items={items}
              toggleEditing={(itemKey) => this.toggleEditing(itemKey)}
              deleteItem={(itemKey) => this.deleteItem(itemKey)}
            />
          </> :
          <p>No items yet!</p>
          }
          <Popup
            modal
            open={editing}
            closeOnDocumentClick
            onClose={this.toggleEditing('')}
          >
            <form className="form-group" onSubmit={() => this.editItem(itemToEdit.key)}>
              <label htmlFor="itemEditInput">Edit {itemToEdit.item}: </label>
              <input
                type="text"
                className="form-control"
                id="itemEditInput"
                aria-describedby="editItemHelp"
                name="editItemName"
                placeholder={ itemToEdit.item }
                onChange={(e) => this.handleChange(e)}
              />
              <button type="submit" className="btn btn-outline-primary btn-block">
                <Octicon icon={ Pencil }/>
              </button>
            </form>
          </Popup>
        </div>
        <div className="row">
          <div className="col-8" id="items">
            <form className="form-group" onSubmit={(e) => this.createItem(e)}>
              <input
                type="text"
                className="form-control"
                name="newItemName"
                value={ newItemName }
                aria-describedby="newItemHelp"
                placeholder="New item..."
                onChange={(e) => this.handleChange(e)}
              />
              <button type="submit" className="btn btn-outline-primary btn-block">
                <Octicon icon={ Plus }/>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const ItemsList = ({ items, list, toggleEditing, deleteItem }) => (
  <ul className="list-group">
    {
      items.filter(item => item.listId === list).map((item, index) =>
        <li
          className="list-group-item"
          key={item.key}
        >
          <button
            className="pencil-edit"
            onClick={() => toggleEditing(item.key)}
          >
          <Octicon icon={ Pencil } />
          </ button>
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
