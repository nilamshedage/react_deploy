import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            mealtype_id: undefined,
            location_id: undefined,
            cuisine:[],
            lcost: undefined,
            hcost: undefined,
            sort: undefined,
            page:1,
            pageArr:[],
            locations:[],
            
        }
    }

    handleClick = (resId) => {
        this.props.history.push(`/details/?restaurant=${resId}`);
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype_id, location_id  } = qs;
       
        axios({
            url: 'http://localhost:2021/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations })
            }).catch(err => console.log(err))
        

        // Call filter API 
        axios({
            method: 'POST',
            url: 'http://localhost:2021/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                mealtype_id: mealtype_id,
                location_id: location_id
                
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, mealtype_id: mealtype_id, location_id:location_id, pageArr:res.data.pageCount})
        }).catch()
    }

    handleSortChange = (sort) => {
        const { mealtype_id, location_id, cuisine_id, lcost, hcost, page } = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:2021/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype_id,
                location_id: location_id,
                cuisine_id: cuisine_id,
                lcost: lcost,
                hcost: hcost,
                page: page
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, sort: sort, pageArr:res.data.pageCount})
        }).catch()
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype_id, location_id, cuisine_id, sort, page } = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:2021/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype_id,
                location_id: location_id,
                cuisine_id: cuisine_id,
                lcost: lcost,
                hcost: hcost,
                page: page
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, lcost: lcost, hcost: hcost,pageArr:res.data.pageCount})
        }).catch()
    }

    handleCuisineChange = (cuisine_id) => {
        const { mealtype_id, location_id, cuisine, sort, page ,lcost,hcost } = this.state;

        if (cuisine.indexOf(cuisine_id)== -1){
            cuisine.push(cuisine_id);

        }
        else{
            var index= cuisine.indexOf(cuisine_id);
            cuisine.splice(index , 1);
        }
       
        axios({
            method: 'POST',
            url: 'http://localhost:2021/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype_id,
                location_id: location_id,
                cuisine:cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page
            }
          
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant,lcost: lcost, hcost: hcost,pageArr:res.data.pageCount})
        }).catch()
    }

    handleLocationChange = (event) => {
        const location_id=event.target.value
        const { mealtype_id, sort,  cuisine_id: cuisine_id, lcost, hcost, page } = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:2021/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype_id,
                location_id:location_id,
                cuisine_id: cuisine_id,
                lcost: lcost,
                hcost: hcost,
                page: page,
                
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, cuisine_id: cuisine_id, location_id: location_id, pageArr:res.data.pageCount})
        }).catch()
    }

    handlePageChange = (page) => {
        const { mealtype_id, location_id, lcost, hcost, sort } = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:2021/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype_id,
                location_id: location_id,
                lcost: lcost,
                hcost: hcost,
                page: page
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, page:page, pageArr:res.data.pageCount })
        }).catch()
    }

    render() {
        const { restaurants ,pageArr,locations} = this.state;
        return (
            <div>
                <div id="myId" className="heading">Breakfast Places in Mumbai</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                <option value="0">Select</option>
                                    {locations.length !== 0 ?
                                    locations.map((item)=>{
                                        return <option value= {item.location_id}>{`${item.name},${item.city}`}</option>
                                    })
                                : null}
                                    
                                </select>
                                <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" onChange={()=> this.handleCuisineChange(1)}/>
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={()=> this.handleCuisineChange(2)}/>
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={()=> this.handleCuisineChange(3)}/>
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={()=> this.handleCuisineChange(4)}/>
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={()=> this.handleCuisineChange(5)}/>
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1, 500) }} />
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(500, 1000) }} />
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1000, 1500) }} />
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1500, 2000) }} />
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(2000, 50000) }} />
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => { this.handleSortChange(1) }} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => { this.handleSortChange(-1) }} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8" >
                           
                            {restaurants.length != 0 ? restaurants.map((item) => {
                                return <div className="Item" onClick={() => { this.handleClick(item._id) }}>
                                  
                                     
                                    <div>
                                        <div className="small-item vertical">
                                        <img src={`../${item.image}`} class="image"/>
                                        </div>
                                        <div className="big-item">
                                            <div className="rest-name">{item.name}</div>
                                            <div className="rest-location">{item.locality}</div>
                                            <div className="rest-address">{item.city}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="margin-left">
                                            <div className="Bakery">CUISINES : {item && item.cuisine ? item.cuisine.map(i => { return `${i.name}, ` }) : null}</div>
                                            <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                        </div>
                                    </div>
                                </div>
                            }) : <div class="no-records"> No Records Found ... </div>}

                            {pageArr.length > 0 ? (< div className="pagination">
                                <a href="#">&laquo;</a>
                                {pageArr.map(i => {return <a onClick ={()=> this.handlePageChange(i)}>{i}</a>})}
                                <a href="#">&raquo;</a>
                                
                                
                            </div>) : null}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
    
export default Filter;

/* 3 phases in lifecycle -

1. Mounting Phase - rendered for 1st time
2. Update Phase - only starts when the end user interacts with the application
3. UnMounting Phase - removed from the DOM

Mounting -

1. Constructor - to Initialize the state valriables
2. getDerivedStateFromProps - to derive the state from props
2. render - render anything to browser
3. componentDidMount  - API Calls on load of component

setState

Update -

1. getDerivedStateFromProps - to derive the state from props
2. shouldComponentUpdate
1. render
4. componentDidUpdate - logic after the update

UnMounting -

1. componentWillUnmount

className Component - State, LifeCycle
Functional - State, LifeCycle doesn't work


Components
Props
State
LifeCycle

*/
