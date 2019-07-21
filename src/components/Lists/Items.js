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
  showPurchased: false,
  error: null
}

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INTITIAL_STATE};

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
          item.isPurchased = editedItem.isPurchased;
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
      isPurchased: false,
      listId: this.props.list,
      userId: this.props.user.uid
    });

    this.setState({ newItemName: '' });
  }

  toggleEditing(item) {
    if (item === "") return;

    this.setState({
      editing: !this.state.editing,
      itemToEdit: item
    });
  }

  editItem(itemKey) {
    const { editItemName } = this.state;

    if (itemKey === undefined || editItemName === "") return;

    this.itemsRef.child(itemKey).update({ "item": editItemName });
  }

  togglePurchase(item) {
    var isPurchased = item.isPurchased;

    this.itemsRef.child(item.key).update({ "isPurchased": !isPurchased });
  }

  toggleShowPurchased(value) {
      this.setState({ showPurchased: value })
  }

  deleteItem(itemKey) {
    this.itemsRef.child(itemKey).remove();
  }

  componentWillUnmount() {
    this.itemsRef.off();
  }

  render() {
    const { items, newItemName, itemToEdit, editing, showPurchased, loading } = this.state;

    return (
      <div>
        <h4 data-test="items-header">
          Items
          <div className="btn-group btn-group-toggle edit-button-group">
            <label className={!showPurchased ? "btn btn-outline-success active" : "btn btn-outline-success"}>
              <input
                type="radio"
                name="showItems"
                autoComplete="off"
                data-test="show-items-btn"
                checked={showPurchased === false}
                onChange={() => this.toggleShowPurchased(false)}
              />Items
            </label>
            <label className={showPurchased ? "btn btn-outline-success active" : "btn btn-outline-success"}>
              <input
                type="radio"
                name="showPurchased"
                data-test="show-purchased-btn"
                checked={showPurchased === true}
                onChange={() => this.toggleShowPurchased(true)}
                />Purchased
            </label>
          </div>
        </h4>
        <hr />
        <div className="list-row">
          {items.length ?
            <ul className="list-group">
              <p>{loading && <div>Loading...</div>}</p>
              {
                items.filter(item => {
                  if (item.listId === this.props.list && item.isPurchased === showPurchased) {
                    return true;
                  }
                  return false
                })
                  .map((item, index) =>
                  <li
                    className="list-group-item"
                    data-test="list-item"
                    key={item.key}
                  >
                    <Item
                      item={item}
                      isPurchased={item.isPurchased}
                      togglePurchase={(item) => this.togglePurchase(item)}
                      toggleEditing={(itemKey) => this.toggleEditing(itemKey)}
                      deleteItem={(itemKey) => this.deleteItem(itemKey)}
                    />
                  </li>
                )
              }
            </ul> :
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
              <button type="submit" data-test="edit-item-submit" className="btn btn-outline-primary btn-block">
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
              <button type="submit" data-test="new-item-submit" className="btn btn-outline-primary btn-block">
                <Octicon icon={ Plus }/>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const Item = ({ item, isPurchased, togglePurchase, toggleEditing, deleteItem }) => (
  <>
    <span className="item-checkbox"><input
      type="checkbox"
      className="form-check-input"
      data-test="item-checkbox"
      checked={isPurchased}
      onChange={() => togglePurchase(item)}
    /></span>
    {item.item}
    <span className="edit-button-group">
      <button
        className="pencil-edit"
        data-test="edit-item-btn"
        onClick={() => toggleEditing(item)}
      >
        <Octicon icon={ Pencil } />
      </ button>
      <button
        className="btn btn-outline-danger"
        data-test="delete-item-btn"
        onClick={() => deleteItem(item.key)}
      >
        <Octicon icon={ X } />
      </button>
    </span>
    </>
)


export default withFirebase(Items);
