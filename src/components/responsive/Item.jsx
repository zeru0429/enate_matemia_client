import React from 'react'
import stiker from '../../resources/images/nick-nice-DZ2-BRLtMhg-unsplash.jpg';


const Item = () => {
  return (
    <div>
        <h3 class="ui center aligned header">Responsive Item</h3>

<div class="ui container">
  <div class="ui relaxed divided items">
    <div class="item">
      <div class="ui small image">
        <img src={stiker} />
      </div>
      <div class="content">
        <a class="header">Content Header</a>
        <div class="meta">
          <a>Date</a>
          <a>Category</a>
        </div>
        <div class="description">
          A description which may flow for several lines and give context to the content.
        </div>
        <div class="extra">
          <img src={stiker} class="ui circular avatar image" /> Username
        </div>
      </div>
    </div>
    <div class="item">
      <div class="ui small image">
        <img src={stiker} />
      </div>
      <div class="content">
        <a class="header">Content Header</a>
        <div class="meta">
          <a>Date</a>
          <a>Category</a>
        </div>
        <div class="description">
          A description which may flow for several lines and give context to the content.
        </div>
        <div class="extra">
          <div class="ui right floated primary button">
            Primary
            <i class="right chevron icon"></i>
          </div>
          <div class="ui label">Limited</div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="ui small image">
        <img src={stiker} />
      </div>
      <div class="content">
        <a class="header">Content Header</a>
        <div class="meta">
          <a>Date</a>
          <a>Category</a>
        </div>
        <div class="description">
          A description which may flow for several lines and give context to the content.
        </div>
        <div class="extra">
          <div class="ui right floated primary button">
            Primary
            <i class="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Item


{/* <Container className='bg-light'>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
  <Link class="navbar-brand" to="#">እናት ማተሚያ ቤት</Link>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <Link class="nav-link active" aria-current="page" to="/">Home</Link>
      <Link class="nav-link" to="/pricing">Pricing</Link>
      <Link class="nav-link" to="/order">Orders</Link>
      <Link class="nav-link" to="/user">Users</Link>
      <Link class="nav-link" to="#memes">
        <i class="bi bi-moon-fill"></i>
        <i class="bi bi-sun-fill"></i>
      </Link>
      <div class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-fill"></i>
        </Link>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li><Link class="dropdown-item" to="#action/3.1">Profile</Link></li>
          <li><Link class="dropdown-item" to="#action/3.2">Settings</Link></li>
          <li><Link class="dropdown-item" to="#action/3.3">Status</Link></li>
          <li><hr class="dropdown-divider" /></li>
          <li><Link class="dropdown-item" to="#action/3.4">Logout</Link></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</nav>
</Container> */}