import React from 'react'

const UsersGrid = ({users}) => {
    console.log('users grid')
    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '75vw', margin: 'auto'}}>

        <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            {users.map((item) => (
                <div key={item._id}>
                    <div>{item._id}</div>
                    <div>{item.name}</div>
                    <div>{item.birthdate}</div>
                    <img
                        src={
                            // `../images/${item.photo}` // works if image saved to frontend/public/images
                            `http://localhost:5000/images/${item.photo}` //not working when image saved to backend/images
                        }
                        style={{ width: 150, height: 150 }}
                    />
                </div>
            ))}
        </div>
        </div>
    )
}

export default UsersGrid
