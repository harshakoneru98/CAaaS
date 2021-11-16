export default async (req, res) => {
    fetch('http://localhost:8080/api/record/create/tabular/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
        .then((res) => res.json())
        .then((data) => {
            res.send({
                status: 200,
                data: data.data,
                message: 'OK'
            });
        })
        .catch((err) => {
            console.log('Error message: ', error);
        });
};
