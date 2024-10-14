<!-- <form action="/php/login.php"id="login" class="form-input" method="POST">
                     <input type="text" class="input-feild" placeholder="UserID" name="userid" required>
                     
                     <input type="password" class="input-feild" placeholder="Password" name="password" required>
                     <br>
                     <br>
                     <br>
                     <button type="submit" class="submit-btn" name="login">LogIn</button>
</form> -->

<?php

if(isset($_POST['login']))
{
    if(!empty($_POST['username']) && !empty($_POST['password']))
    {
        $username = $_POST['username'];
        $password =$_POST['password'];
        $db = mysqli_connect('localhost','root','','login') or die("could not connect to database") ;
         
        $user_check_query="SELECT * FROM info WHERE Username = '$username' or Password='$password' LIMIT 1";

        //running error query
        
        $result = mysqli_query($db,$user_check_query);
        $user = mysqli_fetch_assoc($result);

        if($user)
        {
            if($user['Username']==$username && $user['Password']==$password)
            {
                
                echo "login successful";
                

            }
            else
            {
                echo "username or password incorrect";
            }
        }
    }
}

?>

