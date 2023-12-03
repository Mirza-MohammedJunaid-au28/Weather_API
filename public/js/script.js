const output_div = document.getElementById('output');

function give(element){
    if(element == 'div'){
        const div = document.createElement('div');
        return div
    }
    else if(element == 'h4'){
        const h4 = document.createElement('h4');
        return h4
    }
}

function show_data(data){
    output_div.innerHTML = ''
    Object.keys(data).forEach(key => {
        div1 = give('div')
        div2 = give('div')
        h4 = give('h4')
        const value = data[key];
        h4.innerHTML = key
        div2.innerHTML = value
        div1.appendChild(h4)
        div1.appendChild(div2)
        output_div.appendChild(div1)
    });
}

function submitForm(event) {
    event.preventDefault();
    const cityName = document.getElementById('city_names').value;
    if (cityName.trim() !== '') {
        fetch('/getWeather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city: cityName }),
        })
        .then(response => response.json())
        .then(data => {
            show_data(data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        document.getElementById('city_names').style.border = "2px solid red";
        alert("Enter City Name")
    }
}