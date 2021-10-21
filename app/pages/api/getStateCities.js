export default async (req, res) => {
    fetch('http://localhost:8080/api/statecity/')
        .then((res) => res.json())
        .then((data) => {
            res.send(data.message);
        });
};
