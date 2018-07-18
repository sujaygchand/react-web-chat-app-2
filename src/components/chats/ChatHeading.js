import React, { Component } from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera';
import FAUserPlus from 'react-icons/lib/fa/user-plus';
import MDEllipsisMenu from 'react-icons/lib/md/keyboard-control';

export default function ({ name, numberOfUsers }) {
    return (
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name">{name}</div>
                <div className="status">
                    <div className="indicator"></div>
                    <span>{numberOfUsers ? numberOfUsers : null}</span>
                </div>
            </div>
            <div className="options">
                <FAVideo />
                <FAUserPlus />
                <MDEllipsisMenu />
             </div>
        </div>
    );
}
