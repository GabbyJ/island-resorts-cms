import React, {Component} from "react";
import {FaCocktail, FaHiking, FaShuttleVan} from "react-icons/fa";
import {MdPool} from "react-icons/md";
import Title from "./Title";

export default class Services extends Component {
    state={
        services:[
            {
                icon:<MdPool/>,
                title:"amazing swimming",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
            },
            {
                icon:<FaCocktail/>,
                title:"free cocktails",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
            },
            {
                icon:<FaHiking/>,
                title:"endless hiking",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
            },
            {
                icon:<FaShuttleVan/>,
                title:"free shuttle",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
            },
            
        ]
    }

    render() {
        return (
            <section className="services">
                <Title title="services"/>
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}