import React, { Component } from 'react'
import NewsItems from '../NewsItems'
import Spinner1 from './Spinner1';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstletter(this.props.category)}- DailyNews`;
    }
    async UpdateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba4b6af2e105437691042b632d785c5f&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data= await fetch(url);
        // let parsedData= await data.json()
        // console.log(parsedData)
        // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        this.UpdateNews()
    }
    handlePrevClick = async () => {
        // console.log("prev")
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba4b6af2e105437691042b632d785c5f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data= await fetch(url);
        // let parsedData= await data.json()
        // console.log(parsedData)
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parsedData.articles,
        //     loading:false
        // })
        this.setState({ page: this.state.page - 1 })
        this.UpdateNews()
    }
    handleNextClick = async () => {
        //     if(!this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        //     }
        //         else{
        //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba4b6af2e105437691042b632d785c5f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true})
        //     let data= await fetch(url);
        //     let parsedData= await data.json()
        //     this.setState({
        //         page:this.state.page+1,
        //         articles:parsedData.articles,
        //         loading:false
        //     })
        // }
        this.setState({ page: this.state.page + 1 })
        this.UpdateNews()
    }
    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
      };
    render() {
        return (
            <>
                <h1 className='text-center' style={{margin:"35px 0px", marginTop:"100px"}}>DailyNews- Top {this.capitalizeFirstletter(this.props.category)} Headlines</h1>
                {this.state.loading&&<Spinner1/>} 
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<h4><Spinner1/></h4>}>
                        <div className='container'>
                    <div className='row'>
                        {this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News