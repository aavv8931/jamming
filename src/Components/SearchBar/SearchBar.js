import React from "react";
import './SearchBar.css'

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)

        this.set = {string: ''}
    }
    search(){
        this.props.onSearch(this.state.string)
    }

    handleTermChange(e){
        this.setState({string: e.target.value})
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onSearch={this.props.onSearch}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;