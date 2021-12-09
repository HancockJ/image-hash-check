import React, {Component} from 'react';
import './customers.css';
// import axios from 'axios';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            random: ''
        }
    }

    componentDidMount() {
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)))
    }

    changeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        // axios.post('/api/customers', this.state)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    render() {
        const { random } = this.state.random
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
                        <input type="text"
                               name="Random"
                               value={random}
                               onChange={this.changeHandler}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default Customers;