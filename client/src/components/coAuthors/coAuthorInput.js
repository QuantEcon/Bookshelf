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
          options=[];

          var userID=this.props.userId

					axios.get('/api/search/userList/?_id=' + userID).then(response => {
							p = response.data;
							for (var key in p) {
							if (p.hasOwnProperty(key)) {
                var keywords="";

                keywords = keywords.concat(p[key].name);

                if(p[key].email) {keywords = keywords.concat(p[key].email)}
                if(p[key].github) { keywords = keywords.concat(p[key].github.url) }

                if(p[key].fb) { keywords = keywords.concat(p[key].fb.url) }

                if(p[key].twitter) { keywords = keywords.concat(p[key].twitter.url) }

                keywords = keywords.toLowerCase();
                console.log(keywords);
                var value = []
                value.push({_id:key, name:p[key].name})
							  options.push({value:value, label:p[key].name , image:p[key].avatar, keywords:keywords});


				}

			}


							this.setState({
								loading : false
							});
              // console.log("current object");
              // console.log(this.props.current);
              if(this.state.loading === false)
              {
                var temp = [];
                console.log("these are in the options array");
                console.log(options);
                console.log(options.length);
                if (this.props.current.length > 0)
                {

                    for (var i = 0; i < this.props.current.length; i++) {
                      for (var j = 0; j< options.length; j++) {
                        console.log(this.props.current[i]);
                        var flag = false
                            // console.log(this.props.current[i]);
                         if (this.props.current[i]._id == options[j].value[0]._id ||
                             this.props.current[i][0]._id == options[j].value[0]._id ||
                             this.props.current[j] == options[j].value[0]._id )
                         {
                           for (var k=0; k<temp.length ; k++) {
                             if (temp[k].value[0]._id == options[j].value[0]._id) {
                               flag = true;
                             }
                           }
                           if (!flag) {
                             temp.push(options[j])
                           }
                        }
                      }

                    }
                    console.log("these are in the temp array");
                    console.log(temp);
                    this.setState({value : temp })
                }
                temp =[];
              }

							return true;

					}).catch(error => {
							console.log('error in adding Co-Author: ', error);
							return false;
					})
		}



    setValue = (value) => {


    if(value.length < 5)
      {

  		    this.setState({ value });
          console.log("New set value");
          console.log(value);
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
		return (
      <div>
			<em>
      {option.label}
			</em>
      &emsp;
      <img style={avatarStyle} src={option.image}/>
      </div>
		);
}

    renderValue = (option) => {
     	console.log(option.label);
		return option.label;
	}

	render = () => {
    		if(this.state.loading){
    			return(
    				<div>Loading...</div>
    			)
    		}
		return (
			<div className="section">
				<Select filterOption={(option, filter) => option.keywords.indexOf(filter.toLowerCase()) >= 0}
          multi={this.state.multi}
					onInputChange={(inputValue) => this._inputValue = inputValue}
					options={options}
					optionRenderer={this.renderOption}
					onChange={this.setValue}
					value={this.state.value}
					valueRenderer={this.renderValue}
					/>
				 <div className="hint">If your Co-Author is not in the list, you can always send them an invite.</div>
			</div>
	);
	}

}

export default CoAuthorInput;
