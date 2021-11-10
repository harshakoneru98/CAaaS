export default async (req, res) => {
    let email = req.url.split('?email=')[1];

    await fetch('http://localhost:8080/api/user/userData/' + email)
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
