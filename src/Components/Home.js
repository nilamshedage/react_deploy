import React from 'react';
import '../Styles/home.css';
import axios from 'axios';

import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            mealtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'http://localhost:2021/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations })
            }).catch(err => console.log(err))
        axios({
            url: 'http://localhost:2021/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ mealtypes: res.data.mealtypes})
            }).catch(err => console.log(err))


    }

    render() {
        const { locations, mealtypes } = this.state;
        return (
            <div>
                <Wallpaper locations={locations} />
                <QuickSearch quicksearches={mealtypes} />
            </div >
        )
    }
}

export default Home;


