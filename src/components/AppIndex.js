import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as BoxplotActions } from '../reducers/boxplotData'
import { actions as HeatmapplotActions } from '../reducers/heatmapplotData'
import BoxBarplot from './BoxBarPlot/BoxBarplotComponent'
import HeatMapplot from './HeatMapPlot/HeatMapPlotComponent';
import FeatureImportancePlot from './FeatureImportance/FeatureImportanceComponent'
import DiscreteBarPlot from './DiscreteBarPlot/DiscreteBarPlotComponent';
import Scatterplot from './ScatterPlot/ScatterPlotComponent';
import './style.css'

const { get_boxplot_data } = BoxplotActions
const { get_heatmapplot_data } = HeatmapplotActions

class AppIndex extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='AppWrapper'>
                <div className='BoxBarplot'>
                    <BoxBarplot boxbarplotData={this.props.boxbarplotData}/>
                </div>
                <div className='DiscreteBarPlot'>
                    <DiscreteBarPlot discretebarplotData={this.props.discretebarplotData}/>
                </div>
                <div className='HeatMapplot'>
                    <HeatMapplot heatmapplotData={this.props.heatmapplotData}/>
                </div>
                <div className='FeatureImportancePlot'>
                    <FeatureImportancePlot featureimportanceplotData={this.props.featureimportanceplotData}/>
                </div>
                {/* <div className='Scatterplot'>
                    <Scatterplot />
                </div> */}
            </div>
        )
    }

    componentDidMount(){
        this.props.get_boxplot_data()
        this.props.get_heatmapplot_data()
    }
}

function mapStateToProps(state){
    return{
        boxplotData: state.boxplotData,
        heatmapplotData: state.heatmapplotData
    }
}

function mapDispatchToProps(dispatch){
    return{
        get_boxplot_data: bindActionCreators(get_boxplot_data, dispatch),
        get_heatmapplot_data: bindActionCreators(get_heatmapplot_data, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)