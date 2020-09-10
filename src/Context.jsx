import React, {Component} from "react";
//import items from "./data"; //contentful will call this items but this is just the whole data.js file
import Client from "./Contentful.js";

const RoomContext = React.createContext();

class RoomProvider extends Component{
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //getData
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "islandResort", //narrow down what items to show
                //order: 'sys.createdAt' //order items by publish date
                order: "fields.roomType" //order items by multiple parameters
            });

        let rooms = this.formatData(response.items); //items to response.items for contentful api to work instead of just local data
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false,
            price: maxPrice,
            maxPrice,
            maxSize
        });

            
        } catch (error) {
            console.log(error);
        }
    }


    componentDidMount(){
        this.getData()
        //all the lets and this.setState in getData above moved from here
        //here works for local data, not api data
        
    }

    formatData(arrays){
        let tempItems = arrays.map(array =>{
            let id = array.sys.id
            let images = array.fields.images.map(image => image.fields.file.url);

            let room = {...array.fields, images, id}
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room)=>room.slug === slug);
        return room;
    }

    handleChange = event => {
        // Since checkbox is needed, we use this code
        const target = event.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = event.target.name;
        this.setState({
            [name]:value
        }, this.filterRooms)

        // No checkbox code

        // const type = event.target.type
        // const name = event.target.name
        // const value = event.target.value
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state

        //all the rooms
        let tempRooms = [...rooms];

        //transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by room type
        if (type !== "all"){
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //filter by capacity
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price)

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //filter by breakfast
        if (breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //filter by pets
        if (pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        //change state
        this.setState({
            sortedRooms:tempRooms
        })
    }

    render() {
        return(
            <RoomContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

/*Higher Order Component*/
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext};