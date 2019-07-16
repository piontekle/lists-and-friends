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
  editLists: false,
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

  editLists() {
    this.setState({ editLists: !this.state.editLists });
  }

  deleteList(listKey) {
    if (listKey === this.state.activeList.key) {
      this.setActiveList('');
    }

    var filteredLists = this.state.lists.filter( list => {
      return list.key !== listKey;
    })

    this.setState({
      lists: filteredLists,
      editLists: false
    });

    this.listsRef.child(listKey).remove();
    this.deleteListItems(listKey);
  }

  deleteListItems(listKey) {
    const itemsRef = this.props.firebase.items();

    itemsRef.on('child_added', snapshot => {
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
    const { lists, activeList, newListTitle, editLists, loading } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-4" id="lists">
            <h4>Lists
              <button
                className="btn btn-outline-secondary btn-sm edit-lists"
                onClick={this.editLists.bind(this)}
                data-toggle="button"
                aria-pressed="false"
              >
                <Octicon icon={ Pencil } />
              </button>
            </h4>
            <hr />
            {lists.length ?
              <>
                {loading && <div>Loading...</div>}
                <ListLists
                  lists={lists}
                  userId={this.props.user.uid}
                  editLists={editLists}
                  deleteList={(listKey) => this.deleteList(listKey)}
                  setActiveList={(list) => this.setActiveList(list)}
                  activeList={activeList}
                />
              </> :
              <p>No lists yet!</p>
            }
          </div>
          <div className="col-8" id="items">
            <h4>Items</h4>
            <hr />
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

const ListLists = ({ lists, userId, editLists, deleteList, activeList, setActiveList }) => (
  <ul className="list-group">
    {
      lists.filter(list => list.userId === userId).map((list, index) =>
        <li
          className={list.list === activeList.list ?
            "list-group-item active" : "list-group-item"}
          key={list.key}
          onClick={ () => setActiveList(list) }
        >
          {editLists && <Octicon icon={ Pencil } />}
          {' '}{list.list}
          {editLists && <button
            className="btn btn-outline-danger"
            onClick={() => deleteList(list.key)}
          >
            <Octicon icon={ X } />
          </button>}
        </li>
      )
    }
  </ul>
)


export default withFirebase(Lists);
