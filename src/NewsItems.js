import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0 '}}>
                <span className="badge rounded-pill bg-danger">{source} </span>
                </div>
                    <img src={!imageUrl ? "https://cff2.earth.com/uploads/2023/04/04101818/Low-Res_Galong-Co.jpg.png" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems