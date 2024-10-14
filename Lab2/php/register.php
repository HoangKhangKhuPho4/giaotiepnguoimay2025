<!-- 
<form action="register.php" id ="register" class="form-input" method="POST">
                    <input type="text" class="input-feild" placeholder="UserID" name="username" required>
                    <input type="email" class="input-feild" placeholder="EmailID" name="email" required>
                    <input type="password" class="input-feild" placeholder="Password" name="password" required>
                    <br>
                    <br>
                    <br>
                    <button type="submit" class="submit-btn" name="register">Register</button>
                </form>
 -->



 <?php
//start the session
session_start();


//check whether the button is clicked or not
if(isset($_POST['register']))
{
    // check whether the bix are empty or not
    if(!empty($_POST['username'])   &&  !empty($_POST['email'])    &&   !empty($_POST['password']))
    {
        // array to store all the errors
        $error = array();
        //connect to database
           $db = mysqli_connect('localhost','root','','login') or die("could not connect to database") ;

        // getting user info

           $username = mysqli_real_escape_string($db,$_POST['username']);
           $email = mysqli_real_escape_string($db,$_POST['email']);
           $password = mysqli_real_escape_string($db,$_POST['password']);

        // checking for error
           
        // ERROR -1 SAME USERNAME (checking in db for same username)
        // ERROR -2 SAME EMAIL (checking in db for same email)

        $user_check_query="SELECT * FROM info WHERE Username = '$username' or Email='$email' LIMIT 1";

        //running error query
        
        $result = mysqli_query($db,$user_check_query);
        $user = mysqli_fetch_assoc($result);

        if($user)
        {
            if($user['Username']==$username)
            {
                array_push($error,"username already exist");
                echo "username already exist";
            }
            if($user['Email']==$email)
            {
                array_push($error,"email already exist");
                echo "email already registered";
            }
        }
        //now if there is no error then add data to database 
        if(count($error)==0)
        {
               $pass = md5($password);//these will encrypt the password
               $query = "INSERT INTO info (Username , Email , Password) VALUES ('$username','$email','$pass')";
               mysqli_query($db,$query);
               $_SESSION['Username']=$username;
               $_SESSION['sucess']="you are registered";
              echo " REGISTERED SUCCESSFUL";

        }
                    
    }
}


?>
