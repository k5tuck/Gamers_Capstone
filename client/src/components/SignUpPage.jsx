import React, { Link } from 'react'

function SignUpPage() {
    return (
    <main class="form-signin">
        <form action="/user/signup" method="POST">
    
        <h1 class="h3 mb-3 fw-normal">Sign Up Here</h1>
        <label class="visually-hidden" > Username</label>
        <input type="text" name="username" placeholder="Username"  class="form-control" placeholder="Login Username" required autofocus/>
        
        <label class="visually-hidden">Password</label>
        <input type="password"  class="form-control" name="password" placeholder="Password" required/>
        
        <label class="visually-hidden" > Display name</label>
        <input type="text" name="displayname" placeholder="Display Name"  class="form-control" placeholder="displayname" required autofocus/>

        <label class="visually-hidden">Email address</label>
        <input type="text" name="email"  class="form-control" placeholder="Email address" required/>

        <label  class="visually-hidden">name</label>
        <input type="text" name="name" class="form-control" placeholder="Your name" required/>

        <input class="w-100 btn btn-lg btn-primary" type="submit" value="Signup"/>
        
        
        </form>
        <Link to="/login"><button class="w-100 btn btn-lg btn-secondary">Log In </button></Link>
        <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    </main>
    )
}

export default SignUpPage;