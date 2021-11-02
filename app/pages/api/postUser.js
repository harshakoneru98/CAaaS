export default async (req, res) => {
    fetch('http://localhost:8080/api/user/create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
        .then(res.json())
        .then((res) => {})
        .catch((err) => {
            console.log('Error message: ', error);
        });
};
