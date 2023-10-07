import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import exitIcon from '../assets/exit.svg'
import loopIcon from '../assets/loop.svg'
import notificationIcon from '../assets/notif.svg'
import '../stylesheets/DashboardSideNavigation.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const DashboardSideNavigation = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleLogout = async () => {
      try {
        setError('')
        await logout()
        navigate('/login')
      } catch (error) {
        setError(error)
        console.log(error)
      }
  
  }
  return (

    /* {
    "uid": "rvLxAdDWgDTDVGoS6JlkJnWmLH83",
    "email": "felixopokuameyaw400@gmail.com",
    "emailVerified": true,
    "displayName": "Felix Six",
    "isAnonymous": false,
    "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJtmtoKuKm6_eKoNaCXAGDaH9MAwcfYUup1RBaZPlOhjt0=s96-c",
    "providerData": [
        {
            "providerId": "google.com",
            "uid": "111370211966074347224",
            "displayName": "Felix Six",
            "email": "felixopokuameyaw400@gmail.com",
            "phoneNumber": null,
            "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJtmtoKuKm6_eKoNaCXAGDaH9MAwcfYUup1RBaZPlOhjt0=s96-c"
        }
    ],
    "stsTokenManager": {
        "refreshToken": "AMf-vBxYLeP9mdDyGagoQJjV5w_WJP5QSsp6oVoFq-V1pv3RR6LzhAA4vxiRc6Ad8nV_GC2fNi9yIdxnpmWcvouWqKCqQaQxq-gt30FlSLcZ-MrPgxm6bI0pGrvSQWhbpdn11jAMFxoMkd7Fu6YadEnphxWQNck-uNjGyQ4ZXyKvNTrMRX0tTdWoItqtE2f3rUgILR5nj82LstIhFvlOLBugzWHYiSOMRml9KMTYCQqI2JtvAHVi_7fBOANn8-LNufE88VzmnxZOsU6vhrr0NfozbSE4HOv8RDKPS2F8n9X85l5Ae-pzpdPJz9zvL9BGfQRRWL-eHSxu-al6IsWLS2N7cUM2su4Dv5CdiY97M1XjVcnfTYv4RQ_a6FkfsR5OoTDIeBygulttYFeHtNA2NNSwmsBq5pa9QuvX3baVZjsAquNEK2yy5xFmkP9hKfI2mQtdyVJ7yUhL",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRmVsaXggU2l4IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0p0bXRvS3VLbTZfZUtvTmFDWEFHRGFIOU1Bd2NmWVV1cDFSQmFaUGxPaGp0MD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wcmVwLWFwcC1kZDc2MCIsImF1ZCI6InByZXAtYXBwLWRkNzYwIiwiYXV0aF90aW1lIjoxNjk2NzAxMjk5LCJ1c2VyX2lkIjoicnZMeEFkRFdnRFREVkdvUzZKbGtKbldtTEg4MyIsInN1YiI6InJ2THhBZERXZ0RURFZHb1M2SmxrSm5XbUxIODMiLCJpYXQiOjE2OTY3MDEyOTksImV4cCI6MTY5NjcwNDg5OSwiZW1haWwiOiJmZWxpeG9wb2t1YW1leWF3NDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTExMzcwMjExOTY2MDc0MzQ3MjI0Il0sImVtYWlsIjpbImZlbGl4b3Bva3VhbWV5YXc0MDBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ZRZCpmVMNeVoNyGjurf5O0_B0IQMV5GE5UK3_gzdIcKX_EyVBQHN8awi-V6vR6MGj-2SAC8L4gOyvRjbzahW2iaZ-g5ELztvaiH-FKOjFQLiBcU40qtApiP-Uez88KJqP-1-iim7i97B2hvgw5qg4jM29-piFUJLOz3TvS10Ef3b7VN6iU1NjuhVOP9vwHIGabsSXwkFGHLNQElPQIjQ1eXP3k2MpQKUFq3StPKdN5i3xNjPiFFeG-wCl86ATK_rFa_YjPmkBSKi1mT7oY4B5EQyyDSPFpAXawQEMWnROOqx0v4IjFf6hN3bQImCKAN1YdeJ1iSYqvp9r2InNHdy1w",
        "expirationTime": 1696701201604
    },
    "createdAt": "1695920410858",
    "lastLoginAt": "1696701299188",
    "apiKey": "AIzaSyCGHKaj-Zx3EwVt6_MqbGvnN_N62DM1lAQ",
    "appName": "[DEFAULT]"
}*/
    <aside className='dashboard-nav'>
      <h1>Prep App</h1>
      <div className='profile'>
        <div className='profile__image'>
          {currentUser?.displayName ? (
            <img src={currentUser?.photoURL} alt=''className='profile__image-img'/>
          ) : (
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5rem' }} />
          )}
        </div>
        <div className='profile__user'>
          <h3>{currentUser?.displayName}</h3>
          <span className='user-email'>{currentUser?.email}</span>
        </div>
      </div>
      <div className='actions'>
        <button className='actions_requests'>
          <img src={loopIcon} alt='' /> Requests
        </button>
        <button className='actions_notifications'>
          <img src={notificationIcon} alt='' />
          Notifications
        </button>
      </div>
      <div className='action__secondary'>
        <button className='settings'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            viewBox='0 0 512 512'
          >
            <path d='M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z' />
          </svg>
        </button>
        <button className='logout' onClick={handleLogout}>
          <img
            src={exitIcon}
            alt=''
            style={{ transform: 'rotateY(-180deg)' }}
          />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default DashboardSideNavigation
