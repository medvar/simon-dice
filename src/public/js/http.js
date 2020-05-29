const url = 'http://localhost:5300/'
const request = async args => {
    let response
    let head = new Headers()
        //head.set('Set-Cookie', 'true')
        //console.log(head.has('Set-Cookie'))
    let options = {
        credentials: 'omit',
        headers: {
            'accept': '*/*',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': '',
            'Set-Cookie': true,
        },
        method: args['method'],
        body: new URLSearchParams(args['data'])
    }
    switch (args['method']) {
        case 'post':
            try {
                response = await fetch(new Request(url + args['url'], options))
                return response
            } catch (error) {
                console.log(error)
                return error
            }
        case 'get':
            try {
                response = await fetch(new Request(url + args['url'], options))
                return response
            } catch (error) {
                console.log(error)
                return error
            }
        case 'patch':
            try {
                response = await fetch(new Request(url + args['url'], options))
                return response
            } catch (error) {
                console.log(error)
                return error
            }
        default:
            return false
    }
}