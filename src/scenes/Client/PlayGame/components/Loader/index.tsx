import React from 'react'
import './index.less'


const Loader = (props: any) => {
    return(
        <React.Fragment>
            <div className="coin">
                <div className="coin__front"></div>
                <div className="coin__edge">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>

                </div>
                <div className="coin__back"></div>
                <div className="coin__shadow"></div>
                </div>
        </React.Fragment>
    )
}

export default Loader;
