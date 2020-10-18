import React, {Component} from 'react';
import Aux from '../Aux';
import Model from '../../components/Ui/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            errors: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({errors : null})
                return req
            },)
            axios.interceptors.response.use(res => res , error => {
                this.setState({errors: error})
            })
        }

        errorConfirmedhandler = () => {
            this.setState({errors: null})
        }
        render() {
            return (
                <Aux>
                    <Model 
                       show={this.state.errors}
                       closed={this.errorConfirmedhandler}
                       >
                        { this.state.errors ? this.state.errors.message : null}
                    </Model>
                    <WrappedComponent {... this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;