const fs = require('fs');

const findObject = (table, id, col = "id", list = false) => {
    let json_ = fs.readFileSync('src/' + table + '.json', 'utf-8');
    let data = JSON.parse(json_);
    let result = []
    data.forEach(row => {
        if (row[col] == id) {
            result.push(row);
        }
    });
    // console.log(result)

    if (result.length == 1) {
        if (list)
            return result
        else
            return result[0]
    } else
        return result
}

const access = (user, pass) => {
    let json_ = fs.readFileSync('src/users.json', 'utf-8');
    let data = JSON.parse(json_);
    let result = false
    data.forEach(row => {
        if (row['user'] == user && row['pass'] == pass) {
            result = row['id']
        }
    });
    return result
}

const getOrder = () => {
    let data = getList('orders')
    let result = false
    let ya = 0;
    data.forEach(row => {
        if (row['state'] == 'Pendiente' && ya == 0) {
            ya = 1;
            result = row
        }
    });
    return result
}

const getList = (table) => {
    let json_ = fs.readFileSync('src/' + table + '.json', 'utf-8');
    //console.log(json_)
    return JSON.parse(json_);
}


const update = (table, registry) => {
    let json_ = fs.readFileSync('src/' + table + '.json', 'utf-8');
    let data = JSON.parse(json_);
    let cont = 0
    data.forEach(row => {
        if (row["id"] == registry.id) {
            data[cont] = registry
        } else
            cont++
    })
    json_ = JSON.stringify(data);

    fs.writeFileSync('src/' + table + '.json', json_, 'utf-8');
}

const insert = (table, registry) => {
    let json_ = fs.readFileSync('src/' + table + '.json', 'utf-8');
    let data = JSON.parse(json_);
    data.push(registry);
    json_ = JSON.stringify(data);

    fs.writeFileSync('src/' + table + '.json', json_, 'utf-8');
    return
}


module.exports = {
    findObject,
    update,
    insert,
    getList,
    access,
    getOrder
};