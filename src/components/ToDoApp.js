import React from 'react';
import '../components/ToDoApp.css';
import ListItems from './ListItem';


export default class ToDoApp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            items:[],
            currentItem:{
                text:'',
                key:''
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    }

    handleInput(e)
    {
        this.setState({
            currentItem:{
                text:e.target.value,
                key:Date.now()        
            }
        });
    }

    addItem(e)
    {
        e.preventDefault();
        const newItem = this.state.currentItem;
        //console.log(newItem);
        if(newItem.text.trim()!=="")
        {
            const newItems = [...this.state.items,newItem];
            this.setState({
                items: newItems,
                currentItem:{
                    text:'',
                    key:''
                }
            });
        }
    }


    deleteItem(key)
    {
        const filteredItem = this.state.items.filter(item => item.key!==key);
        this.setState({
            items: filteredItem
        });
    }

    setUpdate(itemValue,itemKey)
    {
        const Nitems = this.state.items;
        Nitems.map(item => {
            if(itemKey===item.key){
                item.text = itemValue;
            }
        });
        this.setState({
            items: Nitems 
        });
    }

    render() {
        return (
            <div className="App"  id="task">
                <h1>Make Todo List</h1>
            <header>
                <form id="to-do-form" onSubmit={this.addItem}>
                    <input type='text' placeholder="Enter Text" 
                    value={this.state.currentItem.text}
                    onChange={this.handleInput} />
                    <button type='submit' id="btn">Add</button>
                </form>
            </header>
            <ListItems items={this.state.items} 
            deleteItem = {this.deleteItem} 
            setUpdate = {this.setUpdate}
            />
            </div>    
        );
    }
}