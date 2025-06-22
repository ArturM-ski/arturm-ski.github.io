document.getElementById("calorieForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const age = parseInt(document.getElementById("age").value);
	const gender = document.getElementById("gender").value;
	const weight = parseFloat(document.getElementById("weight").value);
	const height = parseFloat(document.getElementById("height").value);
	const activity = parseFloat(document.getElementById("activity").value);

	const heightM = height / 100;
	const bmi = (weight / (heightM * heightM)).toFixed(1);

	let bmr = 0;
	if (gender === "male") {
		bmr = 10 * weight + 6.25 * height - 5 * age + 5;
	} else {
		bmr = 10 * weight + 6.25 * height - 5 * age - 161;
	}

	const tdee = Math.round(bmr * activity);

	const protein = Math.round(weight * 2); // g białka
	const fat = Math.round(weight * 1); // g tłuszczu
	const carbs = Math.round((tdee - (protein * 4 + fat * 9)) / 4); // g węgli

	const html = `
    <h1>Wynik</h1>
    <p class="wynik">BMI: ${bmi}</p>
    <p class="wynik">BMR: ${Math.round(bmr)} kcal</p>
    <p class="wynik">Dzienne zapotrzebowanie (TDEE): ${tdee} kcal
    </p>

 
    <p class="wynik">Makroskładniki (na dzień):
    Białko: ${protein} g,
      Tłuszcze: ${fat} g,
      Węglowodany: ${carbs} g.
     
   </p>
    
  `;

	document.getElementById("result").innerHTML = html;

	fetch("send.php", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, bmi, bmr, tdee, protein, fat, carbs }),
	})
		.then((res) => res.text())
		.then((data) => {
			document.getElementById("result").innerHTML += `<p>${data}</p>`;
		});
});
