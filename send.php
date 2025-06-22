<?php
require_once 'vendor/autoload.php';
use Dompdf\Dompdf;

$data = json_decode(file_get_contents("php://input"), true);

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$bmi = $data['bmi'];
$bmr = $data['bmr'];
$tdee = $data['tdee'];
$protein = $data['protein'];
$fat = $data['fat'];
$carbs = $data['carbs'];

if (!$email) {
  echo "Nieprawidłowy adres email.";
  exit;
}

$html = "
  <h1>Wyniki Kalkulatora Kalorii</h1>
  <p>Imię: $name</p>
  <p>BMI: $bmi</p>
  <p>BMR: $bmr kcal</p>
  <p>TDEE: $tdee kcal</p>
  <h3>Makroskładniki</h3>
  <ul>
    <li>Białko: $protein g</li>
    <li>Tłuszcze: $fat g</li>
    <li>Węglowodany: $carbs g</li>
  </ul>
";

$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
$pdf = $dompdf->output();
$pdfPath = __DIR__ . "/wyniki_$name.pdf";
file_put_contents($pdfPath, $pdf);

echo "PDF wygenerowany: <a href='wyniki_$name.pdf' target='_blank'>Pobierz tutaj</a>";
?>