import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as BoxplotActions } from '../reducers/boxplotData'
import Boxplot from './Boxplot/BoxplotComponent'
// import './style.css'

const { get_boxplot_data } = BoxplotActions

class AppIndex extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='boxplot'>
                <Boxplot boxplotData={this.props.boxplotData}/>
            </div>
        )
    }

    componentDidMount(){
        this.props.get_boxplot_data()
    }
}

function mapStateToProps(state){
    return{
        boxplotData: state.boxplotData
    }
}

function mapDispatchToProps(dispatch){
    return{
        get_boxplot_data: bindActionCreators(get_boxplot_data, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)