const ProductList = React.createClass({
  getInitialState: function() {
    return {
      products: [],
      sortDirection: 'down'
    }
  },
  componentDidMount: function() {
    this.updateState()
  },
  sortData: function() {
    switch (this.state.sortDirection) {
      case 'up':
        return Data.sort((a, b) => {
          return a.votes - b.votes
        })
      case 'down':
        return Data.sort((a, b) => {
          return b.votes - a.votes
        })
    }
  },
  updateState: function() {
    const products = this.sortData();
    this.setState({ products: products})
  },
  handleProductUpVote: function(productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + 1
        return
      }
    })
    this.updateState()
  },
  handleProductDownVote: function(productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes - 1
        return
      }
    })
    this.updateState()
  },
  changeSortDirection: function() {
    this.state.sortDirection = this.state.sortDirection === 'up' ? 'down' : 'up'
    this.updateState()
  },
  render: function() {
    const products = this.state.products.map((product,index) => {
      return (
        <Product 
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onUpVote={this.handleProductUpVote}
          onDownVote={this.handleProductDownVote}
        />
      )
    })

    const iconClasses = this.state.sortDirection + " caret icon";

    return (
      <div>
        <div className="ui left labeled button" onClick={this.changeSortDirection}>
          <a className="ui basic label">
            Sort
          </a>
          <div className="ui icon button">
            <i className={iconClasses}></i>
          </div>
        </div>
        <div className='ui items'>
          {products}
        </div>
      </div>
    )
  }
})

const Product = React.createClass({
  handleUpVote: function() {
    this.props.onUpVote(this.props.id)
  },
  handleDownVote: function() {
    this.props.onDownVote(this.props.id)
  },
  render: function() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
          </div>
          <div className='description'>
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img className='ui avatar image' src={this.props.submitter_avatar_url} />
          </div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
)