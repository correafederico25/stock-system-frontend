import React from 'react'

const TitleDashboard = (props) => {
    return (
        <>
          <div className="w-100 d-flex justify-content-start pb-5 pt-4">
              <span className="header-icon">
              {props.icon}
              </span>
              <span className="title-dashboard">
                  {props.title}
              </span>
          </div>  
        </>
    )
}

export default TitleDashboard;
