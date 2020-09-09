import React, {Component} from "react";
import items from "./data"; //contentful will call this items but this is just the whole data.js file

const RoomContext = React.createContext();

class RoomProvider extends Component{
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading: true
    };

    //getData
    componentDidMount(){
        //this.getData
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        this.setState({
            rooms, featuredRooms, sortedRooms:rooms, loading:false
        })
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

    render() {
        return(
            <RoomContext.Provider value={{...this.state, getRoom:this.getRoom}}>
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