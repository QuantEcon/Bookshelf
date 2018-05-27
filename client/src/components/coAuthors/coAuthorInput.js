import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';




var options = [];
var p={};
var coAuthors=[];

var avatarStyle = {
   height:'40px',
   width: '40px',

};


class CoAuthorInput extends Component {

    constructor(props){
        super(props);

        this.state = {
	    loading : false,
    	    multi : true,
	    value: '',
          };

        this.setValue=this
	    .setValue
            .bind(this)

        this.switchToMulti=this
	    .switchToMulti
	    .bind(this)

        this.switchToSingle=this
	    .switchToSingle
	    .bind(this)

        this.renderOption=this
	    .renderOption
	    .bind(this)

        this.renderValue=this
            .renderValue
            .bind(this)

    }

     componentDidMount(){
	console.log("Setting loading to true");
	this.setState({
		loading : true
	});

        var userID=this.props.userId

	axios.get('/api/search/userList/?_id=' + userID).then(response => {
		p = response.data;
		for (var key in p) {
			if (p.hasOwnProperty(key)) {
				console.log(p[key]);
				if(p[key].github) { keywords = keywords.concat(p[key].github.url) }

				if(p[key].fb) { keywords = keywords.concat(p[key].fb.url) }

				if(p[key].twitter) { keywords = keywords.concat(p[key].twitter.url) }

				console.log(keywords);
				options.push({value:key, label:p[key].name , image:p[key].avatar, keywords:p[key].name + " "+ p[key].email+ " "+ keywords});
					}
			}

		this.setState({
			loading : false
		});
		return true;

		}).catch(error => {
			console.log('error in adding Co-Author: ', error);
			return false;
			})

		}



    setValue = (value) => {
    if(value.length < 5)
      {
          console.log(value);
  		    this.setState({ value });

          for(var i=0;i<value.length;i++)
          {
            coAuthors[i]=value[i].value;
          }
          this.props.onSelectCoAuthor(coAuthors);
      }
}

     switchToMulti = () => {
	this.setState({
		multi: true,
		value: this.state.value
		});
	}

     switchToSingle () {
	this.setState({
		multi: false,
		value: this.state.value[0]
		});
	}

  renderOption = (option) => {
		return (<div>
			<em> {option.label} </em>
      			&emsp;
      			<img style={avatarStyle} src={option.image}/>
      			</div>);
	}

    renderValue = (option) => {
     	console.log(option.label);
		return option.label;
	}

    render = () => {
	return (
		<div className="section">
		<Select filterOption={(option, filter) => option.keywords.indexOf(filter.toLowerCase()) >= 0}
          	multi={this.state.multi}
		onInputChange={(inputValue) => this._inputValue = inputValue}
		options={options}
		optionRenderer={this.renderOption}
		onChange={this.setValue}
		value={this.state.value}
		valueRenderer={this.renderValue}/>
		<div className="hint">If your Co-Author is not in the list, you can always send them an invite.</div>
		</div>
		);
	}

}

export default CoAuthorInput;
