import React from 'react';
import { NavLink } from 'react-router-dom';

const PeopleCard = (props) => {
    if (props)
        return (
            <NavLink
                key={props.peopleId}
                to={`${import.meta.env.VITE_CLIENT_URL}profile/${
                    props.peopleId
                }`}
                className="people-card"
            >
                <div className="people-card_container pad">
                    <div className="people-card_container_avatar">
                        <img src={props.avatar} loading="lazy" />
                    </div>
                    <div>
                        <div>{props.first_name}</div>
                        <div>{props.last_name ?? ''}</div>
                    </div>
                </div>
            </NavLink>
        );
};

export default PeopleCard;
