<?php
session_start();
if (isset($_SESSION["user"])) {
    header("location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workout Log</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Open+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
       
    <div class="signup-main">
    <?php 
        if (isset($_POST["submit"])) {
            $username = $_POST["username"];
            $password_hash = $_POST["password_hash"];
            $passwordRepeat = $_POST["repeat_password"];

            $errors = array();

            if (empty($username) OR empty($password_hash) OR empty($passwordRepeat) ){
                array_push($errors, "All fields are required");
            }
            if (strlen($password_hash) < 8){
                array_push($errors, "Password must be atleast 8 characters");
            }
            if ($password_hash !== $passwordRepeat){
                array_push($errors, "Password does not match");
            }
            require_once "dbh.inc.php";
            $sql = "SELECT * FROM users WHERE username = '$username'";
            $result = mysqli_query($conn, $sql);
            $rowCount = mysqli_num_rows($result);
            if ($rowCount > 0) {
                array_push($errors, "Username already exists!");
            }
            if (count($errors) > 0) {
                foreach ($errors as $error) {
                    echo "<div class='alert alert-danger'>$error</div>";
                }
            } else {
                $sql = "INSERT INTO users (username, password_hash) VALUES ('$username', '$password_hash')";
                if (mysqli_query($conn, $sql)) {
                    echo "<div class= 'alert alert-success'>You are registered.</div>";
                    header("Location: main.html");
                    exit();
                } else {
                    echo "<div class='alert alert-danger'>Something went wrong.</div>";
                }
            }
        }
        ?>   
        
        <form class="signup-form" method="post" action="index.php">
            <p id="signup-heading">Sign up</p>
            <div class="signup-field">
                <input autocomplete="off" placeholder="Username" class="signup-input-field" type="text" name="username">
            </div>
            <div class="signup-field">
                <input placeholder="Password" class="signup-input-field" type="password" name="password_hash">
            </div>
            <div class="signup-field">
                <input placeholder="Confirm Password" class="signup-input-field" type="password" name="repeat_password">
            </div>
            <div class="signup-btn">
                <button class="signup-button1" type="submit" value="Register" name="submit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                <a class="signup-button2" href="login.php">Login</a>
            </div>
        </form>
    </div>  
</body>
</html>