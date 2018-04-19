import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const MAX_CONTRIBUTORS = 4;
const ASYNC_DELAY = 400;
var CONTRIBUTORS =[];

var p={};
var coAuthors=[];

class CoAuthorInput extends Component {


    constructor(props){
      super(props);

			this.state = {
			loading : false,
    	multi : true,
			value: '',
			modalIsOpen : false,
			selectedId : null,
			selectedName : '',
			selectedAvatar : null
    };

    this.onChange=this
				.onChange
				.bind(this)

    this.switchToMulti=this
				.switchToMulti
				.bind(this)

    this.switchToSingle=this
				.switchToSingle
				.bind(this)

    this.getContributors=this
				.getContributors
				.bind(this)

		this.gotoContributor=this
				.gotoContributor
				.bind(this)

		this.openModal = this
				.openModal
				.bind(this);

		this.afterOpenModal = this
				.afterOpenModal
				.bind(this);

		this.closeModal = this
				.closeModal
				.bind(this);

    }

		componentDidMount(){
					console.log("Setting loading to true");
					this.setState({
						loading : true
					});

					axios.get('/api/search/userList').then(response => {
							p = response.data;
							for (var key in p) {
							if (p.hasOwnProperty(key)) {
								console.log(p[key]);
							CONTRIBUTORS.push({id:key,name:p[key].name});
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


		gotoContributor(value,event){

			this.openModal(value.id);

		}
		openModal(id) {
			this.setState({modalIsOpen: true,
											selectedId : id,
										 	selectedName : p[id].name,
											selectedAvatar : p[id].avatar});
		}

		afterOpenModal() {
			// references are now sync'd and can be accessed.
			this.subtitle.style.color = '#f00';
		}

		closeModal() {
			this.setState({modalIsOpen: false});
		}

	onChange = (value) => {
		console.log(value);
		this.setState({
			value: value
		});

    for(var i=0;i<value.length;i++)
    {
      coAuthors[i]=value[i].id;
    }
    this.props.onSelectCoAuthor(coAuthors);
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


	getContributors (input, callback) {
		console.log("in get contributors");
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(i => {
			return (i.name.substr(0, input.length)).localeCompare(input);
		});
		var data = {
			options: options,
			complete: options.length <= MAX_CONTRIBUTORS,
		};

		setTimeout(function() {
			callback(null, data);
		}, ASYNC_DELAY);
	}



	render () {
		if(this.state.loading){
			return(
				<div>Loading...</div>
			)
		}
			return (
			<div id="main-start" className="main-start">

				<Select.Async multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoContributor} valueKey="id" labelKey="name" loadOptions={this.getContributors} />
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="User Modal">

					<h2 ref={subtitle => this.subtitle = subtitle}>{this.state.selectedName}</h2>
					<div><img src={this.state.selectedAvatar} alt='User avatar'/></div>
					<button className='invite-modal-button' onClick={this.closeModal}>Close</button>

				</Modal>
			</div>
		);
	}
}

export default CoAuthorInput;
