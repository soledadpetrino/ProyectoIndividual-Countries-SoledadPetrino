import React from 'react';


const ActivityCard = (activity) => {
    return (
        <div> 
            {activity && (
              <div>
                 <p><b>Actividad: </b>{activity.name}</p>
                 <p><b>Dificultad: </b>{activity.difficulty}</p>
                 <p><b>Duration: </b>{activity.duration} horas</p>
                 <p><b>Temporada: </b>{activity.season}</p>
              </div>  
            )}
        </div>
    )
}

export default ActivityCard

