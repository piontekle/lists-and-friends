import React, { Component } from 'react';
import '../styles/App.css';
import Octicon, { Plus, Pencil, X } from '@primer/octicons-react';

import Items from './Items';

import { withFirebase } from '../../utils/Firebase';

const INTITIAL_STATE = {
  loading: false,
  activeList: '',
  lists: [],
  newListTitle: '',
  error: null
}

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INTITIAL_STATE };

    this.listsRef = this.props.firebase.lists();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.listsRef.on('child_added', snapshot => {
      const list = snapshot.val();
      list.key = snapshot.key;
      this.setState({
        lists: this.state.lists.concat( list ),
        loading: false
      });
    })
  }

  handleChange(e) {
    this.setState({ newListTitle: e.target.value });
  }

  setActiveList(list) {
    this.setState({ activeList: list });
  }

  createList(e) {
    e.preventDefault();
    const { newListTitle } = this.state;

    if(!newListTitle) return;

    this.listsRef.push({
      list: newListTitle,
      userId: this.props.user.uid
    });

    this.setState({ newListTitle: "" });
  }

  deleteList(listKey) {
    if (listKey === this.state.activeList.key) {
      this.setActiveList('');
    }

    var filteredLists = this.state.lists.filter( list => {
      return list.key !== listKey;
    })

    this.setState({ lists: filteredLists });

    this.listsRef.child(listKey).remove();
    /* this.deleteListItems(listKey); */
  }

  deleteListItems(listKey) {
    const itemsRef = this.props.firebase.items();

    itemsRef.on('value', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;

      if (item.listId === listKey) {
        itemsRef.child(item.key).remove()
      }
    })
  }

  componentWillUnmount() {
    this.listsRef.off();
  }

  render() {
    const { lists, activeList, newListTitle, loading } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-4" id="lists">
            {loading && <div>Loading...</div>}
            <ListLists
              lists={lists}
              userId={this.props.user.uid}
              deleteList={(listKey) => this.deleteList(listKey)}
              setActiveList={(list) => this.setActiveList(list)}
              activeList={activeList}
            />
          </div>
          <div className="col-8" id="items">
            {
              activeList ?
              <Items
                list={activeList}
                user={this.props.user}
              /> :
              <p>Select list to view items</p>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-4" id="lists">
            <form className="form-group" onSubmit={(e) => this.createList(e)}>
              <input
                type="text"
                className="form-control"
                value= { newListTitle }
                aria-describedby="newListHelp"
                placeholder="New list title..."
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

const ListLists = ({ lists, userId, deleteList, activeList, setActiveList }) => (
  <ul className="list-group">
    {
      lists.filter(list => list.userId === userId).map((list, index) =>
        <li
          className={list.list === activeList.list ?
            "list-group-item active" : "list-group-item"}
          key={list.key}
          onClick={ () => setActiveList(list) }
        >
          <Octicon icon={ Pencil } />
          {' '}{list.list}
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteList(list.key)}
          >
            <Octicon icon={ X } />
          </button>
        </li>
      )
    }
  </ul>
)


export default withFirebase(Lists);
