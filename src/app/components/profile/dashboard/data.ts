export var single = [
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    }
];


var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

let temp = []
monthNames.forEach((el, index) => {
    let obj = {
        name: el,
        "series": [
            {
                "name": "Pledge",
                "value": Math.floor(Math.random() * 1000) + 100
            },
            {
                "name": "Donations",
                "value": Math.floor(Math.random() * 1000) + 100
            },
            {
                "name": "Campaigns",
                "value": Math.floor(Math.random() * 1000) + 100
            }
        ]
    }
    temp.push(obj)
})
export var multi = temp
