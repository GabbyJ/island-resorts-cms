import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import {withRoomConsumer} from "../Context"; //Replace {RoomConsumer, RoomContext} with this for higher order component
import Loading from "./Loading";

/* Higher order component */
function RoomContainer({context}){
    const {loading, sortedRooms, rooms} = context;

    if (loading){
        return <Loading/>;
        }

    return(
        <div>
            <RoomFilter rooms={rooms}/>
            <RoomList rooms={sortedRooms}/>
        </div>
    )
}


                

export default withRoomConsumer(RoomContainer)



/* Normal Component */

// import React from "react";
// import RoomFilter from "./RoomFilter";
// import RoomList from "./RoomList";
// import {RoomConsumer, RoomContext} from "../Context";
// import Loading from "./Loading";

// export default function RoomContainer(){
//     return(
//         <RoomConsumer>
//             {(value) => {
//                 const {loading, sortedRooms, rooms} = value

//                 if (loading){
//                     return <Loading/>;
//                     }

//                 return(
//                     <div>
//                         <RoomFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>
//                 )
//             }}
//         </RoomConsumer>
        
//     )
// }