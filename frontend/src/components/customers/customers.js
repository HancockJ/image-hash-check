import React, {Component} from 'react';
import './customers.css';
import {getAllCustomers, createCustomer} from "../../services/serviceCustomer"

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            firstName: "",
            lastName: ""
        }
    }

    componentDidMount() {
        getAllCustomers()
            .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)))
    }

    changeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        const newCustomer = {firstName: this.state.firstName, lastName: this.state.lastName}
        createCustomer(newCustomer)
            .then(response => {
                console.log(response);
            });
    }

    updateList = (e) => {
        console.log("Updating list!")
        getAllCustomers()
            .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)))
    }
    
    render() {
        const {_, firstName, lastName} = this.state
        return (
            <div>
                <h2>Customers</h2>
                <ul>
                    {this.state.customers.map(customer =>
                        <li key={customer.id}>{ customer.firstName } { customer.lastName }</li>
                    )}
                </ul>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <div>
                        <input type="text"
                               name="firstName"
                               value={firstName}
                               onChange={this.changeHandler}
                        />
                        </div>
                        <div>
                        <input type="text"
                               name="lastName"
                               value={lastName}
                               onChange={this.changeHandler}
                        />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button type="update" onClick={this.updateList}>Update List</button>
            </div>
        );
    }
}
export default Customers;