
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $message = strip_tags(trim($_POST["message"]));

  $entry = "Name: $name\nEmail: $email\nMessage: $message\n---\n";

  $file = "../data/submissions.txt";
  file_put_contents($file, $entry, FILE_APPEND | LOCK_EX);

  header("Location: ../contacts.html?success=true");
  exit();
} else {
  http_response_code(403);
  echo "Access denied.";
}
